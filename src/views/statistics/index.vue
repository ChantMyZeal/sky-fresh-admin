<template>
  <div class="dashboard-container home">
    <!-- 标题 -->
    <TitleIndex @sendTitleInd="getTitleNum" :iniIndex="iniIndex" :inputIndex="inputIndex" :tateData="tateData" :tabsParam="tabsParam" :dateRange="dateRange" />
    <!-- end -->
    <div class="homeMain">
      <!-- 销量排名TOP -->
      <Top :topData="topData" :limit="limit" @changeLimit="changeLimit" />
      <!-- end -->
    </div>
    <div class="homeMain">
      <!-- 订单统计 -->
      <OrderStatistics :orderdata="orderData" :overviewData="overviewData" />
      <!-- end -->
    </div>
    <div class="homeMain">
      <!-- 营业额统计 -->
      <TurnoverStatistics :turnoverdata="turnoverData" />
      <!-- end -->
    </div>
    <div class="homeMain homecon">
      <!-- 用户统计 -->
      <UserStatistics :userdata="userData" />
      <!-- end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  get1stAndToday,
  pastDays,
  past7Day,
  past30Day,
  pastWeek,
  pastMonth,
  rangeDays,
} from '@/utils/formValidate'
import {
  getDataOverView, //数据概览
  getTurnoverStatistics,
  getUserStatistics,
  getOrderStatistics,
  getTop,
} from '@/api/index'
// 组件
// 标题
import TitleIndex from './components/titleIndex.vue'
// 营业额统计
import TurnoverStatistics from './components/turnoverStatistics.vue'
// 用户统计
import UserStatistics from './components/userStatistics.vue'
// 订单统计
import OrderStatistics from './components/orderStatistics.vue'
// 排名
import Top from './components/top10.vue'
@Component({
  name: 'Dashboard',
  components: {
    TitleIndex,
    TurnoverStatistics,
    UserStatistics,
    OrderStatistics,
    Top,
  },
})
export default class extends Vue {
  private overviewData = {} as any
  private tateData = []
  private turnoverData = {} as any
  private userData = {}
  private orderData = {
    data: {},
  } as any
  private topData = {} as any
  private limit = 5
  private days = 7
  private iniIndex = 0//初始按钮位置
  private inputIndex = 0//自定义天数按钮位置
  private tabsParam = [this.days, '昨日', '本周', '本月',]
  // tabsParam = ['昨日', '近7日', '近30日', '本周', '本月', this.days,]
  private dateRange = []

  created() {
    this.getTitleNum(this.iniIndex, this.tabsParam[this.iniIndex]);//初始按钮位置
  }
  // 获取基本数据
  init(begin: any,end:any) {
    this.$nextTick(() => {
      this.getTurnoverStatisticsData(begin,end)
      this.getUserStatisticsData(begin,end)
      this.getOrderStatisticsData(begin,end)
      this.getTopData(begin,end,this.limit)
    })
    this.dateRange = [begin, end]
  }

  // 获取营业额统计数据
  async getTurnoverStatisticsData(begin: any ,end:any) {
    const data = await getTurnoverStatistics({ begin: begin,end:end })
    const turnoverData = data.data.data
    this.turnoverData = {
      dateList: turnoverData.dateList.split(','),
      turnoverList: turnoverData.turnoverList.split(',')
    }
    // this.tateData = this.turnoverData.date
    // const arr = []
    // this.tateData.forEach((val) => {
    //   let date = new Date()
    //   let year = date.getFullYear()
    //   arr.push(year + '-' + val)
    // })
    // this.tateData = arr
  }
  // 获取用户统计数据
  async getUserStatisticsData(begin: any ,end:any) {
    const data = await getUserStatistics({ begin: begin,end:end })
    const userData = data.data.data
    this.userData = {
      dateList: userData.dateList.split(','),
      totalUserList: userData.totalUserList.split(','),
      newUserList: userData.newUserList.split(','),
    }
  }
  // 获取订单统计数据
  async getOrderStatisticsData(begin: any ,end:any) {
    const data = await getOrderStatistics({begin: begin,end:end })
    const orderData = data.data.data
    this.orderData = {
      data: {
        dateList: orderData.dateList.split(','),
        orderCountList: orderData.orderCountList.split(','),
        validOrderCountList: orderData.validOrderCountList.split(','),
        //orderCompletionRateList: orderData.orderCompletionRateList.split(','),
      },
      totalOrderCount: orderData.totalOrderCount,
      validOrderCount: orderData.validOrderCount,
      orderCompletionRate: orderData.orderCompletionRate
    }
  }
  // 获取排行数据
  async getTopData(begin:any, end:any, limit:number) {
    const data = await getTop({begin:begin, end:end, limit:limit })
    const topData = data.data.data
    this.topData = {
      nameList: topData.nameList.length > 0 ? topData.nameList.split(',').reverse() : [],
      numberList: topData.numberList.length > 0 ? topData.numberList.split(',').reverse() : [],
    }
  }
  changeLimit(limit:any){
    let num = parseInt(limit)
    if(num < 1 || isNaN(num)){
      num = null
    }
    this.limit = num
    this.getTopData(this.tateData[0],this.tateData[1],this.limit)
  }
  // 获取当前选中的tab时间
  getTitleNum(index, item) {
    switch (index) {
      // case 0:
      //   this.tateData = get1stAndToday()
      //   break
      // case 1:
      //   this.tateData = past7Day()
      //   break
      // case 2:
      //   this.tateData = past30Day()
      //   break
      // case 3:
      //   this.tateData = pastWeek()
      //   break
      // case 4:
      //   this.tateData = pastMonth()
      //   break
      // case 5:
      //   let num = parseInt(item)
      //     if(num < 1 || isNaN(num)){
      //       num = 1
      //     }
      //     this.tabsParam[index] = num
      //     this.tateData = pastDays(num)
      //     break
      case -1:
        this.dateRange = item
        this.tateData = rangeDays(item)
        break
      case 0:
        let num = parseInt(item)
        if(num < 1 || isNaN(num)){
          num = 1
        }
        this.tabsParam[index] = num
        this.tateData = pastDays(num)
        break
      case 1:
        this.tateData = get1stAndToday()
        break
      case 2:
        this.tateData = pastWeek()
        break
      case 3:
        this.tateData = pastMonth()
        break
    }
    this.init(this.tateData[0],this.tateData[1])
  }
}
</script>

<style lang="scss">
</style>
