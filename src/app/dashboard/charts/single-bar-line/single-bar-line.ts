export const ColorSet = [
    {
        bar: '#8eeff0',
        line: '#0874c2',
    },
    {
        bar: '#f7c6cb',
        line: '#0874c2',
    },
    {
        bar: '#ffbd7d',
        line: '#0874c2',
    },
    {
        bar: '#c8a8ff',
        line: '#0874c2',
    },
    {
        bar: '#acdb88',
        line: '#0874c2',
    },
    {
        bar: '#c8a8ff',
        line: '#0874c2',
    }
]

export const SingleBarLineChartOptions = {
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
        data: ['Variance', 'Change'],
        padding: [40, 0, 0, 0]
    },
    grid: {
        right: "3%",
        left: "3%",
        bottom: "2%",
        top: "18%",
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            },
            splitLine: {
                show: false
            },
            triggerEvents:true,
            axisTick: {
                alignWithLabel: true
            },

            axisLabel: {
                rotate:40,
                fontWeight: 500,
                color: "#000000"
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Variance $',
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
            name: 'Change %',
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
            name: 'Variance',
            type: 'bar',
            color: '#1435db',
            tooltip: {
                valueFormatter: function (value: any) {
                    return value + ' $';
                }
            },
            barWidth: '50%',
            data: []
        },
        {
            name: 'Change',
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