<script setup lang="ts">
// ─── AppTooltip Component ───
// Tooltip elegante renderizado via Teleport no <body>.
// Escapa de qualquer overflow:hidden do pai e sobrepõe todas as seções.
// position="below" → abaixo do ícone (ideal para headers)
// position="above" → acima do ícone (padrão geral)

const { label, position = 'above' } = defineProps<{
  label: string
  position?: 'above' | 'below'
}>()

const visible    = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

// Posição calculada em px para o tooltip teleportado (fixed)
const tooltipStyle = ref<Record<string, string>>({})

let delayTimer: ReturnType<typeof setTimeout> | null = null

function updatePosition() {
  if (!triggerRef.value) return
  const rect    = triggerRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2

  if (position === 'below') {
    tooltipStyle.value = {
      top:       `${rect.bottom + 10}px`,
      left:      `${centerX}px`,
      transform: 'translateX(-50%)',
    }
  } else {
    tooltipStyle.value = {
      top:       `${rect.top - 10}px`,
      left:      `${centerX}px`,
      transform: 'translateX(-50%) translateY(-100%)',
    }
  }
}

function show() {
  updatePosition()
  delayTimer = setTimeout(() => { visible.value = true }, 150)
}

function hide() {
  if (delayTimer) { clearTimeout(delayTimer); delayTimer = null }
  visible.value = false
}
</script>

<template>
  <!-- Trigger — apenas referência de posição -->
  <div
    ref="triggerRef"
    class="inline-flex items-center justify-center"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
  </div>

  <!-- Tooltip teleportado para o <body> — escapa de overflow:hidden -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      :enter-from-class="position === 'below'
        ? 'opacity-0 -translate-y-1.5 scale-95'
        : 'opacity-0 translate-y-1.5 scale-95'"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      :leave-to-class="position === 'below'
        ? 'opacity-0 -translate-y-1.5 scale-95'
        : 'opacity-0 translate-y-1.5 scale-95'"
    >
      <div
        v-if="visible"
        role="tooltip"
        :style="tooltipStyle"
        class="
          fixed z-[9999]
          pointer-events-none select-none
          [@media(hover:hover)]:block hidden
        "
      >
        <!-- Bolha -->
        <div class="
          relative px-2.5 py-1.5
          bg-neutral-900/80 backdrop-blur-md
          text-white/95 text-[11px] font-medium tracking-wide
          rounded-md whitespace-nowrap
          shadow-[0_4px_16px_rgba(0,0,0,0.3)]
          border border-white/10
        ">
          {{ label }}

          <!-- Setinha -->
          <span
            class="absolute left-1/2 -translate-x-1/2 border-[5px] border-transparent"
            :class="position === 'below'
              ? 'bottom-full border-b-neutral-900/80 -mb-px'
              : 'top-full border-t-neutral-900/80 -mt-px'"
            aria-hidden="true"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
