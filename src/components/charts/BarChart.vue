<template>
    <div>
        <v-chart class="chart" :option="barChartOpt" />
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    companyTitle: String,
    dataValue: {
        type: Array,
        required: true
    },
    dataYears: {
        type: Array,
        required: true
    }
});

const plainDataValue = computed(() =>
    props.dataValue.map(item => ({
        mineral: item.mineral,
        value: item.value.map(v => v[0])
    }))
);

const barChartOpt = computed(() => {
    if (!props.dataValue || !Array.isArray(props.dataValue) || props.dataValue.length === 0) {
        throw new Error("Invalid or empty 'dataValue' prop");
    }

    if (!props.dataYears || !Array.isArray(props.dataYears) || props.dataYears.length === 0) {
        throw new Error("Invalid or empty 'years' prop");
    }

    return {
        title: {
            text: props.companyTitle || 'Minerals Over the Years',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        xAxis: {
            type: 'category',
            data: props.dataYears,
            name: 'Time (year)',
            nameLocation: 'middle',
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 14,
                padding: 20
            },
            axisLabel: {
                rotate: 45,
                interval: 0
            }
        },
        yAxis: {
            type: 'value',
            name: 'Mineral Value (USD)',
            nameLocation: 'middle',
            nameTextStyle: {
                fontWeight: 'bold',
                fontSize: 14,
                padding: 70
            },
            axisLabel: {
                formatter: value => value.toLocaleString()
            }
        },
        series: plainDataValue.value.map(item => ({
            name: item.mineral,
            type: 'bar',
            data: item.value
        }))
    };
});
</script>

<style scoped>
.chart {
    height: 400px;
}
</style>
