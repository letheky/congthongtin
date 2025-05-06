<script setup lang="ts">
// Page title
const title = ref("404-Page Not Found");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - 404-Page Not Found`
      : "Cổng thông tin du lịch Bắc Ninh - Website thương mại điện tử Bắc Ninh hoàn toàn mới";
  },
});
</script>
<template>
  <div class="d-flex justify-center align-center text-center h-100vh">
    <div>
      <img src="/images/error-img.svg" width="500" alt="404" />
      <h1 class="text-h1 pt-3">Opps!!!</h1>
      <h4 class="text-h4 my-8">Trang bạn tìm không tồn tại.</h4>
      <v-btn flat color="primary" class="mb-4" to="/">Quay về trang chủ</v-btn>
    </div>
  </div>
</template>
