<template>
  <div class="flex-1 w-full h-full">
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      arrows
      :items="imageList"
      :prev="{ onClick: onClickPrev }"
      :next="{ onClick: onClickNext }"
      class="w-full"
      @select="onSelect"
    >
      <NuxtImg :src="item.image"  class="w-full h-full rounded-lg" />
    </UCarousel>

    <div class="flex gap-1 justify-center pt-4">
      <div
        v-for="(item, index) in imageList"
        :key="index"
        class="size-11 opacity-25 hover:opacity-100 transition-opacity"
        :class="{ 'opacity-100': activeIndex === index }"
        @click="select(index)"
      >
        <NuxtImg :src="item.image"  class="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Image {
  image: string;
  id: string;
}
const { imageList } = defineProps({
  imageList: { type: Array<Image>, required: true },
});

const carousel = useTemplateRef("carousel");
const activeIndex = ref(0);

function onClickPrev() {
  activeIndex.value--;
}
function onClickNext() {
  activeIndex.value++;
}
function onSelect(index: number) {
  activeIndex.value = index;
}

function select(index: number) {
  activeIndex.value = index;

  carousel.value?.emblaApi?.scrollTo(index);
}
</script>
