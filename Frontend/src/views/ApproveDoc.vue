<template>
    <v-container>
        123
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
