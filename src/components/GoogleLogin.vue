<template>
    <v-btn type="button" @click="handleGoogleLogin">
        使用 Google 繼續
    </v-btn>
</template>

<script setup>
import { googleTokenLogin } from 'vue3-google-login'
import { loginByGoogle } from '@/api/OAuth'

// const handleGoogleLogin = () => {
const handleGoogleLogin = () => {
    googleTokenLogin({
        clientId: "14365237599-a54jh4i11057dsf1fme2shiu501efdue.apps.googleusercontent.com"
    }).then(async (response) => {
        const data = await loginByGoogle(response['access_token'])
        console.log(data)
    })
}
</script>