<template>
    <v-container>
        this is edit doc page
    </v-container>
</template>

<script>
export default {
    name: "temp",
    async created() {
        console.log(this.$route.params.id)
    },
};
</script>
