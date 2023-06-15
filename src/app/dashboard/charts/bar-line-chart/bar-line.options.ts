export const ColorSet = [
    {
        set1: '#50e3c2',
        set2: '#1435db',
        variance: '#ff0008',
    },
    {
        set1: '#1435db',
        set2: '#34eb6b',
        variance: '#ff0008',
    },
    {
        set1: '#fac858',
        set2: '#50e3c2',
        variance: '#ff0008',
    },
    // {
    //     set1: '#00b6ec',
    //     set2: '#ffb853',
    //     variance: '#ff0008',
    // }
    {
        set1: '#fac858',
        set2: '#50e3c2',
        variance: '#ff0008',
    },
    // {
    //     set1: '#5ee6da',
    //     set2: '#fa9898',
    //     variance: '#ff0008',
    // }
]

export const BarLineChartOptions = {
    title: {
        text: "Budget vs Forecast",
        left: "center",
        textStyle: {
            fontSize: 18
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Budgeted', 'Forecast', 'Variance'],
        padding: [40, 0, 0, 0]
    },
    grid: {
        right: "3%",
        left: "3%",
        bottom: "8%",
        top: "18%",
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            triggerEvents:true,
            axisPointer: {
                type: 'shadow'
            },
            splitLine: {
                show: false
            },
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                fontWeight: 500,
                color: "#000000"
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Dollar  $',
            axisLabel: {
                formatter: '{value} $'
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#606060"
                }
            },
        },
        {
            type: 'value',
            name: 'Variance %',
            axisLabel: {
                formatter: '{value} %'
            },
            scale: false,
            splitLine: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#EE6666"
                }
            },
        }
    ],
    series: [
        {
            name: 'Budgeted',
            type: 'bar',
            color: '#1435db',
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' $';
                }
            },
            data: []
        },
        {
            name: 'Forecast',
            type: 'bar',
            color: '#0ccc3f',
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' $';
                }
            },
            data: []
        },
        {
            name: 'Variance',
            type: 'line',
            yAxisIndex: 1,
            color: '#EE6666',
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' %';
                }
            },
            data: []
        }
    ]
};