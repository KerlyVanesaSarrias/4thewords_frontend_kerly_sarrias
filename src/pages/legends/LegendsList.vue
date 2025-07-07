<script setup lang="ts">
import { BookOpen, Loader2, Plus, Search, Trash2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import LegendCard from "../../components/LegendCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseDateInput from "../../components/ui/BaseDateInput.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseSelect from "../../components/ui/BaseSelect.vue";
import GradientBackground from "../../components/ui/GradientBackground.vue";
import { useLegendStore } from "../../stores/legends";
import { Legend } from "../../types/legends";

const router = useRouter();
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

const showDeleteModal = ref(false);
const leyendaAEliminar = ref<Legend | null>(null);
const deletingLegend = ref(false);

const navigateToCreateLegend = () => {
  router.push("/legends/create");
};

const eliminarLeyenda = () => {}

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
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 overflow-y-auto"
      >
        <div class="flex min-h-screen items-center justify-center p-4">
          <div
            class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            @click="showDeleteModal = false"
          />
          <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto">
            <div class="flex items-center justify-between p-6 border-b">
              <h3 class="text-lg font-semibold text-gray-900">
                Confirmar Eliminación
              </h3>
              <button
                @click="showDeleteModal = false"
                class="text-gray-400 hover:text-gray-600"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            <div class="p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="flex-shrink-0">
                  <AlertTriangle class="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 class="text-lg font-medium text-gray-900">
                    ¿Eliminar leyenda?
                  </h3>
                  <p class="text-gray-600">
                    ¿Estás seguro de que deseas eliminar la leyenda "{{
                      leyendaAEliminar?.name
                    }}"?
                  </p>
                </div>
              </div>
              <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                <p class="text-sm text-red-800">
                  <strong>Advertencia:</strong> Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            <div class="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                @click="showDeleteModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="eliminarLeyenda"
                :disabled="deletingLegend"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Trash2
                  v-if="!deletingLegend"
                  class="w-4 h-4"
                />
                <Loader2
                  v-else
                  class="w-4 h-4 animate-spin"
                />
                <span>{{ deletingLegend ? "Eliminando..." : "Eliminar" }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </GradientBackground>
</template>
