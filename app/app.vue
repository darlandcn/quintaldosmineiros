<!-- ─── Root App Shell ─── -->
<!-- Ponto de entrada da aplicação — renderiza a página ativa via NuxtPage -->
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <CartDrawer />
  </div>
</template>
