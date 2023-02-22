<n-space vertical>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > qqqq </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value">
        <template #prefix>
          xxxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > 空压机xxx </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value2">
        <template #prefix>
          空压机xxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > 空压机xxx </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value">
        <template #prefix>
          空压机xxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > 空压机xxx </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value">
        <template #prefix>
          空压机xxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > 选择xxx </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-select v-model:value="value_option" :options="options" />
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8" v-if="value_option === '1'">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > zzz </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value">
        <template #prefix>
          空压机xxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8" v-if="value_option === '2'">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > aaa </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-input-number v-model:value="value">
        <template #prefix>
          空压机xxx
        </template>
        <template #suffix>
          unitxxx
        </template>
      </n-input-number>
    </n-gi>
  </n-grid>
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-tag size="large" round type="info" > 空压机xxx </n-tag>
    </n-gi>
    <n-gi :span="6">
      <n-dynamic-input v-model:value="customValue" :on-create="onCreate" :min="1" :max="10">
        <template #default="{ value }">
          <div style="display: flex; align-items: center; width: 100%">
            <n-input-number v-model:value="value[0]" style="margin-right: 12px; width: 250px" />
            <n-input-number v-model:value="value[1]" style="margin-right: 12px; width: 250px" />
            <n-input-number v-model:value="value[2]" style="margin-right: 12px; width: 250px" />
          </div>
        </template>
      </n-dynamic-input>
    </n-gi>
  </n-grid>
  <!-- <pre>{{ customValue }}</pre> -->
  <n-grid x-gap="5" :cols="8">
    <n-gi :span="1">
      <n-button type="info" :on-click="hello">点击计算</n-button>
    </n-gi>
    <n-gi :span="6">
      <n-statistic v-model:value="value2" />
    </n-gi>
  </n-grid>
</n-space>

<template>
  <n-divider title-placement="left">
    预输入参数
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info" > 测试时间 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="value">
          <template #suffix>
            小时 h
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info" > 压缩热回收利用修正系数 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="value">
          <template #suffix>
            小时 h
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>
  </n-space>

  <n-divider title-placement="left">
    空压机排气压力计算
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info" > 压缩机排气压力计算类型 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-select v-model:value="value_option" :options="options" />
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="value_option === '1'">
      <n-gi :span="2">
        <n-tag size="large" round type="info" > 空压机排气压力 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-dynamic-input v-model:value="customValue" :on-create="onCreate" :min="1" :max="10">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right: 12px; width: 250px" />
              <n-input-number v-model:value="value[1]" style="margin-right: 12px; width: 250px" />
              <n-input-number v-model:value="value[2]" style="margin-right: 12px; width: 250px" />
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>
  </n-space>
  <n-space vertical>
    <n-grid x-gap="5">

    </n-grid>
    <n-grid x-gap="5">
      
    </n-grid>
  </n-space>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue';

const value = ref(0)
const value2 = ref(0)
const value_option = ref(null);
const options = [
  {
    label: "已知压缩机排气压力",
    value: '1',
  },
  {
    label: '已知空压站的排气压力，估计管道压降和干燥机压降',
    value: '2'
  }
]
const customValue = ref([[null, null, null]])

function onCreate() {
  return [null, null, null]
}

function hello() {
  console.log(customValue.value[0][1])
}

// toRefs(options)
</script>

<style scoped></style>
