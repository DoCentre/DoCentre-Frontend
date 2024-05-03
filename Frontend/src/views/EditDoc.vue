<template>
    <NavigationBar />
    <v-container>
        <EditComponent />
    </v-container>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import EditComponent from "@/components/EditDoc.vue"
export default {
    name: "EditDoc",
    components: {
        NavigationBar,
        EditComponent,
    },
    async created() {
        console.log(this.$route.params.id)
    },
};
</script>

