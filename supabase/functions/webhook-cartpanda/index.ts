import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const STATUS_MAP: Record<string, string> = {
  "order.paid": "paid",
  "order.cancelled": "cancelled",
  "order.refunded": "cancelled",
};

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const eventType = (payload?.event ?? payload?.type ?? payload?.event_type ?? "unknown") as string;
  const cartpandaOrderId = payload?.id;

  let orderId: string | null = null;
  let newStatus: string | undefined;

  if (cartpandaOrderId != null) {
    const { data: order } = await supabase
      .from("orders")
      .select("id")
      .eq("cartpanda_order_id", String(cartpandaOrderId))
      .maybeSingle();

    if (order) {
      orderId = order.id;
      newStatus = STATUS_MAP[eventType];

      if (newStatus) {
        const { error: updateErr } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", order.id);

        if (updateErr) {
          console.error("webhook-cartpanda — erro ao atualizar status:", updateErr);
        }
      }
    }
  }

  await supabase.from("webhooks_log").insert({
    source: "cartpanda",
    event_type: eventType,
    payload,
    order_id: orderId,
    processed: Boolean(orderId && newStatus),
  });

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Connection": "keep-alive" },
  });
});
