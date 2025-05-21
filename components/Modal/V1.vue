<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    v-if="modelValue"
    class="detail-modal-wrapper w-full h-full max-h-[100dvh] top-0 left-0 fixed overflow-hidden"
  >
    <div
      class="close-btn flex justify-end items-center !pr-4 cursor-pointer"
      @click="close"
    >
      Close
    </div>
    <div class="detail-modal relative">
      <div
        class="absolute top-0 left-0 w-full bg-red-900 overflow-auto h-14 z-8 flex items-center justify-end"
      >
        <h3
          class="mr-4 text-2xl font-bold track-tight inline-block text-white z-10"
        >
          {{ getTranslation(currentTour, "name") }}
        </h3>
      </div>
      <div
        class="modal-logo flex items-center w-[20%] h-18 pl-20 py-3 absolute top-0 left-0 z-10"
        style="background-color: #ffe9d5"
      >
        <NuxtImg src="/images/logo.webp" alt="logo" class="w-10 h-10" />
      </div>
      <div class="detail-modal-body">
        <iframe
          :src="getTranslation(currentTour, 'link')"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          allowfullscreen=""
          class="w-full h-full"
        />
      </div>
      <div class="detail-modal-footer absolute bottom-0 left-0 w-full z-10" />
      <div
        class="detail-modal-footer-overlay bg-red-900 absolute bottom-0 right-0 h-13 w-[50%] z-1"
      />
      <div
        class="detail-modal-footer-overlay-menu absolute bottom-0 right-0 h-15 w-[40%] z-10 flex items-center justify-center gap-4"
      >
        <UTooltip
          :content="{
            side: 'top',
            sideOffset: 8,
          }"
          text="View tour"
        >
          <span class="menu-item">
            <Icon name="house" />
          </span>
        </UTooltip>
        <UTooltip
          :content="{
            side: 'top',
            sideOffset: 8,
          }"
          text="View place details"
        >
          <span class="menu-item">
            <Icon name="info" />
          </span>
        </UTooltip>
        <UTooltip
          :content="{
            side: 'top',
            sideOffset: 8,
          }"
          text="View gallary"
        >
          <span class="menu-item">
            <Icon name="image" />
          </span>
        </UTooltip>
        <UTooltip
          :content="{
            side: 'top',
            sideOffset: 8,
          }"
          text="View on map"
        >
          <span class="menu-item">
            <Icon name="pin" />
          </span>
        </UTooltip>
        <div style="position: relative; display: inline-block">
          <UPopover :popper="{ placement: 'top', offset: 8, align:'center' }">
            <span class="menu-item">
              <Icon name="website" />
            </span>

            <template #content>
              <LanguageSelectorV2 />
            </template>
          </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getTranslation } = useTranslation();
const { modelValue, currentTour, close } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentTour: {
    type: Object,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
$close-btn-height: 1.5rem;
$modal-footer-height: 0.5rem;

.detail-modal-wrapper {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2rem);
  z-index: $priority-high;

  .close-btn {
    height: 1.5rem;
  }

  .detail-modal {
    width: 100%;
    height: calc(100% - calc($close-btn-height));
    background-color: #ffe9d5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;

    .modal-logo {
      clip-path: polygon(0 0, 100% 0, 70% 100%, 0 100%);
    }

    .detail-modal-body {
      width: 100%;
      height: calc(100% - 2rem);
      margin-top: 2rem;
    }

    .detail-modal-footer {
      height: 0.5rem;
      background-color: #ffe9d5;
    }
    .detail-modal-footer-overlay {
      clip-path: polygon(0 100%, 10% 0, 100% 0, 100% 100%);
    }
    .detail-modal-footer-overlay-menu {
      background-color: #ffe9d5;
      clip-path: polygon(0 100%, 15% 0, 100% 0, 100% 100%);
      .menu-item {
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        border-radius: 50%;
        color: #fff;
        background-color: #82181a;
        &:hover {
          background-color: #fff;
          color: #82181a;
        }
      }
    }
  }
}
</style>
