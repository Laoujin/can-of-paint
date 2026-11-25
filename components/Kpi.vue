<script setup lang="ts">
import { onBeforeUnmount, reactive, watch } from 'vue'
import type { Kpi } from '../utils/scenes'

const props = defineProps<{ value: Kpi }>()

const KEYS: [keyof Kpi, string][] = [['files', 'Files'], ['layers', 'Layers'], ['ifaces', 'Interfaces'], ['loc', 'Lines of code']]
const shown = reactive<Kpi>({ files: 0, layers: 0, ifaces: 0, loc: 0 })
let raf = 0

watch(() => ({ ...props.value }), (target) => {
  const from = { ...shown }
  const start = performance.now()
  cancelAnimationFrame(raf)
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / 900)
    const e = 1 - (1 - p) ** 3
    for (const [k] of KEYS) shown[k] = from[k] + (target[k] - from[k]) * e
    if (p < 1) raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
}, { immediate: true })

onBeforeUnmount(() => cancelAnimationFrame(raf))

const fmt = (k: keyof Kpi, v: number) => (k === 'loc' && v > 9 ? '≈' : '') + Math.round(v).toLocaleString('en')
const delta = (k: keyof Kpi) => props.value[k] > 1 ? `▲ ${Math.round((props.value[k] - 1) * 100).toLocaleString('en')}%` : ''
</script>

<template>
  <div class="kpi">
    <div v-for="[k, l] in KEYS" :key="k" class="kt">
      <b>{{ fmt(k, shown[k]) }}</b><span>{{ l }}</span><em>{{ delta(k) }}</em>
    </div>
  </div>
</template>
