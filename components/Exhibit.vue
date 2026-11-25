<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { EXHIBITS } from '../utils/exhibits'
import CodeLines from './CodeLines.vue'

const props = defineProps<{ n: number }>()
const { $clicks } = useSlideContext()
const ex = computed(() => EXHIBITS[props.n])
</script>

<template>
  <div class="gallery">
    <div class="frame"><CodeLines :code="ex.code" /></div>
    <div class="placard">
      <div class="pl-n">Exhibit {{ n }}</div>
      <div class="pl-name">{{ ex.name }}</div>
      <div class="pl-meta">Anonymous, {{ ex.year }}</div>
      <div class="pl-mat">{{ ex.materials }}</div>
      <div class="pl-note reveal" :class="{ on: $clicks >= 1 }"><b>Curator’s note.</b> {{ ex.note }}</div>
    </div>
  </div>
</template>
