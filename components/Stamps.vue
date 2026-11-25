<script setup lang="ts">
defineProps<{ stamps?: string[], stampIn?: number[], clicks: number }>()
</script>

<template>
  <div
    v-for="(t, k) in stamps ?? []" :key="k" class="stamp" :class="[`st${k}`, { pending: stampIn && clicks < stampIn[k] }]"
    v-html="t"
  />
</template>
