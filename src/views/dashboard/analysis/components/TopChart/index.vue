<template>
  <n-divider title-placement="left">
    预输入参数
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 测试时间 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="t" :show-button="false">
          <template #suffix>
            小时 h
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 压缩机吸气压力 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="pin" :show-button="false">
          <template #suffix>
            MPa
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 压缩热回收利用修正系数 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="eta_R" :show-button="false">
          <template #suffix>

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
        <n-tag size="large" round type="info"> 压缩机排气压力计算类型 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-select v-model:value="pcp_option_id" :options="pcp_options" />
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 压缩机台数 </n-tag>
      </n-gi>
      <n-gi :span="3">
        <n-input-number v-model:value="ncp" :show-button="false"></n-input-number>
      </n-gi>
      <n-gi :span="2">
        <n-button type="info" :on-click="ncpChange">更新计算框架</n-button>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="pcp_option_id === '1'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压机排气压力 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-dynamic-input v-model:value="pcp" :on-create="pcp_onCreate" :min="ncp" :max="ncp" :on-remove="pcp_onRemove">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right: 12px; width: 450px" :show-button="false">
                <template #suffix>
                  MPa
                </template>
              </n-input-number>
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压站供气压力 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="pSupply" :show-button="false">
          <template #suffix>
            MPa
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 管道压降估计 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="pDropPipe" :show-button="false">
          <template #suffix>
            MPa
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 干燥机压降估计 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="pDropDryer" :show-button="false">
          <template #suffix>
            MPa
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压机排气压力 </n-tag>
      </n-gi>
      <n-gi :span="3">
        <n-tag>{{ pSupply + pDropPipe + pDropDryer }}MPa</n-tag>
      </n-gi>
    </n-grid>

    <!---<pre>{{ pcp }}</pre>--->
  </n-space>

  <n-divider title-placement="left">
    压缩机功耗计算
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 压缩机功耗计算类型 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-select v-model:value="Pcp_option_id" :options="Pcp_options" />
      </n-gi>
    </n-grid>
    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '1'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压机运行功率 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-dynamic-input v-model:value="Pcp" :min="ncp" :max="ncp">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right:12px; width: 450px" :show-button="false">
                <template #suffix>
                  运行功率 kW
                </template>
              </n-input-number>
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 流量计算类型 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-select v-model:value="Qcp_option_id" :options="Qcp_options" />
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '2' && Qcp_option_id === '1'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压机运行流量 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-dynamic-input v-model:value="Qcp" :min="ncp" :max="ncp">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right:12px; width: 450px" :show-button="false">
                <template #suffix>
                  吸气状态 m³/min
                </template>
              </n-input-number>
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '2' && Qcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 干燥泄露损失气量比例 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="sigma" :show-button="false">
          <template #suffix>
            默认取0.03
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '2' && Qcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 工频机台数 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="ncp_st" :show-button="false" >
          <template #suffix>
            下列额定参数先输入工频机
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10" v-if="Pcp_option_id === '2'">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 空压机额定参数 </n-tag>
      </n-gi>
      <n-gi :span="7">
        <n-dynamic-input v-model:value="Pcp_2" :min="ncp" :max="ncp">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right:12px; width: 200px" placeholder="功率"
                :show-button="false">
                <template #suffix>
                  kw
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[1]" style="margin-right:12px; width: 200px" placeholder="流量"
                :show-button="false">
                <template #suffix>
                  m³/min
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[2]" style="margin-right:12px; width: 200px" placeholder="吸气压力"
                :show-button="false">
                <template #suffix>
                  MPa
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[3]" style="margin-right:12px; width: 200px" placeholder="排气压力"
                :show-button="false" >
                <template #suffix>
                  MPa
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[4]" style="margin-right:12px; width: 200px" placeholder="服务系数"
                :show-button="false" />
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>

  </n-space>

  <n-divider title-placement="left">
    空压站其余设备功耗
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 干燥机平均功率 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="Pdryer" :show-button="false">
          <template #suffix>
            kW
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 冷却系统平均功率 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="Pcooler" :show-button="false">
          <template #suffix>
            kW
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>

    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 其它设备平均功率 </n-tag>
      </n-gi>
      <n-gi :span="6">
        <n-input-number v-model:value="Pother" :show-button="false">
          <template #suffix>
            kW
          </template>
        </n-input-number>
      </n-gi>
    </n-grid>
  </n-space>

  <n-divider title-placement="left">
    空压站供气有效能计算
  </n-divider>
  <n-space vertical>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-tag size="large" round type="info"> 各供气路参数 </n-tag>
      </n-gi>
      <n-gi :span="7">
        <n-dynamic-input v-model:value="supply" :min="1" :max="10" :on-create="supply_onCreate">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-input-number v-model:value="value[0]" style="margin-right:12px; width: 200px" placeholder="压力"
                :show-button="false" >
                <template #suffix>
                  MPa
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[1]" style="margin-right:12px; width: 200px" placeholder="流量"
                :show-button="false" >
                <template #suffix>
                  m³/min
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[2]" style="margin-right:12px; width: 200px" placeholder="含油量"
                :show-button="false" >
                <template #suffix>
                  mg/m³
                </template>
              </n-input-number>
              <n-input-number v-model:value="value[3]" style="margin-right:12px; width: 200px" placeholder="露点"
                :show-button="false" >
                <template #suffix>
                  ℃
                </template>
              </n-input-number>
            </div>
          </template>
        </n-dynamic-input>
      </n-gi>
    </n-grid>
    <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-button type="info" :on-click="eta_calculate">点击计算</n-button>
      </n-gi>
      <n-gi :span="3">
        <n-tag>输功效率：{{ Math.round(eta_total * 10000) / 100 }}%</n-tag>
      </n-gi>
      <n-gi :span="3">
        <n-tag>能效等级：{{ level }}级</n-tag>
      </n-gi>
    </n-grid>
    <!-- <n-grid x-gap="5" :cols="10">
      <n-gi :span="2">
        <n-button type="info" :on-click="showthis">点击计算</n-button>
      </n-gi>
    </n-grid> -->
  </n-space>
  <!-- <pre>{{ E_supply }}</pre>
  <pre>{{ totalPcp }}</pre> -->
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue';

