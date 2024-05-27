<template>
  <v-container>
    <v-card outlined>
      <v-text-field v-model="Title" label="Title" hide-details single-line id="Title"></v-text-field>

      <v-card-text>
        <v-textarea v-model="Content" label="Content" single-line rows="13"></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <img id="myImage" src="" height="160px" width="250px" style="margin-right: 20px" alt="appendix...">

        <v-chip color="grey lighten-2" class="ma-2">
          Last Edit: {{ this.lastUpdate }}
        </v-chip>

        <v-file-input accept="image/*" label="File input" v-model="chosenFile" @change="importImage" density="compact"
          style="max-width: 170px; margin-right: 10px" prepend-icon=""></v-file-input>

        <v-select v-model="selectedApprover" :items="approverList" density="compact" label="Approver"
          style="max-width: 170px"></v-select>

        <v-btn @click="save" :disabled="checkForm" color="grey" dark>
          Save
        </v-btn>
        <v-btn @click="submit" :disabled="checkForm" color="green" dark>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="isOpenSnackbar" :timeout="2000" color="red">
      儲存失敗
    </v-snackbar>
  </v-container>
</template>

<script>
import { updateDoc, getDocContent } from '@/api/docApi';

export default {
  name: "EditComponent",
  data() {
    return {
      isOpenSnackbar: false,
      submitSuccess: false,
      submitFailed: false,
      approverList: [
        { index: 1, title: "aura" },
        { index: 2, title: "laiyt" },
        { index: 3, title: "hhf" },
        { index: 4, title: "yuhsuan" },
        { index: 5, title: "johnny" },
        { index: 6, title: "mike" },
        { index: 7, title: "tim" },
        { index: 8, title: "alex" },
        { index: 9, title: "michael" },
        { index: 10, title: "eve" },
      ],
      Title: "",
      Content: "",
      selectedApprover: 0,
      lastUpdate: "",
      chosenFile: "",
      data: "",

      titleRules: [
        (v) => !!v || "欄位不可留空",
      ],
      contentRules: [
        (v) => !!v || "欄位不可留空",
      ],
    };
  },
  async created() {
    const result = await getDocContent(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id)); // docID, userId
    // console.log(result)
    this.Title = result["document"]["Title"];
    this.Content = result["document"]["Content"];
    this.selectedApprover = this.approverList[result["document"]["Approver"]["ID"]].title;
    this.lastUpdate = result["document"]["UpdatedAt"].substring(0, 10)
    this.data = result["document"]["Appendix"]
    if (this.data === "") {
      this.data = "data:image/png;base64,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sIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEIChj0UplcIECBAgIBh1wECBAgQIBASMOyhML1CgAABAgQMuw4QIECAAIGQgGEPhekVAgQIECBg2HWAAAECBAiEBAx7KEyvECBAgAABw64DBAgQIEAgJGDYQ2F6hQABAgQIGHYdIECAAAECIQHDHgrTKwQIECBAwLDrAAECBAgQCAkY9lCYXiFAgAABAoZdBwgQIECAQEjAsIfC9AoBAgQIEDDsOkCAAAECBEICC/oPJR97HGnxAAAAAElFTkSuQmCC";
    }
    document.getElementById("myImage").src = this.data;
  },
  computed: {
    checkForm() {
      return !this.Title;
    },
  },
  methods: {
    async delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    async submit() {
      let approverIndex = 0;
      this.approverList.forEach((element) => {
        if (element.title === this.selectedApprover) {
          approverIndex = element.index;
        }
      });
      try {
        await updateDoc(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id), this.Title, this.Content, this.data, approverIndex, "APPROVE");
        this.$router.push("/edit");
      } catch (err) {
        this.isOpenSnackbar = true;
        console.log(err);
      }
    },
    async save() {
      let approverIndex = -1;
      this.approverList.forEach((element) => {
        if (element.title === this.selectedApprover) {
          approverIndex = element.index;
        }
      });
      try {
        await updateDoc(parseInt(this.$store.state.login.id), parseInt(this.$route.params.id), this.Title, this.Content, this.data, approverIndex, "EDIT");
        this.$router.push("/edit");
      } catch (err) {
        this.isOpenSnackbar = true;
        console.log(err);
      }
    },
    async importImage() {
      try {
        var reader = new FileReader();
        await reader.readAsDataURL(this.chosenFile);
        reader.onload = () => {
          this.data = reader.result;
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
      this.delay(500).then(() => document.getElementById("myImage").src = this.data);
    },
  },
};
</script>