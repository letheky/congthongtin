<!-- eslint-disable vue/html-self-closing -->
<template>
  <div v-if="modelValue" class="detail-modal-wrapper">
    <div class="detail-modal">
      <div
        class="detail-modal-body"
        :style="{ background: 'url(tourBanner) no-repeat center center ' }"
      >
        {{ tourContext }}
      </div>
      <div class="detail-modal-footer">
        <hr />
        <UButton @click="close">Close</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const { modelValue, tourContext, tourBanner, close } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  tourContext: {
    type: String,
    required: true,
  },
  tourBanner: {
    type: String,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.detail-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: $priority-high;
  .detail-modal {
    width: 60%;
    height: 60%;
    background-color: #ffe9d5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 2rem 3rem;

    .detail-modal-body {
      width: 100%;
      height: 100%;
    }
    .detail-modal-footer {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 10rem;
      padding: 0 3rem;

      hr {
        width: 100%;
        margin-bottom: 2rem;
      }
      .detail-modal-close {
        width: 3rem;
        height: 3rem;
        margin-left: auto;
      }
    }
  }
}
</style>
