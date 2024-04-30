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
        clientId: process.env.GOOGLE_CLIENT_ID,
    }).then(async (response) => {
        const data = await loginByGoogle(response['access_token'])
        console.log(data)
    })
}
</script>