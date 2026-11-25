<script setup lang="ts">
import { computed } from 'vue'
import { highlight } from '../utils/highlight'

const props = withDefaults(defineProps<{ code: string, hl?: number[] }>(), { hl: () => [] })
const lines = computed(() => highlight(props.code))
</script>

<template>
  <pre class="code"><div
    v-for="(l, i) in lines" :key="i" class="ln"
    :class="{ on: hl.includes(i + 1), dim: hl.length && !hl.includes(i + 1) }"
    v-html="l"
  /></pre>
</template>
