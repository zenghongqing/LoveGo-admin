<template>
    <div class="dashboard-container">
        <div ref="mainRef" id="main"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Echarts from 'echarts'
export default {
    name: 'dashboard',
    data () {
        return {
            staticsData: {}
        }
    },
    computed: {
        ...mapGetters([
            'userData'
        ])
    },
    mounted () {
        this.initData()
    },
    methods: {
        initEcharts () {
            let myEchart = Echarts.init(this.$refs.mainRef)
            // 绘制图表
            myEchart.setOption({
                title: {
                    text: '月流量统计',
                    subtext: `访问总数: ${this.staticsData.VisitsDailyTotalCount}  接口调用总数: ${this.staticsData.ApiDailyTotalCount || 0}`
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['新增用户', '新增管理员', '新增店铺', '新增订单', '用户访问量', '接口调用次数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.staticsData.MonthTotalData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '新增用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.UserDailyData
                },
                {
                    name: '新增管理员',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.AdminDailyData
                },
                {
                    name: '新增店铺',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.ShopDailyData
                },
                {
                    name: '新增订单',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.OrderDailyData
                },
                {
                    name: '用户访问量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.VisitsDailyData || 0
                },
                {
                    name: '接口调用次数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: this.staticsData.ApiDailyData || 0
                }]
            })
        },
        async initData () {
            let res = await this.$store.dispatch('GetStatisData')
            console.log(res.data)
            this.staticsData = res.data
            this.staticsData.VisitsDailyTotalCount = 0
            this.staticsData.ApiDailyTotalCount = 0
            this.staticsData.VisitsDailyData.map(item => {
                this.staticsData.VisitsDailyTotalCount += item
            })
            this.staticsData.ApiDailyData.map(item => {
                this.staticsData.ApiDailyTotalCount += item
            })
            this.initEcharts()
        }
    }
}
</script>

<style lang="scss" scoped>
#main {
    width: 100%;
    height: 550px;
}
.dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
