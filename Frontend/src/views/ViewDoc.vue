<template>
    <NavigationBar />
    <v-container>
        <ViewComponent />
    </v-container>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import ViewComponent from "@/components/ViewDoc.vue"
export default {
    name: "ViewDoc",
    components: {
        NavigationBar,
        ViewComponent,
    },
    async created() {
        // console.log(this.$route.params.id)
    },
};
</script>
