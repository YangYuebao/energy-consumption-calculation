<template>
  <n-space vertical>
    <n-input-number v-model:value="value">
      <template #prefix>
        ￥
      </template>
    </n-input-number>
    <n-input-number v-model:value="value">
      <template #suffix>
        %
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" :show-button="false">
      <template #suffix>
        %
      </template>
    </n-input-number>
  </n-space>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { defineComponent } from 'vue';
import type { CascaderOption } from 'naive-ui';
import axios from 'axios';
import { floor, random, round } from 'lodash';
import { type ECOption, useEcharts } from '@/composables';

const value = ref(0)


// toRefs(options)
</script>

<style scoped></style>
