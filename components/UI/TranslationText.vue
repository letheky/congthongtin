<template>
  <span v-if="isLoading"><UISpinnerV1 /></span>
  <span v-else>{{ translatedText }}</span>
</template>

<script setup>
import useTranslation from "~/composables/useTranslation"; // Adjust path if needed

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
});

const { getTranslationAsync } = useTranslation();
const translatedText = ref("");
const isLoading = ref(true); // Optional: for showing a loading state

watchEffect(async () => {
  if (props.item && props.field) {
    isLoading.value = true;
    translatedText.value = await getTranslationAsync.value(
      props.item,
      props.field
    );
    isLoading.value = false;
  }
});
</script>
