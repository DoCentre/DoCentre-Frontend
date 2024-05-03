<template>
    <v-container>
        <NavigationBar />
        <DocList />
        
    </v-container>
</template>
  
<script>
import NavigationBar from "@/components/NavigationBar.vue"
import DocList from "@/components/DocList.vue";
export default {
    name: "OverviewPage",
    components: {
        NavigationBar,
        DocList,
    },
};
</script>
