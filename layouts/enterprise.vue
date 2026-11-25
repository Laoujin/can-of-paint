<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import Kpi from '../components/Kpi.vue'
import Stamps from '../components/Stamps.vue'
import Cathedral from '../components/Cathedral.vue'
import { kpiAt } from '../utils/scenes'

const { $frontmatter, $clicks, $page, $nav } = useSlideContext()
const fm = computed(() => $frontmatter as Record<string, any>)

const VERSIONS = ['4.2', '4.2.1', '4.2.1-rc3', '4.2.1-rc3+build.20261120']
const ver = computed(() => VERSIONS[Math.min(fm.value.lvl ?? 0, 3)])
const crumb = computed(() => (fm.value.lvl ?? 0) >= 1 && fm.value.crumb ? ['Home', ...fm.value.crumb] : [])
const kpi = computed(() => {
  if (fm.value.scene) return kpiAt(fm.value.scene, $clicks.value)
  const k = fm.value.kpi
  return Array.isArray(k) ? k[Math.min($clicks.value, k.length - 1)] : k
})
</script>

<template>
  <div class="slide th-ent" :data-step="$clicks">
    <div class="ent-top">
      <svg class="logo" viewBox="0 0 40 40"><rect x="4" y="4" width="14" height="14" rx="2" /><rect x="22" y="4" width="14" height="14" rx="2" opacity=".7" /><rect x="4" y="22" width="14" height="14" rx="2" opacity=".7" /><rect x="22" y="22" width="14" height="14" rx="2" opacity=".45" /></svg>
      <div class="brand"><b>Enterprise Architecture Framework</b><span>v{{ ver }}</span></div>
      <Kpi v-if="kpi" :value="kpi" />
    </div>
    <div class="ent-body">
      <div v-if="crumb.length" class="crumb">
        <template v-for="(c, k) in crumb" :key="k"><i v-if="k">›</i>{{ c }}</template>
      </div>
      <header v-if="fm.heading || fm.kicker">
        <div v-if="fm.kicker" class="kicker">{{ fm.kicker }}</div>
        <h2>{{ fm.heading }}</h2>
      </header>
      <Cathedral v-if="fm.scene" :scene="fm.scene" />
      <slot />
    </div>
    <div class="ent-foot">
      <span>CONFIDENTIAL · Internal use only · Do not distribute</span>
      <span>Doc EAF-HW-001 · Rev {{ ver }}</span>
      <span>Page {{ $page }} of {{ $nav.total }}</span>
    </div>
    <Stamps :stamps="fm.stamps" :stamp-in="fm.stampIn" :clicks="$clicks" />
  </div>
</template>
