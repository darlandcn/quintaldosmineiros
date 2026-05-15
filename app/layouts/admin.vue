<template>
  <div class="flex h-screen w-screen overflow-hidden bg-[#f8faf8]">
    <AdminSidebar />
    <main class="flex-1 overflow-hidden flex flex-col">
      <slot />
    </main>
  </div>
</template>
