<template lang="">
    <div class="bg-content">
        <div class="bar-title shadow">
            <i class="bi bi-check2-circle me-1"></i>
            Pilih KPM
        </div>
        <div class="body-content p-4">
        <div class="text-center mt-2">
            <img src="../../../public/images/kpm.png" height="90" alt="...">
        </div>
        <!-- <div class="h3 fw-bold mb-0 color-1 text-center">J P S</div>
        <div class="color-1 text-center">Jaring Pengaman Sosial</div> -->
        <div class="mt-5 mb-3 fw-bold text-muted text-center">Silahkan memilih KPM</div>
        <div class="mb-2">
            <input type="hidden" @click="showkpm()" readonly v-model="form.id_kpm" class="form-control">
            <input type="text" @click="showkpm()" readonly v-model="form.kpm" class="form-control" placeholder="Search kpm ...">
        </div>
        <div class="mb-2">
            <div class="mb-2">
                <div class="form-floating">
                <select v-model="form.nmkab" @change="onChangeKab" class="form-select col-sm">
                    <option selected value=''>Pilih</option>
                    <option v-for="(item, index) in kab" :key="index" style="font-size:11px" 
                        :value="item.nmkab">
                        {{ item.nmkab }}
                    </option>
                </select>
                <label for="floatingSelect">Wialyah Penyaluran</label>
                </div>
            </div>
        </div>
        
        <div class="mb-2" v-if="form.nmkab">
            <div class="form-floating">
            <select @change="onChangeKec" v-model="form.nmkec" class="form-select col-sm">
                <option selected value=''>Pilih</option>
                <option v-for="(item, index) in kec" :key="index" style="font-size:11px" 
                    :value="item.nmkec">
                    {{ item.nmkec }}
                </option>
            </select>
            <label for="floatingSelect">Kecamatan</label>
            </div>
        </div>

        <div class="mb-2" v-if="form.nmkec">
            <div class="form-floating">
            <select @change="onChangeDesa" v-model="form.nmdesa" class="form-select col-sm">
                <option selected value=''>Pilih</option>
                <option v-for="(item, index) in desa" :key="index" style="font-size:11px" 
                    :value="item.nmdesa">
                    {{ item.nmdesa }}
                </option>
            </select>
            <label for="floatingSelect">Desa/Kelurahan</label>
            </div>
        </div>
        
        <div class="position-fixed bottom-0 end-0 pe-4 pb-4">
            <button @click="lanjutkan" class="btn btn-primary">Lanjutkan <i class="bi bi-chevron-double-right"></i></button>
        </div>
    </div>

   
    <!-- Modal -->
    <div v-if="vModal" class="modal fade show" style="display:block" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog show">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title small" id="exampleModalLabel">Pilih KPM</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" @click="vModalClose()"  aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <input type="text" v-model="cariText" class="form-control" placeholder="Cari ...">
                </div>
                <table class="table table-hover">
                    <tbody>
                    <tr @click="setKpm(index)" v-if="!cariText" v-for="(item, index) in kpm" :key="index">
                        <td>
                            <div class="fw-bold">{{ item.kpm }}</div>
                            <div class="text-muted small">{{ item.organisasi }}</div>
                            <div class="text-muted small mt-3 d-inline">
                                <span>{{ item.tahun }}</span>
                                <span class="fw-bold float-end">Rp. {{ Number(item.alokasi_anggaran).toLocaleString() }}</span>
                                
                            </div>
                        </td>
                        <td style="vertical-align: middle;"><i class="bi bi-chevron-right"></i></td>
                    </tr>
                    <tr @click="setKpm(index)" v-if="cariText" v-for="(item, index) in filterkpm" :key="index">
                        <td>
                            <div class="fw-bold">{{ item.kpm }}</div>
                            <div class="text-muted small">{{ item.organisasi }}</div>
                            <div class="text-muted small mt-3 d-inline">
                                <span>{{ item.tahun }}</span>
                                <span class="fw-bold float-end">Rp. {{ Number(item.alokasi_anggaran).toLocaleString() }}</span>
                                
                            </div>
                        </td>
                        <td style="vertical-align: middle; text-align:right; padding-right:0px; padding-left:5px"><i class="bi bi-chevron-right"></i></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="vModalClose()" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    </div>

   

    
