<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseInput from "../components/ui/BaseInput.vue";
import GradientBackground from "../components/ui/GradientBackground.vue";

const loading = ref(false);
const errorMessage = ref("");

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid Email"),
  password: yup.string().required("Password is required").min(6, "Minimum 6 characters"),
});

const {handleSubmit} = useForm( { validationSchema: schema });
const {value: email, errorMessage: emailError} = useField<string>("email");
const {value: password, errorMessage: passwordError} = useField<string>("password");

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  errorMessage.value = "";

  try {
    await new Promise(() => setTimeout(() => {
      console.log("Simulating API call with values:", values);
    }, 1000));
    console.log("Login successful", values);
  } catch {
    errorMessage.value = "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <GradientBackground>
    <div class="h-screen flex">
      <div class="bg-[url('/imgLogin.png')] bg-cover bg-center hidden md:block md:w-5/12" />
      <div
        class="w-full md:w-7/12 flex items-center justify-center px-8 py-12"
      >
        <div class="w-full max-w-md space-y-8">
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-white">
              Welcome
            </h2>
          </div>
          <form
            @submit.prevent="onSubmit"
            class="space-y-6"
          >
            <div class="flex flex-col">
              <BaseInput
                v-model="email"
                name="email"
                label="Email"
                type="email"
                required
                :error="emailError"
                placeholder="email@example.com"
              />
            </div>

            <div class="flex flex-col relative">
              <BaseInput
                v-model="password"
                name="password"
                label="Password"
                type="password"
                :error="passwordError"
                required
                placeholder="Enter your password"
                show-toggle-password
              />
            </div>
            <BaseButton
              type="submit"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <span :class="{ 'opacity-0': loading }">Log In</span>
            </BaseButton>

            <div
              v-if="errorMessage"
              class="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg"
            >
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </GradientBackground>
</template>
