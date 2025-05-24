<template>
  <div class="w-full border border-gray-200 rounded-md p-10">
    <UForm
      :validate="validate"
      :state="form"
      class="w-full grid gap-4 mb-6 md:grid-cols-2"
      @submit="handleSubmit"
    >
      <UFormField
        :label="$t('article.service')"
        name="point"
        class="col-span-full md:col-span-2"
      >
        <UIRatingV1
          v-model="form.point"
          :interactive="isSubmitting ? false : true"
          :allow-half="false"
        />
      </UFormField>
      <UFormField name="name" class="col-span-full md:col-span-1">
        <UInput
          v-model="form.name"
          type="text"
          class="w-full uinput"
          :placeholder="`${$t('form.name')}`"
          :disabled="isSubmitting"
        />
      </UFormField>

      <UFormField name="email" class="col-span-full md:col-span-1">
        <UInput
          v-model="form.email"
          type="email"
          class="w-full uinput"
          :placeholder="`${$t('form.email')}`"
          :disabled="isSubmitting"
        />
      </UFormField>

      <UFormField name="content" class="col-span-full">
        <UTextarea
          v-model="form.content"
          :placeholder="`${$t('form.content')}`"
          class="w-full h-48 uinput"
          :disabled="isSubmitting"
        />
      </UFormField>

      <UIPrimaryBtn
        type="submit"
        class="font-bold uppercase mt-6"
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
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui";
const { t } = useI18n();

// Reactive form object
const form = reactive({
  point: 0,
  name: "",
  email: "",
  content: "",
});

const isSubmitting = ref(false);
const { apiPath } = defineProps({
  apiPath: { type: String, required: true },
});

const toast = useToast(); // Nuxt UI's toast notification

// Form validation
const validate = (state: typeof form): FormError[] => {
  const errors: FormError[] = [];
  if (!state.point)
    errors.push({ name: "point", message: "Point is required" });
  else if (state.point <= 0 && state.point > 5)
    errors.push({
      name: "point",
      message: "Point must be greater than 0 and less than 5",
    });
  if (!state.name) errors.push({ name: "name", message: "Name is required" });
  if (!state.email) {
    errors.push({ name: "email", message: "Email is required" });
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.push({ name: "email", message: "Email is invalid" });
  }
  if (!state.content)
    errors.push({ name: "content", message: "Content is required" });
  return errors;
};

// Handle form submission
async function handleSubmit(event: FormSubmitEvent<typeof form>) {
  isSubmitting.value = true;
  try {
    // Send data to the backend
    await $fetch(apiPath, {
      method: "POST",
      body: event.data,
    });

    // Reset form and show success message
    form.point = 0;
    form.name = "";
    form.email = "";
    form.content = "";

    toast.add({
      description: t("article.form.success.rate"),
      color: "success",
    });
  } catch {
    toast.add({
      description: t("article.form.error.normal"),
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss" scoped>
:deep(label) {
  color: #324157 !important;
  font-size: 20px;
}
:deep(.uinput) {
  input,
  textarea {
    background-color: #e5e7eb;
    border: none;
    outline: none;
    color: #111827;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.125rem;
    padding: 0.625rem;
    // Focus states
    &:focus {
      box-shadow: 0 0 0 3px #3b82f6; // focus:ring effect
      border-color: #3b82f6; // focus:border-blue-500
    }
    &::-webkit-autofill {
      box-shadow: 0 0 0px 1000px #e5e7eb inset !important; /* Tailwind's bg-gray-200 */
      -webkit-text-fill-color: #111827 !important; /* Tailwind's text-gray-900 */
      caret-color: #111827;
    }
  }

  textarea {
    min-height: 200px !important;
  }
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
