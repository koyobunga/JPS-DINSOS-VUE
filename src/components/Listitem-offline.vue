<template lang="">
    <div>
        <div class="color-5 fs-9 text-end py-1 px-2 bg-white shadow-sm">
                <span class="float-start">List penerima </span>
                Jumlah <span class="badge bg-secondary ms-1 small">{{ penerima.length }}</span>
            </div>
            <table class="table table-hover shadow-sm">
                <tbody>
                <tr style="cursor:pointer" v-for="(item, index) in penerima" :key="index" @click="handleClick(index)">
                    <td class="td-content">
                        <div class="fs-8 ms-1 fw-bold">{{ item.nama }}</div>
                        <div class="fs-9 ms-1 text-muted w-100">NIK. {{ item.nik }}, <br>{{ item.alamat }}</div>
                        <div v-if="item.nmdesa" class="fs-9 ms-1 text-muted w-100">DESA/KEL. {{ item.nmdesa }}</div>
                        <div v-if="!item.nmdesa" class="fs-9 ms-1 text-muted w-100">DESA/KEL. {{ item.kelurahan }}</div>
                    </td>
                    <td class="td-icon">
                        <div v-if="item.status_salur === 0">
                            <i v-if="cekStatus(index)" class="bi bi-arrow-repeat text-warning"></i>
                            <i v-if="!cekStatus(index)" class="bi bi-chevron-right"></i>
                        </div>
                        <i v-if="item.status_salur === 1" class="bi bi-check-circle-fill me-1 text-success"></i>
                        <i v-if="item.status_salur === 2" class="bi bi-arrow-repeat text-warning"></i>
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- Confirm dialog -->
            <button ref="confirm" type="button" hidden class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-body">
                    Hapus data ini?
                </div>
                <div class="modal-footer">
                    <button type="button" ref="confirmClose" class="btn btn-secondary" data-bs-dismiss="modal">Tidak</button>
                    <button type="button" @click="hapusSalur" class="btn btn-primary">Ya</button>
                </div>
                </div>
            </div>
            </div>
        
            <!-- menu konfirm -->
            <div v-if="aksiSalur" class="border d-lg-none color-2 p-3 text-center fixed-bottom shadow mx-0 z-index-100" 
                style="height:195px; background-color:#fff; border-radius:20px 20px 0 0">
                
                <div class="mb-3 fs-6 fw-bold text-start">Penerima telah disalurkan. </div>
                <div class="mb-4 fs-6 text-center">Perlu aksi lain? </div>
                <div class="d-inline w-100">
                    <button @click="aksiSalur=false" class="menu-confirm shadow px-3 float-start">
                        <i class="bi bi-x-octagon-fill"></i>
                        <div class="fs-9">Tidak</div>
                    </button>
                    <a @click="fotoSalur=true, aksiSalur=false" class="menu-confirm shadow float-end">
                        <i class="bi bi-images text-success"></i>
                        <div class="fs-9 text-success">Gambar</div>
                    </a>
                    <a @click="editSalur" class="menu-confirm mx-2 px-3 float-end shadow">
                        <i class="bi bi-pencil-square"></i>
                        <div class="fs-9">Ubah</div>
                    </a>
                    <a @click="$refs.confirm.click()" class="menu-confirm float-end shadow">
                        <i class="bi bi-trash3 color-4"></i>
                        <div class="fs-9 color-4">Hapus</div>
                    </a>
                </div>
            </div>
 

            <!-- Hidden button modal  -->
            <button hidden type="button" ref="bmodal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#salurModal">
                Launch demo modal
            </button>
            <form @submit.prevent="handleSubmit" method="post">
            <div class="modal fade"  ref="modalSalur" id="salurModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title color-1" id="salurModalLabel">Input Penyaluran</h5>
                        <button type="button" class="btn-close" ref="closeModalSalur" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                            <div class="form-floating">
                                <select @change="changeTahap" required v-model="form.id_tahap" class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option value='' class="fs-8">Tahap</option>
                                    <option v-for="(item, index) in tahap" :key="index" :value="item.id_tahap" class="fs-9 clearfix">
                                        {{ item.tahap }} - {{ Number(item.alokasi_anggaran).toLocaleString() }}
                                    </option>
                                </select>
                                <label for="floatingSelect">Tahap</label>
                            </div>
                            <div v-if="form.id_tahap" class="mt-2 px-1">
                                <table class="table table-hover fs-8 w-100">
                                    <tbody>
                                    <tr>
                                        <td>Tahap</td>
                                        <td class="text-end">{{ info.tahap }}</td>
                                    </tr>
                                    <tr>
                                        <td>Alokasi anggaran</td>
                                        <td class="text-end">{{ Number(info.alokasi_anggaran).toLocaleString() }}</td>
                                    </tr>
                                    <tr>
                                        <td>Nama Kades</td>
                                        <td class="text-end">{{ info.kades_nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                        <td class="text-end">{{ info.kades_alamat }}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal</td>
                                        <td class="text-end">{{ info.tanggal }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                            <div class="color-4 fs-8 fw-bold mt-3">Data Penerima</div>
                            <div class="mt-1">
                                <input required readonly v-model="form.nik" class="form-control" type="text" placeholder="NIK">
                            </div>
                            <div class="mt-2">
                                <input required readonly v-model="form.nama" class="form-control" type="text" placeholder="Nama">
                            </div>
                            <div class="mt-2">
                                <input required readonly v-model="form.alamat" class="form-control" type="text" placeholder="Alamat">
                            </div>

                            <div class="form-floating mt-4">
                                <select v-model="form.status_salur" class="form-select" aria-label="Floating label select example">
                                    <option class="fs-8" selected value='0'>Sesuai</option>
                                    <option class="fs-8" value="1">Meninggal</option>
                                    <option class="fs-8" value="2">Pindah</option>
                                    <option class="fs-8" value="3">Tidak ditemukan</option>
                                    <option class="fs-8" value="4">Dll</option>
                                </select>
                                <label for="floatingSelect">Status Penyaluran</label>
                            </div>

                            <div v-if="form.status_salur>0">
                                <div class="color-4 fs-8 fw-bold mt-3">Data Pengganti</div>
                                <div class="mt-1">
                                    <input required v-model="form.lain_nik" class="form-control" type="text" placeholder="NIK">
                                </div>
                                <div class="mt-2">
                                    <input required v-model="form.lain_nama" class="form-control" type="text" placeholder="Nama">
                                </div>
                                
                            </div>
                            <div class="mt-2">
                                <input v-model="form.keterangan" class="form-control" type="text" placeholder="Keterangan">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div v-if="!saluredit">
                                <button v-if="!loading" type="submit" class="btn btn-primary px-4 shadow"><i class="bi bi-save me-1"></i> Simpan </button>
                            </div>
                            <div v-if="saluredit">
                                <button v-if="!loading" type="submit" class="btn btn-primary px-4 shadow"><i class="bi bi-save me-1"></i> Perbarui </button>
                            </div>
                            <button v-if="loading" type="submit" class="btn btn-primary px-4"> 
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                <span class="ms-2">Loading...</span>
                            </button>
                            <button type="reset" class="btn btn-warning shadow" ref="batal">Batal</button>
                            <button ref="closeModal" type="button" class="btn btn-secondary ms-auto shadow px-4" data-bs-dismiss="modal">Tutup</button>

                        </div>
                    </div>
                </div>
            </div>
        </form>
        
        <Gambaroffline v-if="fotoSalur" :salur="saluredit"/>

    </div>
</template>
<script>

import Gambaroffline from '../components/Gambar-offline.vue'



export default {
    name: 'Listitem-offline',
   
    props: ['penerima','kpm'],
    components: {
        Gambaroffline
    },   
    

    data() {
        return {
            cariText: '',
            modal: false,
            tahap: '',
            statusSalur: '',
            form: {
                id_tahap:'', nik:'', nama:'', alamat:'', status_salur:'0', lain_nik:'', 
                lain_nama:'',  keterangan: ''
            },
            salur: [],
            ctahap:'',
            loading: false,
            aksiSalur: false,
            indexP: '',
            saluredit: '',
            confirmDialog:{
                open: false,
                action: false,
                msg: '' 
            },
            fotoSalur: false,
            info:{
                tahap: '',
                alokasi_anggaran: '',
                kades_nama: '',
                kades_alamat: '',
                tanggal:''
            },
            
            
        }
    },

    beforeUnmount() {
        this.$refs.closeModal.click()
        // this.toggleBodyClass('.modal-backdrop')
    },

   
    methods: {
       
        
        handleSubmit(){
            
                this.loading = true
                if(this.saluredit){
                    this.salur = JSON.parse(localStorage.getItem('salur'))
                    let i = this.salur.findIndex(s => s.nik === this.penerima[this.indexP].nik)
                    this.salur.splice(i, 1)
                    if(this.salur.push(this.form)){
                        this.simpanSalur()
                        this.$toast.info('Data diperbarui', {
                            position: 'top'
                        })
                        this.loading = false
                        this.$refs.closeModal.click()
                        this.$refs.batal.click()
                        
                    }

                }else{
                    if(localStorage.getItem('salur')){
                        this.salur = JSON.parse(localStorage.getItem('salur'))
                    }
                    
                    if(this.salur.push(this.form)){
                        localStorage.setItem('salur', JSON.stringify(this.salur))
                        this.$toast.success('Data disimpan', {
                            position: 'top'
                        })
                        this.loading = false
                        this.$refs.closeModal.click()
                        this.$refs.batal.click()
                        this.penerima[this.indexP].status_salur = 2

                    }else{
                        this.loading = false
                        this.$toast.error('Gagal menyimpan', {
                            position: 'top'
                        })
                    }
                }
                    
            
        },

        handleClick(i){
            this.indexP = i
            this.fotoSalur = false
            
            if(this.penerima[i].status_salur == 1){
                // this.aksiSalur = true
                return this.$toast.show('Telah disalurkan!', {
                    position: 'top',
                    duration: 1000
                })
            }else{
                this.getSalur()
                if(this.cekStatus(i)){
                    this.aksiSalur = true
                    
                    return this.$toast.warning('Telah diinput Offline !', {
                        position: 'top',
                        duration: 1000
                    })
                }
                this.resetForm()
                this.saluredit = ''
                this.form.nama = this.penerima[i].nama
                this.form.alamat = this.penerima[i].alamat
                this.form.nik = this.penerima[i].nik
                this.$refs.bmodal.click()
            }
            

        },

        async hapusSalur(){
            this.$refs.confirmClose.click()
            this.aksiSalur = false
            if(!localStorage.getItem('salur')){
                return this.$toast.error('Tidak dapat menghapus..',{
                    position:'top',
                    duration: 2000
                })
            }
            this.salur = JSON.parse(localStorage.getItem('salur'))

            // let i = this.salur.map(s => s.nik).indexOf(this.penerima[this.indexP].nik)
            let i = this.salur.findIndex(s => s.nik === this.penerima[this.indexP].nik)
            // console.log(i);
            if(i !== -1){
                if(this.salur.length > 1){
                    this.salur.splice(i,1)
                    this.simpanSalur()
                }else{
                    localStorage.removeItem('salur')
                }

                this.penerima[this.indexP].status_salur = 0

                if(localStorage.getItem('salur-foto')){
                    const foto = JSON.parse(localStorage.getItem('salur-foto'))
                    foto.forEach(async (element, i) => {
                        if(this.penerima[this.indexP].nik === element.nik){
                            const ufoto = JSON.parse(localStorage.getItem('salur-foto'))
                            let cek = ufoto.findIndex(u => u.nik === this.penerima[this.indexP].nik)
                            if(cek !== -1){
                                if(ufoto.length>1){
                                    ufoto.splice(cek, 1)
                                    localStorage.setItem('salur-foto', JSON.stringify(ufoto))
                                }else{
                                    localStorage.removeItem('salur-foto')
                                }
                            }
                            
                        }
                    });
                }
                
                return this.$toast.error('Data dihapus..',{
                        position:'top',
                        duration: 2000
                    })     

            }

            return this.$toast.error('Tidak dapat menghapus..',{
                    position:'top',
                    duration: 2000
                })
        },

        editSalur(){
            this.getSalur()
            console.log(this.saluredit);
            this.aksiSalur = false
            this.resetForm()
            this.form.nama = this.penerima[this.indexP].nama
            this.form.alamat = this.penerima[this.indexP].alamat
            this.form.nik = this.penerima[this.indexP].nik
            this.form.status_salur = this.saluredit.status_salur
            this.form.lain_nik = this.saluredit.lain_nik
            this.form.lain_nama = this.saluredit.lain_nama
            this.form.keterangan = this.saluredit.keterangan
            this.form.id_tahap = this.saluredit.id_tahap
            this.changeTahap()
            
            this.$refs.bmodal.click()
            
        },

        changeTahap(e){
            let t = this.tahap.filter(t => t.id_tahap === this.form.id_tahap)
            if(t.length){
                this.info.tahap = t[0].tahap
                this.info.alokasi_anggaran = t[0].alokasi_anggaran
                this.info.kades_nama = t[0].kades_nama
                this.info.kades_alamat = t[0].kades_alamat
                this.info.tanggal = t[0].tanggal
            }

        },

        resetForm(){
            this.form.id_tahap='' 
            this.form.nik='' 
            this.form.nama='' 
            this.form.alamat='' 
            this.form.status_salur='0' 
            this.form.lain_nik='' 
            this.form.lain_nama='' 
            this.form.keterangan= ''
            this.form.id_salur= ''
            
        },

        getSalur(){

            if(localStorage.getItem('salur')){
                const data = JSON.parse(localStorage.getItem('salur'))
                let result = data.filter(d => d.nik == this.penerima[this.indexP].nik)
                this.saluredit = result[0]
            }

        },

        simpanSalur(){
            localStorage.setItem("salur", JSON.stringify(this.salur))
        },
        ambilSalur(){
            if(localStorage.getItem('salur')){
                return JSON.parse(localStorage.getItem('salur'))
            }else{
                return false
            }
        },


        cekStatus(i){
            let salur = localStorage.getItem('salur')
            if(salur){
                const data = JSON.parse(localStorage.getItem('salur'))
                let res =  data.filter((d) => d.nik === this.penerima[i].nik)
                if(res.length){
                    return true
                    
                }else{
                    return false
                }
            }else{
                return false
            }

            
            
        },


    },
 
    mounted() 
    {

        // this.toggleBodyClass("v--modal");
        //console.log('Mounted');        
        // history.pushState(null, null, document.URL)
        // window.addEventListener('popstate', function () {
        //     // history.pushState(null, null, document.URL)
        //     // close dialog code   
        //     // window.history.back();    
        //     // this.$refs.closeModal.click()
        //     console.log(this);
        // })
    },
   
    

    created() {
        this.tahap = JSON.parse(localStorage.getItem('tahap'))

      

    },
    

    filters: {
        formatDate(value) {
        return new Date(value).toLocaleDateString();
        }
    },

    

    
}
</script>
<style>
    .list-item{
        padding: 8px 15px 8px 15px;
        border-radius:10px;
        background-color: #fff;
        margin-bottom: 8px;
        vertical-align: middle;
    }
    .td-icon{
        text-align: right;
        width: 40px;
        vertical-align: middle;
        color: #999;
    }
    .td-content{
        padding-left: 15px;
        line-height: 130%;
    }

</style>