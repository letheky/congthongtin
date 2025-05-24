<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full overflow-hidden">
    <BreadCrumbV1 />
    <article
      class="w-full max-w-7xl mx-auto py-10 px-5 md:px-10 flex flex-col lg:flex-row gap-5"
    >
      <main class="w-full lg:w-2/3">
        <template v-if="article">
          <h2 class="text-3xl font-semibold text-slate-800 py-4">
            {{ getTranslation(article, "title") }}
          </h2>
          <hr class="text-slate-200" />
          <span
            class="text-slate-500 text-sm flex flex-col sm:flex-row align-center gap-3 my-4"
          >
            <p class="flex items-center gap-1">
              <Icon name="calendar" class="w-5 h-5 text-red-700" />
              {{ $dayjs(article.created_at).format("DD/MM/YYYY") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="view" class="w-5 h-5 text-red-700" />
              {{ article.comment_list.length }}
              {{ $t("article.comment") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="view" class="w-5 h-5 text-red-700" />
              {{ article.view }}
              {{ $t("article.view") }}
            </p>

            <p class="flex items-center gap-1">
              <Icon name="like" class="w-5 h-5 text-red-700" />
              {{ article.like }}
              {{ $t("article.like") }}
            </p>
          </span>
          <div class="w-full h-fit">
            <UCarousel
              v-slot="{ item }"
              loop
              dots
              :autoplay="{ delay: 2000 }"
              :items="article.image_list"
              class="w-full h-full"
            >
              <NuxtImg
                :src="item.image"
                class="w-full aspect-[2/1] h-60 sm:h-100 md:h-130 lg:h-160 rounded-lg"
              />
            </UCarousel>
          </div>
          <section
            class="p-5 md:p-10 text-xl border border-gray-200 rounded-md"
          >
            <div
              class="my-5 text-slate-700"
              v-html="getTranslation(article, 'content')"
            />
            <hr />
            <UIShareGroupV1 />
          </section>
          <h2 class="text-slate-700 text-3xl font-bold tracking-tighter my-6">
            {{ article.comment_list.length }} {{ $t("article.comment") }}
          </h2>
          <section class="w-full pb-5">
            <span
              v-for="comment in article.comment_list"
              :key="comment.id"
              class="w-full flex gap-5 py-2 ml-10"
            >
              <UIAvatarV1 :alt="comment.name" size="sm" />
              <div class="flex flex-col gap-3">
                <h6 class="text-slate-700 font-semibold">
                  {{ comment.email }}
                </h6>
                <p class="text-slate-500">{{ comment.content }}</p>
              </div>
            </span>
          </section>
          <hr class="text-slate-200 w-full" />
          <h2 class="text-slate-700 text-3xl font-bold tracking-tighter my-6">
            {{ $t("article.form.writeComment") }}
          </h2>
          <ClientOnly>
            <UIPostFormCommentV1 :api-path="`/api/article/${articleId}`" />
          </ClientOnly>
        </template>
      </main>
      <aside class="w-full lg:w-1/3 flex flex-col gap-5">
        <AsideHighlightedArticleV1 />
        <AsideNewsV1 />
      </aside>
    </article>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
const { getTranslation } = useTranslation();

const { data: categories } = await useFetch("/api/article/categories");
const abouId = categories.value?.results?.[0]?.id;

const { data: aboutGeneral } = await useFetch(
  `/api/article/by-category?category=${abouId}`
);
const articleId = aboutGeneral.value.results[0].id;

const { data: article } = await useFetch(`/api/article/${articleId}`);
</script>

<style scoped></style>
