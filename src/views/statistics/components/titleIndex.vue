<template>
  <div class="title-index">
    <div class="time-range">
      <span><strong>时间范围</strong></span>
    </div>
    <div class="month">
      <ul class="tabs">
        <li
          class="li-tab"
          v-for="(item, index) in tabsParam"
          @click="toggleTabs(index, item)"
          :class="{ active: index === nowIndex }"
          :key="index"
        >
          <span v-if="index == inputIndex">
            近
            <input
              type="number"
              v-model="tabsParam[index]"
              @keyup.enter="toggleTabs(index, item)"
            />日
          </span>
          <span v-else>{{ item }}</span>
        </li>
      </ul>
    </div>
    <el-date-picker
      value-format="yyyy-MM-dd"
      unlink-panels="false"
      v-model="dateRange"
      type="daterange"
      range-separator="到"
      start-placeholder="Start date"
      end-placeholder="End date"
      size="small"
      @change="toggleTabs(-1, dateRange)"
    />
    <!-- <div class="get-time">
      <p>
        已选时间：{{ tateData[0] }} 至
        {{ tateData[tateData.length - 1] }}
      </p>
    </div> -->
    <el-button
      icon="iconfont icon-download"
      class="right-el-button"
      @click="handleExport"
      >数据导出</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { exportInfor } from '@/api/index'
@Component({
  name: 'TitleIndex',
})
export default class extends Vue {
  @Prop() private iniIndex!: any
  @Prop() private inputIndex!: any
  @Prop() private tateData!: any
  @Prop() private turnoverData!: any
  @Prop() private tabsParam!: any
  @Prop() private dateRange!: any
  nowIndex = this.iniIndex //初始的按钮位置
  value = []
  @Watch('flag')
  getNowIndex(val) {
    this.nowIndex = val
  }
  // tab切换
  toggleTabs(index: number, item: any) {
    this.nowIndex = index
    this.value = []
    this.$emit('sendTitleInd', index, item)
  }
  //  数据导出
  /** 导出按钮操作 */
  handleExport() {
    let begin = this.tateData[0]
    let end = this.tateData[1]
    this.$confirm('是否确认导出' + begin + '到' + end + '运营数据?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async function () {
        const { data } = await exportInfor({ begin: begin, end: end })
        let url = window.URL.createObjectURL(data)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '运营数据统计报表_'+begin+'_'+end+'.xlsx'
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .then((response) => {})
  }
}
</script>
