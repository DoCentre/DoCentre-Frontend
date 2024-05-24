<template>
    <NavigationBar />
    <v-container>
        <h1>System Status</h1>
        <h2>Memory Usage: {{ memory.toFixed(2) }} MB / 1000 MB</h2>
        <div id="myProgress">
            <div id="myBar" :style="{ width: memoryPercent }"></div>
        </div>
        <br>
        <h2>Process Time: {{ processTime.toFixed(2) }} ms / 1 ms</h2>
        <div id="myProgress">
            <div id="myBar" :style="{ width: processTimePercent }"></div>
        </div>
        <br>
        <h2>HTTP Traffic</h2>
        <br>
        <h3>Total : {{ http200 + http500 + http503 }}</h3>
        <br>
        <h3>HTTP 200: {{ http200 }}</h3>
        <br>
        <h3>HTTP 500: {{ http500 }}</h3>
        <br>
        <h3>HTTP 503: {{ http503 }}</h3>
        <br>
        <br>
        <v-btn @click="showDetail = !showDetail">Show Detail</v-btn>
        <div v-if="showDetail">
            <v-layout v-for="metric in metrics" :key="metric.api">
                <v-col>
                    <h3>{{ metric.info }}</h3>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left" width="30%">
                                    Type
                                </th>
                                <th class="text-left">
                                    {{ metric.type }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in metric.data" :key="data[0]">
                                <td class="text-left">
                                    {{ data[0] }}
                                </td>
                                <td class="text-left">
                                    {{ data[1] }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-layout>
        </div>
    </v-container>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import { getMetrics } from "@/api/systemApi";
export default {
    name: "showMetrics",
    components: {
        NavigationBar,
    },
    data() {
        return {
            showDetail: false,
            metrics: [],
            memory: 0,
            memoryPercent: 0,
            processTime: 0,
            processTimePercent: 0,
            http200: 0,
            http500: 0,
            http503: 0,
        };
    },
    async created() {
        const log = await getMetrics();
        const metricstemp = log.split("# HELP ");
        for (let i = 1; i < metricstemp.length; i++) {
            let api = metricstemp[i].split("\n")[0].split(" ")[0];
            let info = metricstemp[i].split("\n")[0].split(api + " ")[1];
            let type = metricstemp[i].split("\n")[1].split(api + " ")[1];
            let data = [];
            for (let j = 2; j < metricstemp[i].split("\n").length - 1; j++) {
                let apiData = metricstemp[i].split("\n")[j].split(" ")[0];
                let apiValue = metricstemp[i].split("\n")[j].split(apiData + " ")[1];
                data.push([apiData, apiValue]);
            }
            this.metrics.push({
                api: api,
                info: info,
                type: type,
                data: data,
            });
        }
        this.memory = Number(this.metrics[30]["data"][0][1]) / 1024 / 1024;
        this.memoryPercent = String(this.memory / 10) + "%";
        this.http200 = Number(this.metrics[35]["data"][0][1]);
        this.http500 = Number(this.metrics[35]["data"][1][1]);
        this.http503 = Number(this.metrics[35]["data"][2][1]);
        this.processTime = Number(this.metrics[27]["data"][0][1]) / (this.http200 + this.http500 + this.http503);
        this.processTimePercent = String(this.processTime * 100) + "%";
        console.log(this.metrics);
    },
};
</script>

<style>
#myProgress {
    width: 100%;
    background-color: #ddd;
}

#myBar {
    height: 30px;
    background-color: #04AA6D;
    text-align: center;
    line-height: 30px;
    color: white;
}
</style>