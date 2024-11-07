<template>
    
    <Header />
    <div class="container p-4 col-md-6 col-sm-12 mx-auto">
        <div class="text-center">
            <img src="../../../public/images/welcome.png" height="130" alt="...">
        </div>
        <h4 class="alert-heading mt-4 mb-0 color-2 text-center">Registrasi Akun !</h4>
        <p class="mb-0 text-muted fs-7 text-center">Hi, Silahkan mengisi kolom akun..</p>

       
 
        <form class="mt-4">

           <div class="mb-1">
            <label for="" class="form-label">Nama Anda</label>
            <input type="text" required class="form-control" aria-describedby="textHelp">
           </div>
           
           <div class="mb-1">
            <label for="" class="form-label">Email address</label>
            <input type="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
           </div>

           <div class="mb-1">
            <label for="" class="form-label">Password</label>
            <input type="password" required class="form-control" aria-describedby="textHelp">
           </div>
           
           <div class="mb-1">
            <label for="" class="form-label">Ulangi password</label>
            <input type="password" required class="form-control" aria-describedby="textHelp">
           </div>

         
            <button type="button" class="btn shadow btn-primary w-100 mt-3"> Registrasi </button>
            
        </form>


        <div class="text-center mt-3">
            <span>Sudah punya akun?</span>
            <RouterLink to="/"><span class="color-1 ms-2">Masuk</span></RouterLink>
            
        </div>

    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Login from './Login.vue';

export default {
    name: 'Register',
    components: {
    Header,
    
}
}
</script>

<style>

</style>