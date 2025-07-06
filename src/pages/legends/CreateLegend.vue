<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseDateInput from '../../components/ui/BaseDateInput.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import BaseTextarea from '../../components/ui/BaseTextarea.vue';
import GradientBackground from '../../components/ui/GradientBackground.vue';


const loading = ref(false);



const schema = yup.object({
  name: yup.string().required('Name is required'),
  category: yup.string().required('Category is required'),
  province: yup.string().required('Province is required'),
  canton: yup.string().required('Canton is required'),
  district: yup.string().required('District is required'),
  date: yup.string().required('Date is required'),
  description: yup.string().required('Description is required'),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('fileSize', 'File too large. Max 5MB', (file) =>
      file instanceof File ? file.size <= 5 * 1024 * 1024 : false
    )
    .test('fileType', 'Unsupported file type', (file) =>
      file instanceof File ? ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) : false
    ),
})


const { handleSubmit } = useForm({ validationSchema: schema })

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: category, errorMessage: categoryError } = useField<string>('category')
const { value: province, errorMessage: provinceError } = useField<string>('province')
const { value: canton, errorMessage: cantonError } = useField<string>('canton')
const { value: district, errorMessage: districtError } = useField<string>('district')
const { value: date, errorMessage: dateError } = useField<string>('date')
const { value: description, errorMessage: descriptionError } = useField<string>('description')
const { value: image, errorMessage: imageError } = useField<File>('image')

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  console.log('Legend created with values:', values)
  setTimeout(() => (loading.value = false), 1000)
})

</script>

<template>
  <GradientBackground>
    <div class="relative min-h-screen flex  overflow-auto">
      <div
        class="w-full md:w-7/12 flex items-center justify-center px-8 py-12 "
      >
        <div class="w-full max-w-lg space-y-8 relative z-10">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-6xl font-bold text-white mb-4">
              Create a Legend
            </h1>
            <p class="text-xl text-gray-300 mb-8">
              Add the traditional legend that you know!
            </p>
          </div>
          <div class="">
            <form
              @submit.prevent="onSubmit"
              class="space-y-6"
            >
              <BaseInput
                v-model="name"
                name="name"
                label="Name"
                type="text"
                required
                :error="nameError"
                placeholder="Enter name of the legend..."
              />   
              <BaseSelect
                v-model="category"
                name="category"
                label="Category"
                placeholder="Select a category..."
                required
                :error="categoryError"
              />
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseSelect
                  v-model="province"
                  name="province"
                  label="Province"
                  placeholder="Province..."
                  required
                  :error="provinceError"
                />
            
                <BaseSelect
                  v-model="canton"
                  name="canton"
                  label="Canton"
                  placeholder="Canton..."
                  
                  required
                  :error="cantonError"
                />
                <BaseSelect
                  v-model="district"
                  name="district"
                  label="District"
                  placeholder="District"
                  required
                  :error="districtError"
                />
              </div>
        
              <BaseDateInput
                v-model="date"
                name="date"
                label="Date"
                placeholder="Select a date..."
                required
                :error="dateError"
              />
              <BaseTextarea
                v-model="description"
                name="description"
                label="Description"
                placeholder="Write a brief description of the legend..."
                type="textarea"
                required
                :error="descriptionError"
              />
              <div class="space-y-2">
                <BaseInput
                  v-model="image"
                  type="file"
                  accept="image/*"
                  name="image"
                  label="Image"
                  placeholder="Upload an image of the legend"
                  required
                  :error="imageError"
                />    
                <p class="text-gray-400 text-xs">
                  Formatos: JPG, PNG, GIF. Máximo 5MB
                </p>
              </div>
              <div class="flex space-x-4 pt-6">    
                <BaseButton
                  type="submit"
                  class="w-full"
                >
                  Create Legend
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 md:relative md:w-5/12">
        <img
          src="/imgCreateLegends.png"
          alt="Legendary tales illustration"
          class="w-full h-full object-cover md:object-contain opacity-50 md:opacity-100"
        >
      </div>
    </div>
  </GradientBackground>
</template>