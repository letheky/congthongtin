<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <Transition name="mac-window">
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
            class="w-full h-full rounded-md"
          />
          <Transition name="modal-fade" mode="out-in">
            <!-- Info tab-->
            <div
              v-if="activeTab === 'info'"
              class="absolute top-0 left-0 w-full h-full bg-slate-950"
            >
              <article
                class="info-article w-[80%] h-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-2xl"
              >
                <span
                  class="absolute -top-7 -right-7 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center"
                >
                  <Icon
                    name="close"
                    class="w-5 h-5 text-white cursor-pointer"
                    @click="handleChangeActiveTab('home')"
                  />
                </span>
                <div
                  class="flex items-center justify-end h-full p-8 rounded-md"
                  :style="{
                    background: `url(${currentTour.thumbnail}) no-repeat center center/cover`,
                  }"
                >
                  <div
                    class="info-context w-5/12 overflow-y-scroll max-h-full h-full p-4 gap-2 flex flex-col border-4 border-info-400 rounded-md shadow-xl"
                    style="background-color: rgba(0, 0, 0, 0.6)"
                    v-html="getTranslation(currentTour, 'content')"
                  />
                </div>
              </article>
            </div>
            <!-- Gallery tab-->
            <div
              v-else-if="activeTab === 'gallery'"
              class="absolute top-0 left-0 w-full h-full bg-slate-950"
            >
              <article
                class="info-article w-[80%] h-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-2xl"
              >
                <span
                  class="absolute -top-7 -right-7 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center"
                >
                  <Icon
                    name="close"
                    class="w-5 h-5 text-white cursor-pointer"
                    @click="handleChangeActiveTab('home')"
                  />
                </span>
                <div
                  class="flex items-center justify-center w-full h-full p-12 rounded-md"
                >
                  <UICarouselV1 :image-list="currentTour.image_list" />
                </div>
              </article>
            </div>
            <!-- Map tab-->
            <div
              v-else-if="activeTab === 'map'"
              class="absolute top-0 left-0 w-full h-full bg-slate-950"
            >
              <article
                class="info-article w-[80%] h-[80%] max-h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-2xl"
              >
                <span
                  class="absolute -top-7 -right-7 w-8 h-8 border-2 border-white rounded-full flex items-center justify-center"
                >
                  <Icon
                    name="close"
                    class="w-5 h-5 text-white cursor-pointer"
                    @click="handleChangeActiveTab('home')"
                  />
                </span>
                <div
                  class="flex items-center justify-center w-full h-full p-12 rounded-md"
                >
                  <UIMapV1 :target-location="currentTour" />
                </div>
              </article>
            </div>
          </Transition>
        </div>
        <div class="detail-modal-footer absolute bottom-0 left-0 w-full z-10" />
        <div
          class="detail-modal-footer-overlay bg-red-900 absolute bottom-0 right-0 h-13 w-[50%] z-1"
        />
        <div
          class="detail-modal-footer-overlay-menu absolute bottom-0 right-0 h-15 w-[40%] z-10 flex items-center justify-center gap-4"
        >
          <UTooltip
            v-for="tab in tabs"
            :key="tab.id"
            :content="{
              side: 'top',
              sideOffset: 8,
            }"
            :text="tab.tooltip"
          >
            <span
              class="menu-item"
              :class="activeTab === tab.id ? 'active' : ''"
              @click="handleChangeActiveTab(tab.id)"
            >
              <Icon :name="tab.icon" />
            </span>
          </UTooltip>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { getTranslation } = useTranslation();
const { modelValue, currentTourId, close } = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentTourId: {
    type: String,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});
//Fetch tour data
const { data: currentTour } = await useFetch(`/api/tour360/${currentTourId}`);

//Active tab
const tabs = [
  {
    id: "home",
    label: "Home",
    icon: "house",
    tooltip: "View tour",
  },
  {
    id: "info",
    label: "Info",
    icon: "info",
    tooltip: "View place details",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: "image",
    tooltip: "View gallery",
  },
  {
    id: "map",
    label: "Map",
    icon: "pin",
    tooltip: "View on map",
  },
];
const activeTab = ref("home");
const handleChangeActiveTab = (tab) => {
  activeTab.value = tab;
};

// Watch the destructured `modelValue` prop
watch(
  () => modelValue,
  (newValue) => {
    if (import.meta.client) {
      if (newValue) {
        document.body.classList.add("no-scroll");
      }
    }
  },
  { immediate: true }
); // `immediate: true` ensures it runs once on component mount
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
      background-color: #000000;

      .info-article {
        background: linear-gradient(
          135deg,
          #ffc6ef 30%,
          #fff3db 30%,
          #fff3db 70%,
          #a2efd7 70%
        );
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(2rem);
        .info-context {
          &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
          }
          &::-webkit-scrollbar-thumb {
            height: 9px;
            width: 9px;
            border-radius: 4px;
            background-color: #d5ac68;
          }
          &::-webkit-scrollbar {
            height: 9px;
            width: 9px;
          }
        }
      }
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
        &.active,
        &:hover {
          background-color: #fff;
          color: #82181a;
        }
      }
    }
  }
}
</style>
