<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { SCENES, lastDefined, states } from '../utils/scenes'
import CodeLines from './CodeLines.vue'

const props = defineProps<{ scene: string }>()
const { $clicks } = useSlideContext()

const sc = computed(() => SCENES[props.scene])
const all = computed(() => states(props.scene))
const i = computed(() => Math.max(0, Math.min(all.value.length - 1, $clicks.value)))
const step = computed(() => sc.value.steps[i.value])
const items = computed(() => Object.values(all.value[i.value].items))
const regions = computed(() => items.value.filter(it => it.kind === 'region'))
const objs = computed(() => items.value.filter(it => it.kind !== 'region'))
const code = computed(() => {
  const { v, at } = lastDefined(props.scene, i.value, 'code')
  return { code: v ?? '', hl: at === i.value ? step.value.hl ?? [] : [] }
})
</script>

<template>
  <div class="viz-body">
    <div class="stage-wrap">
      <svg class="stage" viewBox="0 0 1000 640">
        <TransitionGroup tag="g" name="item">
          <g
            v-for="it in regions" :key="it.id" class="item k-region" :class="it.cls"
            :style="{ transform: `translate(${it.x}px, ${it.y}px)` }"
          >
            <rect class="box" rx="14" :style="{ width: `${it.w}px`, height: `${it.h}px` }" />
            <text class="lbl" x="12" y="24">{{ it.label }}</text>
          </g>
        </TransitionGroup>
        <TransitionGroup tag="g" name="item">
          <g
            v-for="it in objs" :key="it.id" class="item k-obj" :class="it.cls"
            :style="{ transform: `translate(${it.x}px, ${it.y}px)` }"
          >
            <rect class="box" rx="9" :style="{ width: `${it.w}px`, height: `${it.h}px` }" />
            <text class="lbl" :x="it.w / 2" :y="it.h / 2 + (it.sub ? -7 : 0)" text-anchor="middle" dominant-baseline="central">{{ it.label }}</text>
            <text class="sub" :x="it.w / 2" :y="it.h / 2 + 13" text-anchor="middle" dominant-baseline="central">{{ it.sub }}</text>
          </g>
        </TransitionGroup>
      </svg>
    </div>
    <aside>
      <div class="stepbar">
        <i v-for="(_, k) in sc.steps" :key="k" :class="{ done: k < i, cur: k === i }" />
      </div>
      <div class="caption" v-html="step.t" />
      <div class="code-h" :class="{ empty: !code.code }">{{ sc.title }}</div>
      <CodeLines v-if="code.code" :code="code.code" :hl="code.hl" />
      <div class="legend">
        <span v-for="[c, t] in sc.legend" :key="c"><i class="sw" :class="c" />{{ t }}</span>
      </div>
    </aside>
  </div>
</template>
