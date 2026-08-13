import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CARTPANDA_API_URL = "https://accounts.cartpanda.com/api/v3/quintal-dos-mineiros";

// Único produto disponível no momento — Kit Torresmo Pré-Pronto Fazenda Santa Fé
const PRODUCT_VARIANT_ID = 205687497;
const PRODUCT_ID_SUPABASE = "ab95c3ab-2099-4e7d-9b5b-b19f0e343265";
const PRODUCT_UNIT_PRICE = 89.90;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface PaymentPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    state_name: string;
    zip: string;
  };
  payment_method: "pix" | "cc";
  quantity: number;
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    first_name: parts[0] ?? "",
    last_name: parts.slice(1).join(" ") || (parts[0] ?? ""),
  };
}

function onlyDigits(value: string): string {
  return (value ?? "").replace(/\D/g, "");
}

function buildCartpandaAddress(customer: PaymentPayload["customer"], address: PaymentPayload["address"]) {
  const { first_name, last_name } = splitName(customer.name);
  return {
    first_name,
    last_name,
    address: address.street,
    house_no: address.number,
    neighborhood: address.neighborhood,
    city: address.city,
    province: address.state_name,
    province_code: address.state,
    zip: Number(onlyDigits(address.zip)),
    phone: customer.phone,
    country: "Brasil",
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const CARTPANDA_TOKEN = Deno.env.get("CARTPANDA_TOKEN");
  if (!CARTPANDA_TOKEN) {
    return new Response(JSON.stringify({ error: "CARTPANDA_TOKEN não configurado" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  let payload: PaymentPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { customer, address, payment_method, quantity } = payload ?? {};

  if (!customer?.name || !customer?.email || !customer?.phone || !customer?.cpf) {
    return new Response(JSON.stringify({ error: "Dados do cliente incompletos" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  if (!address?.street || !address?.number || !address?.neighborhood || !address?.city || !address?.state || !address?.zip) {
    return new Response(JSON.stringify({ error: "Endereço incompleto" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
  if (payment_method !== "pix" && payment_method !== "cc") {
    return new Response(JSON.stringify({ error: "Método de pagamento inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const qty = Math.max(1, Math.floor(quantity ?? 1));
  const totalAmount = Number((PRODUCT_UNIT_PRICE * qty).toFixed(2));
  const { first_name, last_name } = splitName(customer.name);
  const cartpandaAddress = buildCartpandaAddress(customer, address);

  const cartpandaBody = {
    currency: "BRL",
    presentment_currency: "R$",
    subtotal_amount: totalAmount,
    products_total_amount: totalAmount,
    total_amount: totalAmount,
    email: customer.email,
    phone: customer.phone,
    line_items: [{ variant_id: PRODUCT_VARIANT_ID, quantity: qty }],
    shipping_address: cartpandaAddress,
    billing_address: cartpandaAddress,
    customer: {
      email: customer.email,
      first_name,
      last_name,
      cpf: Number(onlyDigits(customer.cpf)),
    },
    payment: {
      payment_gateway_id: "appmax",
      gateway: "appmax",
      amount: totalAmount,
      type: payment_method === "pix" ? "pix" : "credit_card",
    },
  };

  let cartpandaData: Record<string, unknown>;
  try {
    const res = await fetch(`${CARTPANDA_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${CARTPANDA_TOKEN}`,
      },
      body: JSON.stringify(cartpandaBody),
    });
    cartpandaData = await res.json();
    if (!res.ok) {
      throw new Error(
        typeof cartpandaData === "object"
          ? JSON.stringify(cartpandaData)
          : `Erro HTTP ${res.status}`
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao chamar o Cartpanda";
    console.error("criar-pedido-cartpanda — erro Cartpanda:", message);
    return new Response(JSON.stringify({ error: `Cartpanda recusou o pedido: ${message}` }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // deno-lint-ignore no-explicit-any
  const cp = cartpandaData as any;
  const cartpandaOrderId: number | string | undefined = cp?.order?.id ?? cp?.id ?? cp?.order_id;
  const pixCode: string | undefined = cp?.payment?.pix_code;
  const pixQr: string | undefined = cp?.payment?.pix_qr;
  const pixLimitDate: string | undefined = cp?.payment?.pix_limit_date;

  const formattedAddress = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}/${address.state} - CEP ${address.zip}`;

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_document: customer.cpf,
      customer_address: formattedAddress,
      total_price: totalAmount,
      status: "pending",
      payment_method,
      cartpanda_order_id: cartpandaOrderId != null ? String(cartpandaOrderId) : null,
      pix_code: pixCode ?? null,
      pix_qr: pixQr ?? null,
      pix_limit_date: pixLimitDate ?? null,
    })
    .select("id")
    .single();

  if (orderErr || !order) {
    console.error("criar-pedido-cartpanda — erro ao salvar pedido:", orderErr);
    return new Response(JSON.stringify({ error: "Erro ao salvar o pedido no Supabase" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const { error: itemErr } = await supabase.from("order_items").insert({
    order_id: order.id,
    product_id: PRODUCT_ID_SUPABASE,
    quantity: qty,
    unit_price: PRODUCT_UNIT_PRICE,
  });

  if (itemErr) {
    console.error("criar-pedido-cartpanda — erro ao salvar item do pedido:", itemErr);
  }

  return new Response(
    JSON.stringify({
      order_id: order.id,
      cartpanda_order_id: cartpandaOrderId,
      payment_method,
      pix_code: pixCode,
      pix_limit_date: pixLimitDate,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
});
