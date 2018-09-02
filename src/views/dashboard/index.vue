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
    mounted () {
        this.initData()
    },
    methods: {
        initData () {
            let myEchart = Echarts.init(this.$refs.mainRef)
            // 绘制图表
            myEchart.setOption({
                title: {
                    text: '月流量统计',
                    subtext: '访问总数: 0  接口调用总数: 0'
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
                    data: ['新增用户', '新增管理员', '新增店铺', '新增订单', '用户访问量','接口调用次数']
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
                    data: 500
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '新增用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: '1111'
                },
                {
                    name: '新增管理员',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: 'eefe'
                },
                {
                    name: '新增店铺',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: ''
                },
                {
                    name: '新增订单',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: ''
                },
                {
                    name: '用户访问量',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: ''
                },
                {
                    name: '接口调用次数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: ''
                }]
            })
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