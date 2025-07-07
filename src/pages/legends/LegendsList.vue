<script setup lang="ts">
import { BookOpen, Loader2, Plus, Search } from "lucide-vue-next";
import Swal from "sweetalert2";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import LegendCard from "../../components/LegendCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseDateInput from "../../components/ui/BaseDateInput.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseSelect from "../../components/ui/BaseSelect.vue";
import GradientBackground from "../../components/ui/GradientBackground.vue";
import { deleteLegend, getCategories, getLegends } from "../../services/legendsService";
import { getCantonsByProvince, getDistrictsByCanton, getProvinces } from "../../services/locationsService";
import { useLegendStore } from "../../stores/legends";
import { Category } from "../../types/category";
import { Legend } from "../../types/legends";
import { Canton, District, Province } from "../../types/location";


const router = useRouter();
const $toast = useToast();

const loading = ref(false)
const legends = ref<Legend[]>([])
const filters = ref({
  search: "",
  category: "",
  province: "",
  district: "",
  canton: "",
  date: ""
});
const categories = ref<Category[]>([])
const provinces = ref<Province[]>([])
const cantons = ref<Canton[]>([])
const districts = ref<District[]>([])
const legendsStore = useLegendStore();


const loadLegends = async () => {
  loading.value = true;
  try {
    const cleanFilters: Record<string, string> = {};

    if (filters.value.search.trim()) cleanFilters.search = filters.value.search;
    if (filters.value.category) cleanFilters.category = filters.value.category;
    if (filters.value.province) cleanFilters.province = filters.value.province;
    if (filters.value.canton) cleanFilters.canton = filters.value.canton;
    if (filters.value.district) cleanFilters.district = filters.value.district;
    if (filters.value.date) {
      const iso = new Date(filters.value.date).toISOString().split("T")[0];
      cleanFilters.date = iso;
    }

    legends.value = await getLegends(cleanFilters);
  } catch (error) {
    console.error("Error loading legends:", error);
    legends.value = [];
  }
  loading.value = false;
};

const loadFiltersData = async () => {
  categories.value = await getCategories()
  provinces.value = await getProvinces()
}
const navigateToCreateLegend = () => {
  router.push("/legends/create");
};

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: '¿Remove this legend?',
    text: 'This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
  })

  if (result.isConfirmed) {
    const res = await deleteLegend(id)
    if (res.success) {
      $toast.success('Legend successfully removed')
      await legendsStore.getLegends()
    } else {
      $toast.error('Error deleting legend')
    }
  }
}


onMounted(async () => {
  await loadFiltersData()
  await loadLegends()
})

watch(filters, loadLegends, { deep: true })

watch(() => filters.value.province, async (provinceId) => {
  if (provinceId) {
    cantons.value = await getCantonsByProvince(provinceId)
    filters.value.canton = ''
    filters.value.district = ''
    districts.value = []
  }
})

watch(() => filters.value.canton, async (cantonId) => {
  if (cantonId) {
    districts.value = await getDistrictsByCanton(cantonId)
    filters.value.district = ''
  }
})

</script>

<template>
  <GradientBackground>
    <div class="min-h-screen">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 mt-2 text-right">
        <BaseButton @click="navigateToCreateLegend">
          <Plus class="w-5 h-5" />
          <span>Nueva Legend</span>
        </BaseButton>
      </div>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-white mb-2">
              legends of Costa Rica
            </h1>
          </div>

          <div class=" rounded-lg shadow-md p-6">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
                <div class="relative w-full min-w-0">
                  <Search class="absolute left-3  top-[70%]  transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <BaseInput
                    label="Search"
                    v-model="filters.search"
                    type="text"
                    placeholder="Buscar leyendas por nombre..."
                    class=" pl-2 w-full"
                  />
                </div>
                <div class="w-full min-w-0">
                  <BaseSelect
                    label="Categories"
                    v-model="filters.category"
                    :options="categories.map(c => ({ value: c.id, label: c.name }))"
                    name="categories"
                    placeholder="Select a category..."
                  />
                </div>
                <div class="w-full min-w-0">
                  <BaseSelect
                    label="Provinces"
                    v-model="filters.province"
                    :options="provinces.map(p => ({ value: p.id, label: p.name }))"
                    name="provinces"
                    placeholder="Select a province..."
                  />
                </div>

                <div class="w-full min-w-0">
                  <BaseSelect
                    label="Cantons"
                    v-model="filters.canton"
                    :options="cantons.map(c => ({ value: c.id, label: c.name }))"
                    name="cantons"
                    placeholder="Select a canton..."
                  />
                </div>

                <div class="w-full min-w-0">
                  <BaseSelect
                    label="Districts"
                    v-model="filters.district"
                    :options="districts.map(d => ({ value: d.id, label: d.name }))"
                    name="districts"
                    placeholder="Select a District..."
                  />
                </div>

                <div class="w-full min-w-0">
                  <BaseDateInput
                    label="From Date"
                    v-model="filters.date"
                    name="legendDate"
                    placeholder="From date..."
                  />
                </div>
              </div>

              <div
                v-if="loading"
                class="text-center py-12"
              >
                <Loader2 class="inline-block animate-spin h-8 w-8 text-blue-600" />
                <p class="mt-2 text-white">
                  Cargando leyendas...
                </p>
              </div>

              <div
                v-else-if="legends.length === 0"
                class="text-center py-12"
              >
                <BookOpen class="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 class="text-lg font-medium text-white mb-2">
                  Legends not found
                </h3>
                <BaseButton
                  v-if="legendsStore.legends.length === 0"
                  @click="navigateToCreateLegend"
                >
                  Create my first legend
                </BaseButton>
              </div>
              <div
                v-else
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <LegendCard
                  v-for="legend in legends"
                  :key="legend.id"
                  :id="legend.id"
                  :name="legend.name"
                  :description="legend.description"
                  :date="legend.legend_date"
                  :image-url="legend.image_url"
                  :category="legend.category.name || 'Uncategorized'"
                  :location="`${legend.district?.name || ''}, ${legend.canton?.name || ''}, ${legend.province?.name 
                    || 'Without province'}`"
                  @delete="handleDelete"
                  @edit="(id) => router.push(`/legends/edit/${id}`)"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </GradientBackground>
</template>
