<template>
    <NavigationBar />
    <v-container>
        <v-layout v-for="metric in metrics" :key="metric.api">
            <v-col>
                <h2>{{ metric.api }}</h2>
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
            metrics: [],
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
        console.log(this.metrics);
    },
};
</script>
