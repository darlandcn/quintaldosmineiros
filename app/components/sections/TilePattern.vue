<template>
  <div class="overflow-hidden select-none" aria-hidden="true">
    <div class="flex tile-scroll">
      <template v-for="copy in 3" :key="copy">
        <div
          v-for="(tile, i) in tiles"
          :key="`${copy}-${i}`"
          class="shrink-0 w-[72px] h-[72px] sm:w-20 sm:h-20 flex items-center justify-center"
          :style="{ backgroundColor: tile.bg }"
        >
          <svg
            class="w-9 h-9 sm:w-10 sm:h-10"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Fork -->
            <template v-if="tile.icon === 'fork'">
              <line x1="14" y1="6" x2="14" y2="16" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="20" y1="6" x2="20" y2="16" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="26" y1="6" x2="26" y2="16" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M14 16 Q20 20 26 16" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <line x1="20" y1="19" x2="20" y2="35" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
            </template>

            <!-- Spoon -->
            <template v-else-if="tile.icon === 'spoon'">
              <ellipse cx="20" cy="12" rx="6" ry="8" :stroke="tile.color" stroke-width="2.5" fill="none"/>
              <line x1="20" y1="20" x2="20" y2="35" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
            </template>

            <!-- Pot -->
            <template v-else-if="tile.icon === 'pot'">
              <!-- lid -->
              <path d="M13 16 Q20 11 27 16" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              <line x1="20" y1="11" x2="20" y2="14" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <!-- body -->
              <path d="M10 18 Q10 32 20 32 Q30 32 30 18 Z" :stroke="tile.color" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
              <line x1="10" y1="18" x2="30" y2="18" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <!-- handles -->
              <path d="M10 21 Q6 21 6 24 Q6 27 10 27" :stroke="tile.color" stroke-width="2.2" stroke-linecap="round" fill="none"/>
              <path d="M30 21 Q34 21 34 24 Q34 27 30 27" :stroke="tile.color" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            </template>

            <!-- Star / asterisk 8pt -->
            <template v-else-if="tile.icon === 'star'">
              <line x1="20" y1="6"  x2="20" y2="34" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="6"  y1="20" x2="34" y2="20" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="9.5" y1="9.5" x2="30.5" y2="30.5" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="30.5" y1="9.5" x2="9.5" y2="30.5" :stroke="tile.color" stroke-width="2.5" stroke-linecap="round"/>
            </template>

            <!-- Mitt / oven glove (diamond crosshatch) -->
            <template v-else-if="tile.icon === 'mitt'">
              <!-- glove outline -->
              <path d="M20 6 L32 18 L26 24 L26 34 L14 34 L14 24 L8 18 Z" :stroke="tile.color" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
              <!-- crosshatch lines -->
              <line x1="14" y1="18" x2="26" y2="18" :stroke="tile.color" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="20" y1="12" x2="20" y2="24" :stroke="tile.color" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="11" y1="15" x2="23" y2="27" :stroke="tile.color" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="29" y1="15" x2="17" y2="27" :stroke="tile.color" stroke-width="1.5" stroke-linecap="round"/>
            </template>

            <!-- Rosette / geometric flower -->
            <template v-else-if="tile.icon === 'rosette'">
              <!-- outer octagon -->
              <polygon
                points="20,5 29,8.5 35,17 32,27 23,33 17,33 8,27 5,17 11,8.5"
                :stroke="tile.color" stroke-width="2" fill="none" stroke-linejoin="round"
              />
              <!-- inner star -->
              <polygon
                points="20,11 22.5,17.5 29,20 22.5,22.5 20,29 17.5,22.5 11,20 17.5,17.5"
                :stroke="tile.color" stroke-width="1.8" fill="none" stroke-linejoin="round"
              />
              <!-- center dot -->
              <circle cx="20" cy="20" r="2" :fill="tile.color"/>
            </template>
          </svg>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const tiles = [
  { bg: '#F5DEB3', icon: 'fork',    color: '#8B2500' },
  { bg: '#2C5F4F', icon: 'mitt',    color: '#F5DEB3' },
  { bg: '#E8C4A0', icon: 'spoon',   color: '#CC7722' },
  { bg: '#8B4513', icon: 'star',    color: '#F5DEB3' },
  { bg: '#E8C4A0', icon: 'spoon',   color: '#2C5F4F' },
  { bg: '#2C5F4F', icon: 'pot',     color: '#F5DEB3' },
  { bg: '#CC7722', icon: 'rosette', color: '#8B4513' },
  { bg: '#2C5F4F', icon: 'fork',    color: '#E8C4A0' },
  { bg: '#F5DEB3', icon: 'mitt',    color: '#8B4513' },
  { bg: '#2C5F4F', icon: 'star',    color: '#F5DEB3' },
  { bg: '#CC7722', icon: 'rosette', color: '#2C5F4F' },
  { bg: '#F5DEB3', icon: 'pot',     color: '#2C5F4F' },
  { bg: '#8B4513', icon: 'fork',    color: '#F5DEB3' },
  { bg: '#2C5F4F', icon: 'mitt',    color: '#E8C4A0' },
  { bg: '#F5DEB3', icon: 'star',    color: '#8B4513' },
  { bg: '#CC7722', icon: 'rosette', color: '#F5DEB3' },
]
</script>

<style scoped>
.tile-scroll {
  animation: scroll-left 28s linear infinite;
  /* width = 16 tiles × 3 copies × tile size handled by flex */
}

@keyframes scroll-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-100% / 3)); }
}

@media (prefers-reduced-motion: reduce) {
  .tile-scroll {
    animation: none;
  }
}
</style>
