<template lang="">
    <div>
        <div class="bg-homeoffline-top">
        </div>
        <div class="container-home px-4">
            <div class="float-end fs-8 pt-2 text-light"><i class="bi color-4 bi-airplane-fill me-1"></i> Offline mode</div>
            <div class="fs-3 fw-bold text-white">DINAS SOSIAL</div>
            <div class="t-prov fs-6 mb-3 text-white"> Provinsi Gorontalo</div>
            
            <div class="card w-100 text-center border-white shadow" style="width: 18rem;">
                <div class="card-body">
                 
                    <div class="card-title color-4 mb-1 fs-5 mt-0 fw-bold">J P S</div>
                    <div v-if="datamaster" class="color-2 fs-8">({{ datamaster[0].jps }})</div>
                    <div class="color-2 fs-8 fw-bold">{{ kpm.kpm }}</div>
                    <div class="color-2 fs-8 mt-2" >{{ kpm.nmkab }}</div>
                    <div class="color-2 mb-1 fs-8 " >KEC. {{ kpm.nmkec }}</div>
                    
                    <div class="row mt-3">
                        <div class="col-6 px-1">
                            <Router-link to="/home" class="btn btn-light w-100 shadow-sm">
                                <i class="bi bi-wifi me-1 float-start"></i> Switch online
                            </Router-link>  
                        </div>    
                        <div class="col-6 px-1">
                            <div v-if="!sync" >
                                <button v-if="jumlah" @click="handleSync" class="btn btn-primary shadow-sm w-100">
                                    <i class="bi bi-arrow-repeat ms-1 float-end"></i> 
                                    <span class="badge bg-secondary small me-1" style="font-size:10px">{{ jumlah }}</span>
                                    Sync now 
                                </button>
                                <button v-if="!jumlah" disabled class="btn btn-secondary shadow-sm w-100">
                                    <i class="bi bi-arrow-repeat me-1 float-end"></i> Sync now
                                </button>
                            </div>
                            <div v-if="sync">
                                <button v-if="sync" class="btn shadow-sm w-100 btn-warning" type="button" disabled>
                                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    {{ status_sync }}
                                </button>
                            </div>
                        </div>    
                    </div>
                   
                </div>
            </div>

            <div v-if="!datamaster.length" class="text-center mt-5 fs-6 color-5">
                <i class="bi bi-exclamation-octagon me-2"></i> Tidak ditemukan data Penerima
            </div>
            <div v-if="datamaster.length">
                <div class="fs-6 fw-bold color-2 mt-4 mb-2">Data Penerima</div>
                <div class="mb-0">
                    <input type="text" autofocus tabindex="-1" v-model="cariText" class="form-control shadow-sm cari" placeholder="Cari nama...">
                </div>
                <div class="btn-group w-100 shadow-sm" role="group" aria-label="Basic outlined example">
                    <button @click="group('')" type="button" class="group border-end">Semua</button>
                    <button @click="group('1')" type="button" class="group border-end">Disalurkan</button>
                    <button @click="group('0')" type="button" class="group">Belum</button>
                </div>
                
                        <Listitemoffline ref="modalComponent" v-if="!cariText" :penerima="penerima" :kpm="kpm"/>
                        <Listitemoffline v-if="cariText" :penerima="filterPenerima" :kpm="kpm"/>
            
            </div>
            

        </div>
        
        <!-- <Menu></Menu> -->
    </div>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Listitemoffline from '../../components/Listitem-offline.vue'
import {useAuthStore} from '../../store/main'
import axios from 'axios';
import url from'../../api/url.js'



// $(".modal-backdrop").remove();