const t = ref(0)                  //测试时间
const pin = ref(0.1)                //压缩机吸气压力
const eta_R = ref(0)              //压缩机热回收修正系数
const pcp_option_id = ref(null);  //压缩机压力计算类型id
const pcp_options = [             //压缩机压力计算类型的选择
  {
    label: "已知压缩机排气压力",
    value: '1',
  },
  {
    label: '已知空压站的排气压力，估计管道压降和干燥机压降',
    value: '2'
  }
]
const pcp = ref([[0]])            //每台压缩机的排气压力

const ncp = ref(1)                //压缩机数量

const pSupply = ref(0)            //供气压力
const pDropPipe = ref(0)           //空压站内管道压降
const pDropDryer = ref(0)          //干燥机压降

const Pcp_option_id = ref(null);  //压缩机功耗计算类型id
const Pcp_options = [             //压缩机功耗计算类型选择
  {
    label: "已知压缩机运行功率",
    value: '1',
  },
  {
    label: '平均功率未知，但知道额定功率，额定流量和实际流量',
    value: '2'
  }
]

const Pcp = ref([[0]])            //每台压缩机的功率
const totalPcp = ref(0)

const Pcp_2 = ref([[null, null, null, null,null]])      //每台压缩机的排气压力

const Qcp_option_id = ref(null);  //压缩机流量计算类型id
const Qcp_options = [             //压缩机流量计算类型选择
  {
    label: "已知各机流量",
    value: '1',
  },
  {
    label: '已知总流量,工频机(额定)流量.变频机（波动负载）流量可算',
    value: '2'
  }
]
const Qcp = ref([[0]])            //压缩机流量

const Q_supply_total = ref(0)     //空压站供气总流量
const sigma = ref(0.03)           //干燥泄露损失比例
const Qcp_supply_total = ref(0)   //空压机吸气总流量
const Qst_rated = ref(0)          //工频机额定流量
const Qva = ref(0)                //变频机平均流量
const ncp_st = ref(0)             //工频机台数
const ncp_va = ref(0)             //变频机台数
const Pdryer = ref(0)             //干燥机功率
const Pcooler = ref(0)            //循环冷却系统功率
const Pother = ref(0)             //其它设备功率
const supply = ref([[null, null, null, null]])  //各气路供气参数
const level = ref(0)              //能效等级
const eta_total = ref(0)          //输功效率
const E_supply = ref(0)           //测试时间内的有效能
var n = new Array()               //露点修正系数
var m = new Array()               //含油修正系数
var oilled = false                //是否含油

