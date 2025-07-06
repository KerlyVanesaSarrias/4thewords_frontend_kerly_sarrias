<script setup lang="ts">
import { computed } from "vue";

type Props = {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
   iconOnly?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  fullWidth: false,
  iconOnly: false,
});

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();


const buttonClasses = computed(() => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

if (props.iconOnly) {
  return `inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-0 focus:ring-offset-0`;
}
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-secondary text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthClass = props.fullWidth ? "w-full" : "";

  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${widthClass}`;

});
</script>



<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

