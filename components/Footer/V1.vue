<template>
  <footer class="text-white">
    <div
      class="flex flex-col lg:flex-row gap-8 !py-10 !px-[10%] bg-gradient-to-r from-yellow-600 to-cyan-700"
    >
      <div class="w-full lg:w-5/12 flex flex-col gap-4">
        <h4 class="flex items-center gap-2 text-2xl font-bold uppercase">
          <NuxtImg
            src="/images/logo.webp"
            alt="logo-bacninh"
            class="w-16 h-16"
          />{{ $t("footer.title") }}
        </h4>
        <p class="text-md text-slate-300">
          {{ $t("footer.description") }}
        </p>
        <ul class="flex flex-col gap-2">
          <li class="flex items-center">
            <NuxtLink to="/privacy-policy">{{
              $t("footer.privacyPolicy")
            }}</NuxtLink
            ><Icon name="chevronRight" />
          </li>
          <li class="flex items-center">
            <NuxtLink href="/terms-of-use">{{ $t("footer.termsOfUse") }}</NuxtLink
            ><Icon name="chevronRight" />
          </li>
          <li class="flex items-center">
            <NuxtLink to="/contact">{{ $t("footer.contact") }}</NuxtLink
            ><Icon name="chevronRight" />
          </li>
        </ul>
      </div>
      <div class="w-full lg:w-4/12 flex flex-col gap-4">
        <h4 class="text-2xl font-bold uppercase">
          {{ $t("footer.contactHeader") }}
        </h4>
        <p class="text-md text-slate-300">{{ $t("footer.owner") }}</p>
        <ol class="flex flex-col gap-2">
          <li class="flex items-center gap-2">
            <Icon name="pin" />
            <p>{{ $t("footer.address") }}</p>
          </li>
          <li class="flex items-center gap-2">
            <Icon name="hotline" />
            <a href="tel:02223822532">{{ $t("footer.phone") }}</a>
          </li>
          <li class="flex items-center gap-2">
            <Icon name="mail" />
            <a href="mailto:svhttdl@bacninh.gov.vn">svhttdl@bacninh.gov.vn</a>
          </li>
        </ol>
      </div>

      <ol class="w-full lg:w-3/12 flex flex-col gap-4">
        <li class="flex items-center gap-2">
          <Icon name="group" />
          <p class="mb-0">
            {{ $t("footer.totalView") }}:
            {{ visitCount.toLocaleString("en-US") }}
          </p>
        </li>
        <li class="flex items-center gap-2">
          <Icon name="user" />
          <p class="mb-0">
            {{ $t("footer.viewing") }}:
            {{ onlineCount.toLocaleString("en-US") }}
          </p>
        </li>
      </ol>
    </div>
    <div class="bg-gray-700 !py-2 !px-4">
      <p class="text-center">
        {{ $t("footer.copyright") }}
      </p>
    </div>
  </footer>
</template>

<script setup>
const visitCount = 2024446;
const onlineCount = 172;
</script>
