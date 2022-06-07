<template>
	<main class="home-page">
		<div class="home-page__left-container">
			<img class="home-page__my-image" src="../assets/img/my.jpg" alt="myPicture">
			<div class="home-page__my-list">
				<p>Skills</p>
				<ul v-for="val in skills">
					<li>{{val}}</li>
				</ul>
			</div>
			<div class="home-page__my-list">
				<p>Media Social</p>
				<ul v-for="val in mediaSocial">
					<li>
						<a :href="val.link" target="_blank">{{val.name}}</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="home-page__right-container">
			<div class="home-page__my-profile">
				<h1>{{ about.name }}</h1>
				<h3>{{ about.profession }}</h3>
				<p>I am Front-End web developer with strong passion to learn new things and use creative approach to problem solve.</p>
			</div>
			<div class="home-page__my-detail">
				<div class="home-page__my-detail-tabs">
					<div class="home-page__my-detail-tab" :class="{'home-page__my-detail-tab_active':currentTab == i}" v-for="(value, i) in tabs" :key="i" @click="changeTab(i)">
						{{ value.title }}
					</div>
				</div>
				<div class="home-page__my-detail-content" v-if="currentTab == 0">
					<div class="home-page__my-detail-row" v-for="(value, key) in about">
						<div class="home-page__my-detail-col">
							{{ key }}
						</div>
						<div class="home-page__my-detail-col">
							{{ value }}
						</div>
					</div>
				</div>
				<div class="home-page__my-detail-content" v-else-if="currentTab == 1">
					<div class="home-page__my-detail-row" v-for="(value) in education">
						<div class="home-page__my-detail-custom">
							<div class="home-page__my-detail-custom_title">
								{{ value.school }}
							</div>
							<div class="home-page__my-detail-custom_subtitle" v-if="value.degree.length > 0">
								{{ value.degree }}
							</div>
							<div class="home-page__my-detail-custom_info" v-if="value.info.length > 0">
								- {{ value.info }}
							</div>
							<div class="home-page__my-detail-custom_detail">
								{{ value.detail }}
							</div>
						</div>
					</div>
				</div>
				<div class="home-page__my-detail-content" v-else>
					<div class="home-page__my-detail-row" v-for="(value) in experience">
						<div class="home-page__my-detail-custom">
							<div class="home-page__my-detail-custom_title">
								{{ value.title }} <span>({{ value.status }})</span>
							</div>
							<div class="home-page__my-detail-custom_subtitle">
								{{ value.company }} | <span>{{ value.period }}</span>
							</div>
							<div class="home-page__my-detail-custom_info">
								// {{ value.info }}
							</div>
							<div class="home-page__my-detail-custom_detail">
								<span>Tech Stack:</span>
								<ul>
									<li v-for="(value) in value.tech">{{value}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref } from 'vue'

let skills = ref([
	'VueJS/Vuex',
	'ReactJS',
	'React Native',
	'SCSS/CSS',
	'HTML',
	'VueJS/Vuex',
	'Javascript/JQuery',
	'Git',
])

let mediaSocial = ref([
	{
		name : 'Instagram',
		link : 'https://www.instagram.com/aldietprasetya/'
	},
	{
		name : 'LinkedIn',
		link : 'https://www.linkedin.com/in/aldiet-prasetya-62888b120/'
	},
	{
		name : 'Github',
		link : 'https://github.com/aldietprasetya'
	},
])

let tabs = ref([
	{
		id : 0,
		title : 'About'
	},
	{
		id : 1,
		title : 'Education'
	},
	{
		id : 2,
		title : 'Experience'
	},
])

let about = ref({
	'name': 'Aldiet Prasetya',
	'profession': 'Front-end Engineer',
  'email': 'aldietprasetya@gmail.com',
	'phone': '+62 813 2228 3864',
	'address': 'Jalan Somawinata, Blok Anggrek No 9C, Cidahu, Bandung Barat',
})

let education = ref([
	{
		'school': 'STMIK LIKMI',
	  'degree': 'Bachelor of Information Technology, 2019',
	  'info': 'Studying in Informatics Engineering and the field of Software Engineering.',
	  'detail': '(GPA : 3.01)',
	},
	{
		'school': 'SMAK 3 BPK PENABUR Bandung',
	  'degree': '',
	  'info': '',
	  'detail': '2012-2015',
	},
])

let experience = ref([
	{
		'title': 'FRONT-END DEVELOPER',
		'status': 'Full Time',
		'company': 'Gleeger Indonesia',
	  'period': 'Sep 2019 - Present',
	  'info': 'Currently develop and maintain crypto trading website to make more responsive for users.',
	  'tech': [
			'Vue.js',
			'CSS Preprocessor',
			'BEM Structure',
			'Three.js',
		],
	},
	{
		'title': 'FRONT-END DEVELOPER',
		'status': 'Internship',
		'company': 'STMIK LIKMI',
	  'period': 'Jul 2018 – Jul 2019',
	  'info': 'Build website and student enrollment for campus.',
	  'tech': [
			'Wordpress',
			'HTML, CSS & Javascript',
			'PHP',
		],
	},
	{
		'title': 'FRONT-END DEVELOPER',
		'status': 'Internship',
		'company': 'Ervanation',
	  'period': 'Jul 2015 – Jun 2017',
	  'info': 'Build and customize website using CMS Wordpress.',
	  'tech': [
			'Wordpress',
			'HTML, CSS & Javascript',
			'PHP',
		],
	},
])

let currentTab = ref(0)

const changeTab = (val) => {
	currentTab.value = val
}
</script>
