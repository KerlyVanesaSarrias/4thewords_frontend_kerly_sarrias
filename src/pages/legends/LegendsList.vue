<script setup lang="ts">
import { BookOpen, Loader2, Plus, Search } from "lucide-vue-next";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import LegendCard from "../../components/LegendCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseDateInput from "../../components/ui/BaseDateInput.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseSelect from "../../components/ui/BaseSelect.vue";
import GradientBackground from "../../components/ui/GradientBackground.vue";
import { deleteLegend } from "../../services/legendsService";
import { useLegendStore } from "../../stores/legends";


const router = useRouter();
const $toast = useToast();

const filters = ref({
  search: "",
  category: "",
  province: "",
  district: "",
  canton: "",
  startDate: "",
  endDate: "",
});
const legendsStore = useLegendStore();



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

onMounted(() => {
  legendsStore.getLegends();
  legendsStore.getCategories();
});
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
              <div class="flex gap-4">
                <div class="relative">
                  <Search
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10"
                  />
                  <BaseInput
                    label="Search"
                    v-model="filters.search"
                    type="text"
                    placeholder="Buscar leyendas por nombre..."
                    class="w-full"
                  />
                </div>
                <div class="flex gap-3">
                  <BaseSelect
                    label="Categories"
                    v-model="filters.category"
                    name="categories"
                    placeholder="Select a category..."
                  />
                  <BaseSelect
                    label="Provinces"
                    name="provinces"
                    placeholder="Select a province..."
                    v-model="filters.province"
                  />
                  <BaseSelect
                    label="Districts"
                    name="Districts"
                    placeholder="Select a District..."
                    v-model="filters.district"
                  />
                  <BaseSelect
                    label="Cantons"
                    name="Cantons"
                    placeholder="Select a canton..."
                    v-model="filters.canton"
                  />
                  <BaseDateInput
                    label="From Date"
                    v-model="filters.startDate"
                    name="fechaDesde"
                    placeholder="From date..."
                  />
                  <BaseDateInput
                    label="To Date"
                    v-model="filters.endDate"
                    name="fechaHasta"
                    placeholder="To date..."
                  />
                </div>
              </div>

              <div
                v-if="legendsStore.loading"
                class="text-center py-12"
              >
                <Loader2 class="inline-block animate-spin h-8 w-8 text-blue-600" />
                <p class="mt-2 text-white">
                  Cargando leyendas...
                </p>
              </div>

              <div
                v-else-if="legendsStore.legends.length === 0"
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
                  v-for="legend in legendsStore.legends"
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
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </GradientBackground>
</template>