</template>

<script>
import axios, { Axios } from 'axios';
import url from '../../api/url.js'
import { useAuthStore } from '../../store/main'

export default {
    name: 'Kpm',
    data() {
        return {
            kpm: '',
            form: {
                kpm: '',
                id_kpm: '',
                id_jps: '',
                id_org: '',
                nmkab: '',
                nmkec: '',
                nmdesa: '',
                tahun: '',
            },
            vModal: false,
            cariText: '',
            kec: '',
            kab: '',
            desa: '',
            auth: useAuthStore(),

        }
    },

    computed: {
        // ...mapGetters(['kab']),
        filterkpm() {
            return this.kpm.filter(k => {
                let result = k.kpm.toLowerCase().includes(this.cariText.toLowerCase());
                return result
            })
        }
    },
    created() {
        axios
            .get(`${url}kpm/data`)
            .then((response) => {
                this.kpm = response.data.records
                console.log(response.data.records);
            }).catch(console.log())
    },

    methods: {
        showkpm() {
            this.vModal = true
        },
        vModalClose() {
            this.vModal = false;
        },
        setKpm(index) {
            this.vModal = false
            this.form.kpm = this.kpm[index].kpm
            this.form.id_kpm = this.kpm[index].id_kpm
            this.form.id_org = this.kpm[index].id_org
            this.form.id_jps = this.kpm[index].id_jps
            this.form.tahun = this.kpm[index].tahun

            axios
            .get(`${url}wilayah/kpm`, {
                params:{
                    id_kpm: this.form.id_kpm
                }
            })
            .then((res) => {
                this.kab = res.data.records
                console.log(this.kab);
            }).catch(console.log())
        },

        onChangeKec(e) {
            if(!this.form.nmkab)
                return this.$toast.info('Wilayah Kecamatan tidak ditemukan', { position:'top', duration: 1000})
            
            axios
                .get(`${url}kelurahan/kpm`, {
                    params: {
                        id_kpm: this.form.id_kpm,
                        nmkec: this.form.nmkec
                    }
                })
                .then((res) => {
                    if (res.status === 200)
                        this.form.nmdesa = ''
                    this.desa = res.data.records
                    console.log(res.data.records);
                })
        },

        onChangeKab(e) {
            if(!this.form.nmkab)
                return this.$toast.info('Wilayah Kabupaten tidak ditemukan', { position:'top', duration: 1000})
            // this.form.nmkab = this.kab[e.target.index].nama_wilayah
            axios
                .get(`${url}kecamatan/kpm`, {
                    params: {
                        id_kpm: this.form.id_kpm,
                        nmkab: this.form.nmkab
                    }
                })
                .then((res) => {
                    if (res.status === 200)
                        this.form.nmkec = ''
                    this.kec = res.data.records
                    console.log(res.data.records);
                })
        },

        onChangeDesa(e){
            // Aksi
        },

        lanjutkan() {
            if (!this.form.id_kpm)
                return this.$toast.error('Pilih KPM !', {
                    position: 'top',
                    duration: 2000,
                });
            if (!this.form.nmkec)
                return this.$toast.error('Pilih Kecamatan !', {
                    position: 'top',
                    duration: 2000,
                });
            if (!this.form.nmdesa)
                return this.$toast.error('Pilih Desa !', {
                    position: 'top',
                    duration: 2000,
                });

            this.auth.sesi = this.form
            localStorage.setItem('kpm', JSON.stringify(this.form))
            if (localStorage.getItem('kpm')) {
                return this.$router.replace({ path: 'home' })
            }
            this.$toast.error('localStorage empty !', { position: 'top' })
        },

    },
}
</script>



<style></style>