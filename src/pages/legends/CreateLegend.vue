<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import * as yup from 'yup';
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseDateInput from '../../components/ui/BaseDateInput.vue';
import BaseFileInput from '../../components/ui/BaseFileInput.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseSelect from '../../components/ui/BaseSelect.vue';
import BaseTextarea from '../../components/ui/BaseTextarea.vue';
import GradientBackground from '../../components/ui/GradientBackground.vue';
import router from '../../router';
import {
  createLegend,
  getCategories,
  getLegendById,
  updateLegend
} from '../../services/legendsService';
import {
  getCantonsByProvince,
  getDistrictsByCanton,
  getProvinces
} from '../../services/locationsService';
import { Category } from '../../types/category';
import { CreateLegend } from '../../types/legends';
import { Canton, District, Province } from '../../types/location';

const loading = ref(false);
const imagePreview = ref<string | null>(null);
const isInitialLoad = ref(true);

const $toast = useToast();
const route = useRoute();
const legendId = route.params.id as string | undefined;
const isEditing = ref(!!legendId);

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
    .nullable()
    .test('required', 'Image is required', function (file) {
      return isEditing.value || file instanceof File;
    })
    .test('fileSize', 'File too large. Max 5MB', (file) =>
      file instanceof File ? file.size <= 5 * 1024 * 1024 : true
    )
    .test('fileType', 'Unsupported file type', (file) =>
      file instanceof File ? ['image/jpeg', 'image/png', 'image/gif'].includes(file.type) : true
    )
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: category, errorMessage: categoryError } = useField<string>('category');
const { value: province, errorMessage: provinceError } = useField<string>('province');
const { value: canton, errorMessage: cantonError } = useField<string>('canton');
const { value: district, errorMessage: districtError } = useField<string>('district');
const { value: date, errorMessage: dateError } = useField<string>('date');
const { value: description, errorMessage: descriptionError } = useField<string>('description');
const { value: image, errorMessage: imageError } = useField<File | null>('image');

const provicesList = ref<Province[]>([]);
const cantonList = ref<Canton[]>([]);
const districtList = ref<District[]>([]);
const categories = ref<Category[]>([]);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const body: CreateLegend = {
    name: values.name,
    category_id: values.category,
    province_id: values.province,
    canton_id: values.canton,
    district_id: values.district,
    legend_date: values.date,
    description: values.description,
    image: values.image instanceof File ? values.image : null,
  };

  const response = isEditing.value
    ? await updateLegend(legendId!, body)
    : await createLegend(body);

  if (response.success) {
    $toast.success(isEditing.value ? 'Legend updated successfully' : 'Legend created successfully');
    router.push('/legends');
  } else {
    $toast.error(isEditing.value ? 'Error updating legend' : 'Error creating legend');
  }

  loading.value = false;
});

const loadProvinces = async () => {
  provicesList.value = await getProvinces();
};

const loadCategories = async () => {
  categories.value = await getCategories();
};

const loadLegendData = async () => {
  if (!legendId) return;

  const data = await getLegendById(legendId);
  if (!data) return;

  name.value = data.name;
  category.value = data.category.id;
  province.value = data.province.id;

  cantonList.value = await getCantonsByProvince(data.province.id);
  canton.value = data.canton.id;

  districtList.value = await getDistrictsByCanton(data.canton.id);
  district.value = data.district.id;

  date.value = data.legend_date;
  description.value = data.description;

  image.value = null;
  imagePreview.value = data.image_url;
};

onMounted(async () => {
  await loadProvinces();
  await loadCategories();
  if (isEditing.value) {
    await loadLegendData();
  }
  isInitialLoad.value = false; 
});

watch(province, async (provinceId) => {
  if (isInitialLoad.value) return; 
  if (provinceId) {
    cantonList.value = await getCantonsByProvince(provinceId);
    canton.value = '';
    district.value = '';
  }
});

watch(canton, async (cantonId) => {
  if (isInitialLoad.value) return;
  if (cantonId) {
    districtList.value = await getDistrictsByCanton(cantonId);
    district.value = '';
  }
});
</script>

<template>
  <GradientBackground>
    <div class="relative min-h-screen flex overflow-auto">
      <div class="w-full md:w-7/12 flex items-center justify-center px-8 py-12">
        <div class="w-full max-w-lg space-y-8 relative z-10">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-6xl font-bold text-white mb-4">
              {{ isEditing ? 'Edit Legend' : 'Create a Legend' }}
            </h1>
            <p class="text-xl text-gray-300 mb-8">
              Add the traditional legend that you know!
            </p>
          </div>
          <form
            @submit.prevent="onSubmit"
            class="space-y-6"
          >
            <BaseInput
              v-model="name"
              name="name"
              label="Name"
              required
              :error="nameError"
            />
            <BaseSelect
              v-model="category"
              name="category"
              label="Category"
              placeholder="Select a category..."
              :options="categories.map(c => ({ value: c.id, label: c.name }))"
              required
              :error="categoryError"
            />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BaseSelect
                v-model="province"
                name="province"
                label="Province"
                :options="provicesList.map(p => ({ value: p.id, label: p.name }))"
                required
                :error="provinceError"
              />
              <BaseSelect
                v-model="canton"
                name="canton"
                label="Canton"
                :disabled="!province"
                :options="cantonList.map(c => ({ value: c.id, label: c.name }))"
                required
                :error="cantonError"
              />
              <BaseSelect
                v-model="district"
                name="district"
                label="District"
                :disabled="!canton"
                :options="districtList.map(d => ({ value: d.id, label: d.name }))"
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
              required
              :error="descriptionError"
            />
            <div class="space-y-2">
              <BaseFileInput
                v-model="image"
                name="image"
                label="Image"
                placeholder="Upload an image of the legend"
                :error="imageError"
                :required="!isEditing"
              />
              <div>
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  class="mt-2 rounded w-20 h-auto"
                >
              </div>
              
              <p class="text-gray-400 text-xs">
                Formats: JPG, PNG, GIF. Max 5MB
              </p>
            </div>
            <div class="flex space-x-4 pt-6">
              <BaseButton
                :loading="loading"
                type="submit"
                class="w-full"
              >
                {{ isEditing ? 'Save Changes' : 'Create Legend' }}
              </BaseButton>
            </div>
          </form>
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
