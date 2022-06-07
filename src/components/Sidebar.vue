<template>
	<aside class="sidebar" :class="`${is_expanded ? 'sidebar__is-expanded' : ''}`">

		<div class="sidebar__toggle-wrap menu-toggle-wrap">
			<button class="sidebar__toggle-button" @click="ToggleMenu">
				<span class="sidebar__toggle-icon material-icons" v-if="!is_expanded">menu</span>
				<span class="sidebar__toggle-icon material-icons" v-else>close</span>
			</button>
		</div>

		<h3 class="sidebar__menu-title">Menu</h3>
		<div class="sidebar__menu">
			<router-link to="/" class="sidebar__menu-button button">
				<span class="sidebar__menu-icon material-icons">home</span>
				<span class="sidebar__menu-text text">Home</span>
			</router-link>
			<router-link to="/comments" class="sidebar__menu-button button">
				<span class="sidebar__menu-icon material-icons">forum</span>
				<span class="sidebar__menu-text text">Comments</span>
			</router-link>
		</div>

		<div class="sidebar__bound"></div>

		<div class="sidebar__menu">
			<router-link to="/account" class="sidebar__menu-button button">
				<span class="sidebar__menu-icon material-icons">account_circle</span>
				<span class="sidebar__menu-text text">Account</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>
