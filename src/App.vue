<template>
	<div class="app">
		<!-- Sidebar -->
		<Sidebar />

		<!-- Sidebar -->
		<Bottombar />

		<!-- Content -->
		<router-view />
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Bottombar from './components/Bottombar.vue'
</script>

<style lang="scss">
@import './assets/scss/style';
</style>
