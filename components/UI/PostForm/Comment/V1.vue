<template>
  <!-- eslint-disable -->
  <form
    method="post"
    class="w-full grid gap-2 mb-6 md:grid-cols-2"
    @submit.prevent="handleSubmit"
  >
    <input
      id="name"
      v-model="form.name"
      type="text"
      class="bg-gray-200 border border-gray-300 outline-none !text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 !p-2.5"
      :placeholder="`${$t('form.name')}`"
      required
    />
    <input
      id="email"
      v-model="form.email"
      type="email"
      class="bg-gray-200 border border-gray-300 outline-none !text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 !p-2.5"
      :placeholder="`${$t('form.email')}`"
      required
    />
    <textarea
      id="content"
      v-model="form.content"
      class="bg-gray-200 border border-gray-300 outline-none !text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 !p-2.5 col-span-2 h-48"
      :placeholder="`${$t('form.content')}`"
    />
    <UIPrimaryBtn
      type="submit"
      class="font-bold uppercase"
      :disabled="isSubmitting"
    >
      <p class="flex items-center gap-1" :class="{ sending: isSubmitting }">
        {{ $t(isSubmitting ? "form.submitting" : "form.submit") }}
        <span
          class="dot-wave"
          :style="{ display: isSubmitting ? 'block' : 'none' }"
        >
          <span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </span>
      </p>
    </UIPrimaryBtn>
  </form>
</template>

<script setup lang="ts">
// Reactive form object
const form = ref({
  name: "",
  email: "",
  content: "",
});

const isSubmitting = ref(false);

// Handle form submission
const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // Send data to the backend
    const { success } = await $fetch("/api/form-submit", {
      method: "POST",
      body: form.value,
    });

    if (success) {
      // Reset form and navigate or show a success message
      form.value = {
        name: "",
        email: "",
        content: "",
      };
      alert("Form submitted successfully!");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred while submitting the form.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #e5e7eb inset !important; /* Tailwind's bg-gray-200 */
  -webkit-text-fill-color: #111827 !important; /* Tailwind's text-gray-900 */
  caret-color: #111827;
}
.sending .dot-wave .dot {
  animation: wave 1.2s infinite;
  display: inline-block;
  font-weight: bold;
}

.dot-wave .dot:nth-child(1) {
  animation-delay: 0s;
}
.dot-wave .dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot-wave .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wave {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
}
</style>