function pcp_onCreate() {
  ncp.value = pcp.value.length + 1
  reBuildcp(Pcp, 1, 0)
  console.log(ncp.value)
  return [0]
}

function pcp_onRemove() {
  ncp.value = pcp.value.length
  reBuildcp(Pcp, 1, 0)
  return 1
}

function ncpChange() {
  console.log("ncpChange!")
  reBuildcp(pcp, 1, 0)
  reBuildcp(Pcp, 1, 0)
  reBuildcp(Pcp_2, 5, null)
  reBuildcp(Qcp, 1, 0)
  return 1
}

function reBuildcp(x, len, element) {
  x.value = new Array()
  for (var i = 0; i < ncp.value; i++) {
    x.value.push([element])
    for (var j = 1; j < len; j++) {
      x.value[i].push(element)
    }
  }
}

function getPcp() {
  totalPcp.value = 0
  for (var i = 0; i < ncp.value; i++) {
    totalPcp.value += Pcp.value[i][0]
  }
  return totalPcp.value
}

function supply_onCreate() {
  return [null, null, null, null]
}

function cp_pout_cal() {
  if (pcp_option_id.value == 2) {
    pcp.value = new Array(ncp.value).fill([pSupply.value + pDropDryer.value + pDropPipe.value])
  }
  return 1
}

function cp_Q_cal() {
  Q_supply_total.value = 0
  for (var i = 0; i < supply.value.length; i++) {
    Q_supply_total.value += supply.value[i][1]
  }
  if (Qcp_option_id.value == 2) {
    Qst_rated.value=0
    for (var i=0;i<ncp_st.value;i++){
      Qst_rated.value+=Pcp_2.value[i][1]
    }
    ncp_va.value = ncp.value - ncp_st.value
    Qcp_supply_total.value = Q_supply_total.value / (1 - sigma.value)
    Qva.value = (Qcp_supply_total.value - Qst_rated.value) / ncp_va.value
    for (var i = 0; i < ncp_st.value; i++) {
      Qcp.value[i][0] = Pcp_2.value[i][1]
    }
    for (var i = ncp_st.value; i < ncp.value; i++) {
      Qcp.value[i][0] = Qva.value
    }
  }
  return 1
}

function cp_power_cal() {
  if (Pcp_option_id.value == 2) {
    cp_Q_cal()
    for (var i = 0; i < ncp.value; i++) {
      Pcp.value[i] = [Pcp_2.value[i][0] * Pcp_2.value[i][4] * Qcp.value[i][0] / Pcp_2.value[i][1] * pin.value * Math.log(pcp.value[i][0] / pin.value) / Pcp_2.value[i][2] / Math.log(Pcp_2.value[i][3] / Pcp_2.value[i][2])]
    }
  }
  return 1
}

function getCoff_mn() {
  n = new Array()
  m = new Array()
  for (var i = 0; i < supply.value.length; i++) {
    if (supply.value[i][3] >= 3) {
      n.push(1.0)
    } else if (supply.value[i][3] < 3 && supply.value[i][3] >= -20) {
      n.push(1.05)
    } else if (supply.value[i][3] < -20 && supply.value[i][3] >= -40) {
      n.push(1.10)
    } else if (supply.value[i][3] < -40 && supply.value[i][3] >= -70) {
      n.push(1.15)
    } else {
      n.push(1.25)
    }
    if (supply.value[i][2] >= 0.01) {
      oilled = true
      m.push(1.0)
    } else {
      m.push(1.05)
    }
  }
}

function supply_E_cal() {
  if (supply.value.length == 1) {
    E_supply.value = 16.76 * pin.value * Q_supply_total.value * Math.log(supply.value[0][0] / pin.value)
    eta_total.value = (1 + 0.2 * eta_R.value) * E_supply.value / (totalPcp.value + Pdryer.value + Pother.value + Pcooler.value)
  } else {
    E_supply.value = 0
    eta_total.value = 0
    for (var i = 0; i < supply.value.length; i++) {
      var temp = 16.76 * pin.value * supply.value[i][1] * Math.log(supply.value[i][0] / pin.value) * m[i] * n[i]
      E_supply.value += temp
      eta_total.value += temp / (totalPcp.value + Pdryer.value + Pother.value + Pcooler.value)
    }
  }

}

