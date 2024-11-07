<template>
    <div class="container bg-white p-4 col-md-6 col-sm-12 mx-auto" style="min-height: 700px;">
        <div class="text-center mt-3">
            <img src="../../../public/images/welcome.png" height="130" alt="...">
        </div>
        <h6 class="text-center text-muted mb-5 mt-2">Selamat datang !</h6>
        <h1 class="alert-heading text-center mt-4 mb-1 color-4">E-JPS</h1>
        <p class="text-center fs-6 mb-4">Elektronik Jaring Pengaman Sosial</p>

        <div v-if="!deferredPrompt">

            <div class="fw-bold color-1 fs-7 mt-5 mb-2">
                Masukkan username dan password !
            </div>
                
            <form @submit.prevent="userLogin">
                <div class="form-floating">
                    <input type="text" v-model="akun.username" class="form-control" placeholder="Username" required>
                    <label for="floatingInputValue">Username </label>
                </div>
                <div class="form-floating mt-1">
                    <input type="password" v-model="akun.password" class="form-control" placeholder="Password" required>
                    <label for="floatingInputValue">Password</label>
                </div>
                <button v-if="!loading" type="submit" class="btn shadow btn-primary w-100 mt-3"> Masuk </button>
                
                <button v-if="loading" class="btn shadow btn-primary w-100 mt-3" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span class="ms-2">Loading...</span>
                </button>
                
            </form>
        </div>

        <div v-if="deferredPrompt" class="text-center mt-5">
            <div>
                <div class="mb-3 text-muted">
                    Install aplikasi versi mobile
                </div>
                <i class="bi bi-android2 fs-4 me-1 text-success"></i>
                <i class="bi bi-apple fs-4 ms-1"></i>
            </div>

            <button 
                ref="addBtn"
                @click="clickCallback" 
                class="btn btn-success btn-lg px-5 d-inline mt-4">
                Install App</button>
        </div>
        <!-- <div class="text-center">
            <span>Belum punya akun?</span>
            <RouterLink to="/register"><span class="color-1 ms-2">Registrasi</span></RouterLink>
        </div> -->

    </div>
</template>


<script>


import axios, { AxiosHeaders } from 'axios';
import { ref } from 'vue'
import { useAuthStore } from '../../store/main'
import url from '../../api/url.js'

export default {

    name: 'Login',
    data() {
        return {
            auth: useAuthStore(),
            loading: ref(false),
            result: [],
            akun: {
                username: '',
                password: '',
            },
            deferredPrompt: null,
        }
    },
    methods: {

        userLogin() {
            this.loading = true;

            axios
                .post(`${url}auth/login`, this.akun, {
                    headers: {
                        'Accept': 'application/json'
                    },
                })
                .then((response) => {
                    const data = response.data
                    localStorage.setItem('token', JSON.stringify(data))
                    this.auth.token = data
                    console.log(data);

                    try {
                        if (data.token) {
                            this.auth.user = data
                            this.$router.replace({ name: 'Kpm' })
                        } else {
                            //
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                .finally(() => {
                    this.loading = false
                })

        },

        captureEvent() {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault()
                this.deferredPrompt = e
            })
        },
        clickCallback() {
            this.deferredPrompt.prompt()
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    //
                }
                window.close();
                this.deferredPrompt = null
            })
        },
    },
    mounted() {
        this.captureEvent()
        console.log("API_URL " + url);
    },


}
</script>

<style>
</style>