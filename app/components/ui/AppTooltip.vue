<script setup lang="ts">
// ─── AppTooltip Component ───
// Tooltip elegante, apenas em dispositivos hover (desktop).
// Aparece acima do elemento com fade + slide suave e delay de 150ms.

defineProps<{ label: string }>()

const visible = ref(false)
let delayTimer: ReturnType<typeof setTimeout> | null = null

function show() {
  delayTimer = setTimeout(() => { visible.value = true }, 150)
}

function hide() {
  if (delayTimer) { clearTimeout(delayTimer); delayTimer = null }
  visible.value = false
}
</script>

<template>
  <!-- Wrapper relativo — isola o tooltip do fluxo do pai -->
  <div
    class="relative inline-flex items-center justify-center"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />

    <!-- Tooltip — visível apenas em hover devices (CSS @media) -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1.5 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1.5 scale-95"
    >
      <div
        v-if="visible"
        role="tooltip"
        class="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-3
          pointer-events-none select-none
          [@media(hover:hover)]:block hidden
        "
      >
        <!-- Bolha do tooltip -->
        <div class="
          relative px-2.5 py-1.5
          bg-neutral-900/80 backdrop-blur-md
          text-white/95 text-[11px] font-medium tracking-wide
          rounded-md whitespace-nowrap
          shadow-[0_4px_16px_rgba(0,0,0,0.3)]
          border border-white/10
        ">
          {{ label }}

          <!-- Setinha apontando para baixo -->
          <span class="
            absolute top-full left-1/2 -translate-x-1/2
            border-[5px] border-transparent
            border-t-neutral-900/80
            -mt-px
          " aria-hidden="true" />
        </div>
      </div>
    </Transition>
  </div>
</template>
