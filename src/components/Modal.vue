<template>
	<transition name="fade">
		<div class="vue-modal" v-show="open">
      <transition name="drop-in">
        <div class="vue-modal__inner">
          <div class="vue-modal__content">
            <slot />
						<div class="vue-modal__button-section">
							<button type="button" @click="close">Close</button>
							<button type="button" @click="confirm">Confirm</button>
						</div>
          </div>
        </div>
      </transition>
    </div>
	</transition>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
	setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    const confirm = () => {
      emit("confirm");
    };

    const handleKeyup = (event) => {
      if (event.keyCode === 27) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keyup", handleKeyup));
    onUnmounted(() => document.removeEventListener("keyup", handleKeyup));

    return {
			close,
			confirm
		};
  },
};
</script>