export default {
    name: 'Home-offline',
    // beforeRouteLeave (to, from, next) {
    //     this.closeEvent = false
    //     console.log('tes');
    //     next()
    // },
    data() {
        return {
            auth : useAuthStore(),
            cariText: '',
            datamaster: '',
            penerima: '',
            kpm: '',
            tahap: '',
            sync: false,
            status_sync: 'Loanding..',
            dataSalur: [],
            salurFoto: [],
            postFoto: {
                id_salur: '',
                foto: '',
            },
            jumlah: 0,
            closeEvent: true

        }
    },
    components: {
        Listitemoffline,   
        Menu,
    },

    
    computed:{
        filterPenerima(){
            return this.penerima.filter(d => {
                let result = d.nama.toLowerCase().includes(this.cariText.toLowerCase());
                return result
            })
        },
       
        
        
    },
  

    methods: {
        
        setClose(){
            if(this.closeEvent == true)
                this.closeEvent = false
            else
                this.closeEvent = true
        },

        group(i){  
            console.log(i);
            if(i)
                this.penerima = this.datamaster.filter(d => d.status_salur === Number(i))
            else
                this.penerima = this.datamaster
            console.log(this.penerima);
        },

        jData(){
            let jsalur = 0
            let jfoto = 0
            this.jumlah = 0
            if(localStorage.getItem('salur')){
                jsalur = JSON.parse(localStorage.getItem('salur'))
                this.jumlah += jsalur.length
            }
            if(localStorage.getItem('salur-foto')){
                jfoto = JSON.parse(localStorage.getItem('salur-foto'))
                this.jumlah += jfoto.length
            }


            if(this.jumlah>0)
                return true
            else
                return false

        },
        

        handleSync(){
            if(!localStorage.getItem('salur')){
                return this.syncFoto()
            }
            
            this.sync = true
                const salur = JSON.parse(localStorage.getItem('salur'))
                this.dataSalur = salur
                let token = JSON.parse(localStorage.getItem('token'));
                console.log(salur);     
                salur.forEach((value, i) => {
                    axios
                        .post(`${url}salur/insert`, value, {
                            headers: {
                                'Accept':'application/json',
                                'Authorization': 'Bearer ' + token.token
                            }
                        })
                        .then((res) => {
                                this.status_sync = (i+1) + " synchronized"
                                
                                if(this.dataSalur.length>1){
                                    this.dataSalur.splice(i, 1)
                                    localStorage.setItem('salur', JSON.stringify(this.dataSalur))
                                }else{
                                    this.dataSalur = []
                                    localStorage.removeItem('salur')
                                    this.sync = false
                                    if(localStorage.getItem('salur-foto')){
                                        this.syncFoto()
                                    }else{
                                        this.$router.push({path: '/home'})
                                    }
                                }
                        })
                        .catch((err) => this.$toast.error('Gagal sinkron data', { position:'top', duration: 2000}))
                })
                
                
        },
        syncFoto(){
            if(!localStorage.getItem('salur-foto')){
                this.sync = false
                return this.$toast.warning('Tidak ditemukan data offline !', {
                            position: 'top', duration: 2000
                        })
            }

            this.sync = true
            let token = JSON.parse(localStorage.getItem('token'));
            const foto = JSON.parse(localStorage.getItem('salur-foto'))
            this.salurFoto = foto
            foto.forEach((value, i) => {
                axios
                .get(`${url}salur/data`,{
                    params:{
                        id_kpm: value.id_kpm,
                        nik: value.nik,
                        // id_tahap: value.id_tahap
                    }
                })
                .then((res) => {
                    if(res.data.records.length>0){
                        this.postFoto.id_salur = res.data.records[0].id_salur
                        this.postFoto.foto = value.foto
                        axios
                            .post(`${url}salur-foto/insert`, this.postFoto, {
                                headers: {
                                    'Accept':'application/json',
                                    'Authorization': 'Bearer ' + token.token
                                }
                            })
                            .then((res) => {
                                console.log("foto "+i);
                                if(this.salurFoto.length > 1){
                                    this.salurFoto.splice(i, 1)
                                    localStorage.setItem('salur-foto', JSON.stringify(this.salurFoto))
                                }else{
                                    this.salurFoto = []
                                    localStorage.removeItem('salur-foto')
                                        this.sync = false
                                        this.$router.push({path: '/home'})
                                        return this.$toast.success('Data disinkronkan.. !', {
                                            position: 'top', duration: 2000
                                        })
                                }
                            })
                    }
                })
            });
            
        }
        
    },
    

    mounted() {
        this.penerima = JSON.parse(localStorage.getItem('penerima')) 
        this.datamaster = JSON.parse(localStorage.getItem('penerima')) 
        this.kpm = JSON.parse(localStorage.getItem('kpm'))
        setInterval(this.jData, 2000);

       
    },


}
</script>
<style scoped>
    .group {
        width: 100%;
        border: none;
        font-size: 14px;
        text-align: center;
        height: 40px;
        background-color: #fff;
        color: #888;
        font-weight: 600;
        /* border-bottom: 1q solid #ddd; */

    }
    .group:hover, .group:focus, .group::after {
        background-color: #6c757d;
        color: #fff;
        border-radius: 5px;
        font-weight: normal;
    }
    .container-home{
        margin-top:-200px;
    }
    .t-prov{
        margin-top: -5px;
    }
</style>