<template lang="">
    <div>
        <div class="bg-home-top">
        </div>
        <div class="container-home px-4">
            <div class="float-end fs-8 pt-2 text-white"><i class="bi bi-wifi me-1"></i> Online mode</div>
            <div class="fs-3 fw-bold text-white">DINAS SOSIAL</div>
            <div class="t-prov fs-6 mb-3 text-white"> Provinsi Gorontalo</div>
            
            <div class="card w-100 text-center border-white shadow" style="width: 18rem;">
                <div class="card-body">
                 
                    <div class="card-title color-4 mb-1 fs-5 mt-0 fw-bold">J P S</div>
                    <div v-if="datamaster.length" class="color-2 fs-8">({{ datamaster[0].jps }})</div>
                    <div class="color-2 fs-8 fw-bold">{{ kpm.kpm }}</div>
                    <div class="color-2 fs-8 mt-2" >{{ kpm.nmkab }}</div>
                    <div class="color-2 mb-1 fs-8 " >KEC. {{ kpm.nmkec }}</div>
                    
                    <div class="row mt-3">
                        <div class="col-12 px-3">
                            <Router-link to="/home-offline" class="btn btn-secondary w-100">
                                <i class="bi bi-airplane-fill me-2"></i> Switch Offline Mode
                            </Router-link>  
                        </div>    
                        <!-- <div class="col-6 px-1">
                            <button class="btn shadow-sm btn-primary w-100">
                                Data salur
                            </button>
                        </div>     -->
                    </div>
                   
                </div>
            </div>

            <div v-if="!datamaster.length" class="text-center mt-5 fs-6 color-5">
                <i class="bi bi-exclamation-octagon me-2"></i> Tidak ditemukan data Penerima
            </div>
            <div v-if="datamaster.length">
                <div class="fs-6 fw-bold color-2 mt-4 mb-2">Data Penerima</div>
                <div class="mb-0">
                    <input type="text" autofocus tabindex="-1" v-model="cariText" class="form-control cari shadow-sm" placeholder="Cari nama...">
                </div>
                <div class="btn-group w-100 shadow-sm" role="group" aria-label="Basic outlined example">
                    <button @click="group('')" type="button" class="group border-end">Semua </button>
                    <button @click="group('1')" type="button" class="group border-end">Disalurkan</button>
                    <button @click="group('0')" type="button" class="group">Belum</button>
                </div>
            

                    <Listitem v-if="!cariText" :penerima="penerima" :kpm="kpm"/>
                    <Listitem v-if="cariText" :penerima="filterPenerima" :kpm="kpm"/>
            </div>
            

        </div>
        
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from '../../components/Menu.vue'
import Listitem from '../../components/Listitem.vue'
import {useAuthStore} from '../../store/main'
import axios from 'axios';
import url from'../../api/url.js'

export default {
    name: 'Home',
    data() {
        return {
            auth : useAuthStore(),
            cariText: '',
            datamaster: '',
            penerima: '',
            kpm: '',
            tahap: '',

        }
    },
    components: {
        Listitem,   
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
        group(i){  
            console.log(i);
            if(i)
                this.penerima = this.datamaster.filter(d => d.status_salur === Number(i))
            else
                this.penerima = this.datamaster
            console.log(this.penerima);
        }
        
    },
    
    

    created() {
        
        this.kpm = JSON.parse(localStorage.getItem('kpm'))
        console.log(this.kpm.nmkab);
        axios
            .get(`${url}penerima/data`, {
                params: {
                    id_kpm: this.kpm.id_kpm,
                    tahum: this.kpm.tahum,
                    nmkab: this.kpm.nmkab,
                    nmkec: this.kpm.nmkec,
                    nmdesa: this.kpm.nmdesa,
                }
            })
            
            .then((res) => {
                this.datamaster = res.data.records
                this.penerima = res.data.records
                // this.$refs.jps.html('tesss')
                localStorage.setItem('penerima', JSON.stringify(this.penerima))
                console.log(res.data.records);
            })
            
            axios
                .get(`${url}tahap/data`, {
                    params: {
                        id_kpm: this.kpm.id_kpm,
                    }
                })
                .then((res) => {
                    this.tahap = res.data.records
                    localStorage.setItem('tahap', JSON.stringify(this.tahap))
                    console.log(res.data.records);
                })
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
        color: #666;
        font-weight: 600;
        /* border-bottom: 1q solid #ddd; */

    }
    .group:hover, .group:focus, .group::after {
        background-color: #5398d8;
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