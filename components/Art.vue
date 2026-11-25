<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { ART } from '../utils/art'

const props = withDefaults(defineProps<{ kind: string, step?: number, opts?: Record<string, unknown> }>(), { step: 0 })
const el = ref<HTMLElement>()
const html = computed(() => ART[props.kind](props.opts))

function apply() {
  if (!el.value) return
  const st = props.step
  el.value.querySelectorAll<HTMLElement | SVGElement>('[data-in]').forEach(e => e.classList.toggle('on', st >= +e.dataset.in!))
  el.value.querySelectorAll<HTMLElement | SVGElement>('[data-out]').forEach(e => e.classList.toggle('off', st >= +e.dataset.out!))
  el.value.querySelectorAll<HTMLElement | SVGElement>('[data-only]').forEach(e => e.classList.toggle('on', e.dataset.only!.split(',').map(Number).includes(st)))
}

onMounted(apply)
watch(() => [props.step, html.value], () => nextTick(apply))
</script>

<template>
  <div ref="el" class="art" :class="`art-${kind}`" v-html="html" />
</template>
