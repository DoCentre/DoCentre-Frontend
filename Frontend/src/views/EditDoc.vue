<template>
    <v-container>
        this is edit doc page
    </v-container>
</template>

<script>
export default {
    name: "EditDoc",
    async created() {
        console.log(this.$route.params.id)
    },
};
</script>