function getLevel(Q, td, oil) {
  var temp_level = 4
  if (td >= 3) {
    var temp = t1[getColumn(Q, oil)]
    console.log(eta_total.value * 100, temp)
    while (eta_total.value * 100 >= temp[temp_level] && temp_level >= 0) {
      console.log("hello", temp_level)
      temp_level--
    }
  } else if (td < 3 && td >= -20) {
    var temp = t2[getColumn(Q, oil)]
    while (eta_total.value * 100 >= temp[temp_level] && temp_level >= 0) {
      temp_level--
    }
  } else if (td < -20 && td >= -40) {
    var temp = t3[getColumn(Q, oil)]
    while (eta_total.value * 100 >= temp[temp_level] && temp_level >= 0) {
      temp_level--
    }
  } else if (td < -40 && td >= -70) {
    var temp = t4[getColumn(Q, oil)]
    while (eta_total.value * 100 >= temp[temp_level] && temp_level >= 0) {
      temp_level--
    }
  } else {
    var temp = t5[getColumn(Q, oil) % 2]
    while (eta_total.value * 100 >= temp[temp_level - 1] && temp_level >= 0) {
      temp_level--
    }
  }
  level.value = (temp_level == 4) ? "不足5" : temp_level + 2
  return temp_level + 1
}

function getColumn(Q, oil) {
  var n = 0
  if (Q < 4) {
    alert("供气流量小于4m³/min")
    return -1
  }
  while (Q >= Qz_gap[n + 1]) {
    n += 1
  }
  if (oil) {
    return 2 * n
  } else {
    return 2 * n + 1
  }
}

function eta_calculate() {
  cp_pout_cal()
  cp_Q_cal()
  cp_power_cal()
  getPcp()
  getCoff_mn()
  supply_E_cal()
  if (supply.value.length >= 2) {
    return getLevel(Q_supply_total.value, 5, true)
  } else {
    getLevel(Q_supply_total.value, supply.value[0][3], oilled)
  }
  return 1
}

const t1 = [[55.0, 50.0, 45.5, 41.5, 38.0], [51.5, 47.0, 43.0, 39.0, 35.5], [58.0, 53.0, 48.0, 44.0, 40.0], [54.5, 50.0, 45.0, 41.5, 37.5], [61.0, 55.5, 50.5, 46.0, 42.0], [57.5, 52.5, 47.5, 43.5, 39.5], [64.0, 58.0, 53.0, 48.5, 44.0], [60.0, 55.0, 50.0, 45.5, 41.5]]
const t2 = [[52.5, 47.5, 43.5, 39.5, 36.5], [49.0, 45.0, 41.0, 37.0, 34.0], [55.0, 50.5, 45.5, 42.0, 38.0], [52.0, 47.5, 43.0, 39.5, 36.0], [58.0, 53.0, 48.0, 44.0, 40.0], [55.0, 50.0, 45.0, 41.5, 37.5], [61.0, 55.0, 50.5, 46.0, 42.0], [57.0, 52.5, 47.5, 43.5, 39.5]]
const t3 = [[50.0, 45.5, 41.5, 37.5, 34.5], [47.0, 42.5, 39.0, 35.5, 32.5], [52.5, 48.0, 43.5, 40.0, 36.5], [49.5, 45.5, 41.0, 37.5, 34.0], [55.5, 50.5, 46.0, 42.0, 38.0], [52.5, 47.5, 43.0, 39.5, 36.0], [58.0, 52.5, 48.0, 44.0, 40.0], [54.5, 50.0, 45.5, 41.5, 37.5]]
const t4 = [[48.0, 43.5, 39.5, 36.0, 33.0], [45.0, 41.0, 37.5, 34.0, 31.0], [50.5, 46.0, 41.5, 38.5, 35.0], [47.5, 43.5, 39.0, 36.0, 32.5], [53.0, 48.5, 44.0, 40.0, 36.5], [50.0, 45.5, 41.5, 38.0, 34.5], [55.5, 50.5, 46.0, 42.0, 38.5], [52.0, 48.0, 43.5, 39.5, 36.0]]
const t5 = [[44.0, 40.0, 36.5, 33.0, 30.5], [46.5, 42.5, 38.5, 35.0, 32.0], [49.0, 44.5, 40.5, 37.0, 33.5], [51.0, 46.5, 42.5, 39.0, 35.0]]
const Qz_gap = [4, 20, 80, 300]

// toRefs(options)
</script>

<style scoped></style>
