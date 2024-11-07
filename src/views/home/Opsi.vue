<template lang="">
    <div class="bg-home-top">
        </div>
    <div class="container-home px-4">
        
        <div class="h3 mb-4 text-white">Opsi</div>
        <div class="alert bg-white mb-1 shadow-sm">
            <RouterLink to="/kpm" class="menu"><i class="bi bi-gear me-2"></i>Pilih KPM</RouterLink>
        </div>
        
        <!-- <div class="alert bg-white mb-1 shadow-sm">
            <RouterLink to="/akun" class="menu"><i class="bi bi-person-circle me-2"></i>Akun</RouterLink>
        </div> -->
        <div class="alert bg-white mb-1 shadow-sm">
            <a class="menu text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-box-arrow-right me-2"></i> Logout</a>
        </div>

        <!-- Modal -->
        <div ref="md" class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
           
            <div class="modal-body fw-bold">
                Akan logout?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal" ref="cancel">Cancel</button>
                <button type="button" class="btn btn-danger" @click="logout">Logout</button>
            </div>
            </div>
        </div>
        </div>

        <Menu/>
    </div>
</template>
<script>
import Menu from '../../components/Menu.vue';
import { createConfirmDialog } from 'vuejs-confirm-dialog'
export default {
    name: 'Opsi',
    components:{
        Menu,
    },
    methods: {
        logout(){
            this.$refs.cancel.click()
            this.$router.push({path: 'logout/'})
        }
    },
}
</script>
<style scoped>

.container-home{
        margin-top:-180px;
    }
    .t-prov{
        margin-top: -5px;
    }
</style>