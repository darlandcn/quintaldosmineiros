<!-- ─── Root App Shell ─── -->
<!-- Ponto de entrada da aplicação — renderiza a página ativa via NuxtPage -->
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <CartDrawer />
  </div>
</template>
