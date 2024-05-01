<template>
    <NavigationBar />
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card hover height="200px" align="center" @click="appendDoc">
                    <v-avatar size="200">
                        <v-icon color="blue" size="100">mdi-plus</v-icon>
                    </v-avatar>
                </v-card>
            </v-col>
            <v-layout row wrap v-for="(doc) in docs" :key="doc.id">
                <v-col>
                    <v-card class="mx-auto" :subtitle="doc.subtitle" :title="doc.title" hover height="200px"
                        @click="check(doc.id)">
                        <template v-slot:append>
                            <v-avatar size="24">
                                <v-img :color="doc.status"></v-img>
                            </v-avatar>
                        </template>
                        <v-card-text>{{ doc.content }}</v-card-text>
                    </v-card>
                </v-col>
            </v-layout>
        </v-row>
    </v-container>
    <v-snackbar v-model="clickCard" :timeout="2000" color="green">
        {{ snackbarContent }}
    </v-snackbar>
</template>

<script>
import { createDoc } from "@/api/docApi";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
    name: "FileList",
    components: {
        NavigationBar,
    },
    data() {
        return {
            snackbarContent: "",
            clickCard: false,
            docs: [],
        };
    },
    methods: {
        check(id) {
            this.snackbarContent = "Card " + id + " is clicked";
            this.clickCard = true;
        },
        async appendDoc() {
            const result = await createDoc(this.$store.state.login.id);
            const id = result["document_id"];
            this.docs.push({ id: id, title: "Card " + id, subtitle: "This is a card " + id + " subtitle", content: "This is card " + id + " content", status: "green" });
        },
    },
};
</script>