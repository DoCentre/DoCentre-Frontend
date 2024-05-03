<template>
    <NavigationBar />
    <v-container>
        <ApproveComponent />
    </v-container>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import ApproveComponent from "@/components/ApproveDoc.vue"
export default {
    name: "ApproveDoc",
    components: {
        NavigationBar,
        ApproveComponent,
    },
    async created() {
        console.log(this.$route.params.id)
    },
};
</script>

