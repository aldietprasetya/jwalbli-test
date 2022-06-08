<template>
	<main class="comments-page">
		<h1>Post Something</h1>

		<div class="comments-page__comment-container">
			<input class="comments-page__comment-input" type="text" v-model="user" placeholder="User">
			<textarea class="comments-page__comment-input" type="text" v-model="comment" placeholder="Text..." rows="4" cols="50" />
			<button class="comments-page__comment-button" type="button" name="button" @click="submitComment()" :disabled="user.length < 1 && comment.length < 1">Post</button>
		</div>

		<div class="comments-page__posts" v-for="(val, i) in posts" :key="i" v-if="!load">
			<div class="comments-page__posts-container" :class="{'comments-page__posts-container_border':(val.commentary != undefined ? val.commentary.length > 0 : false)}">
				<div class="comments-page__tools">
					<div class="comments-page__tools-section" @click="showModal(val,'edit')">
						<span class="material-icons">edit</span>
					</div>
					<div class="comments-page__tools-section" @click="showModal(val,'delete')">
						<span class="material-icons">delete</span>
					</div>
				</div>
				<a class="comments-page__posts-img-container" target="_blank" :href="val.thumbnailUrl">
					<img :src="val.url" :alt="val.title">
				</a>
				<div class="comments-page__posts-section">
					<div class="comments-page__posts-name">
						{{val.title}}
					</div>
					<div class="comments-page__posts-body">
						{{val.body}}
					</div>
				</div>
			</div>
			<span class="comments-page__posts-infos" v-if="(val.commentary != undefined ? val.commentary.length > 0 : false)">
				Commentary :
			</span>
			<div class="comments-page__comment" v-for="(commentary, i) in val.commentary" :key="i" v-if="(val.commentary != undefined ? val.commentary.length > 0 : false)">
				<div class="comments-page__comment-section">
					<div class="comments-page__comment-name">
						{{commentary.name}}
						<span>
							<a target="_blank" :href="`mailto:${commentary.email}`">
								( {{commentary.email}} )
							</a>
						</span>
					</div>
					<div class="comments-page__comment-body">
						{{commentary.body}}
					</div>
				</div>
			</div>
		</div>
		<div class="comments-page__load" v-else>
			Loading...
		</div>

	</main>
	<Modal :open="isOpen" @close="isOpen = !isOpen" @confirm="modalConfirmation">
    <h3>{{ (modalType == 'edit' ? 'Edit Post' : 'Are you sure you want to delete this post?') }}</h3>
		<div class="vue-modal__delete" v-if="modalType == 'delete'">
			<div class="vue-modal__delete-title">
				{{modalVal.title}}
			</div>
			<div class="vue-modal__delete-body">
				{{modalVal.body}}
			</div>
		</div>
		<div class="vue-modal__edit" v-else>
			<div class="comments-page__comment-container">
				<input class="comments-page__comment-input" type="text" v-model="userEdit" placeholder="User">
				<textarea class="comments-page__comment-input" type="text" v-model="commentEdit" placeholder="Text..." rows="4" cols="50" />
			</div>
		</div>
  </Modal>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import Modal from "../components/Modal.vue";

components: { Modal }

const toast = useToast()

let photos = ref([]);
let commentary = ref([]);
let posts = ref([]);
let modalVal = ref([]);
let user = ref('');
let comment = ref('');
let userEdit = ref('');
let commentEdit = ref('');
let modalType = ref('');
let load = ref(true);
let isOpen = ref(false);

onMounted(() => {
	getPhotos()
})

function getPhotos() {
	axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
	.then((res) => {
		photos.value = res.data

		getPosts()
	}).catch((err) => {
		console.log(err)
	});
}

function getPosts() {
	axios.get('https://jsonplaceholder.typicode.com/posts',{
    params: {
      _limit: 5
     }
  })
	.then((res) => {
		posts.value = res.data.reverse()

		posts.value.forEach(async (item) => {
			let commentary = await axios.get('https://jsonplaceholder.typicode.com/posts/'+ item.id +'/comments')
			item.commentary = commentary.data
		});

		photos.value.forEach((photosData, i) => {
			posts.value.forEach((postsData, i) => {
				if (postsData.id == photosData.id) {
					postsData.url = photosData.url
					postsData.thumbnailUrl = photosData.thumbnailUrl
				}
			});
		});

		load.value = false

	}).catch((err) => {
		console.log(err)
	});
}

function submitComment() {
	const data = {
		title: user.value,
    body: comment.value,
    userId: 1,
	}

	axios.post('https://jsonplaceholder.typicode.com/posts', data)
	.then((res) => {
		load.value = true
		user.value = ''
		comment.value = ''
		getPosts()
		toast.success("Success Post Data!");
	}).catch((err) => {
		toast.error("Failed Post Data!");
	});
}

function showModal(val,type) {
	modalType.value = type
	isOpen.value = true
	modalVal.value = val
	if (type == 'edit') {
		userEdit.value = val.title
		commentEdit.value = val.body
	}
}

function modalConfirmation() {
	if (modalType.value == 'delete') {
		axios.delete('https://jsonplaceholder.typicode.com/posts/'+ modalVal.value.id)
		.then((res) => {
			getPosts()
			toast.success("Success Delete Post!");
		}).catch((err) => {
			toast.error("Failed Delete Post!");
		});
	} else {
		const editForm = {
			id: modalVal.value.id,
	    title: userEdit.value,
	    body: commentEdit.value,
	    userId: modalVal.value.userId,
		}

		axios.put('https://jsonplaceholder.typicode.com/posts/'+ modalVal.value.id, editForm)
		.then((res) => {
			getPosts()
			toast.success("Success Edit Post!");
		}).catch((err) => {
			toast.error("Failed Edit Post!");
		});
	}
	isOpen.value = false
}

</script>
