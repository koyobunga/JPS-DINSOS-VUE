<template lang="">
    <div>
                    <!-- Button trigger modal -->
        <button type="button" ref="modalGambar" hidden class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gambarModal">
        Launch demo modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="gambarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header py-3" style="background-color:#5398d8">
                <h5 class="modal-title fs-6 text-white" id="exampleModalLabel">Unggah foto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post" @submit.prevent="uploadImage" enctype='multipart/form-data'>

                    <div class="input-group">
                        <input required type="file" @change="previewImage"  accept="image/png, image/jpeg" class="form-control fs-8" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                        <button v-if="!loading" class="btn fs-9 btn-outline-primary" type="submit" id="inputGroupFileAddon04">UPLOAD</button>
                        <button v-if="loading" class="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon04">
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                <span class="ms-2">Loading...</span>
                        </button>
                    </div>
                </form>
                <div class="image-preview mt-0 mb-3" v-if="imageData.length > 0">
                    <img class="preview" :src="imageData">
                </div>
                
                <div class="fs-8 mb-0 color-1 mt-3 fw-bold">
                    {{ salur.nama }}
                </div>
                <div class="fs-9 mt-0">
                    {{ salur.alamat }}
                </div>
                <hr class="mb-1 mt-2">
                <div class="row">
                    <div class="col-6 p-1" v-for="(item, index) in tampilfoto" :key="index">    
                        <img :src="`data:image/jpg;base64,${item.foto}`" alt="" class="preview">
                        <button @click="hapusFoto(item.id_foto)" style="margin-top:-40px" class="btn me-2 shadow-sm z-index-100 position-relative btn-warning btn-sm float-end"><i class="bi bi-trash "></i></button>                    
                    </div>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary shadow px-5" ref="closeModal" data-bs-dismiss="modal"> Tutup </button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import url
 from '../api/url';
export default {
    props: ['salur'],

    data() {
        return {
            imageData: '',
            base64: '',
            loading: false,
            form: {
                nik: '',
                id_tahap: '',
                id_kpm: '',
                id_foto: '',
                foto: '',
            },
            dataFoto: [], 
            kpm: '',
            tampilfoto: ''

        }
    },
    beforeUnmount() {
        this.$refs.closeModal.click()
        // this.toggleBodyClass('.modal-backdrop')
    },
    mounted() {
        this.sortFoto()
        this.$refs.modalGambar.click()        
        this.kpm = JSON.parse(localStorage.getItem('kpm'))
    },
    methods: {
        hapusFoto(id){
            let i = this.dataFoto.findIndex(d => d.id_foto === id)
            if(this.dataFoto.splice(i,1)){
                if(this.dataFoto.length){
                    localStorage.setItem('salur-foto', JSON.stringify(this.dataFoto))
                }else{
                    localStorage.removeItem('salur-foto')
                }
                this.sortFoto()
                return  this.$toast.warning('Gambar dihapus..',{
                    position: 'top',
                    duration: 2000
                })
            }
        }, 

        previewImage(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                    const b = this.imageData.split(",");
                    this.base64 = b[1]      
                }
                
            }
        },
        uploadImage(e){
            
            console.log(this.salur.id_salur);
            this.loading=true
            this.form.nik = this.salur.nik
            this.form.id_tahap = this.salur.id_tahap
            this.form.id_kpm = this.kpm.id_kpm
            this.form.foto = this.base64
            this.imageData = ''
                if(localStorage.getItem('salur-foto')){
                    this.sortFoto()
                    let x = this.dataFoto.reverse('id_foto')
                    this.form.id_foto = x[0].id_foto + 1
                }else{
                    this.form.id_foto = 1
                    this.dataFoto = []
                }
                if(this.dataFoto.push(this.form)){
                    localStorage.setItem('salur-foto', JSON.stringify(this.dataFoto))
                    this.loading=false
                    e.target.reset()
                    this.sortFoto()
                    return  this.$toast.success('Gambar disimpan..',{
                        position: 'top',
                        duration: 2000
                    })
                }else{
                    this.loading=false
                    e.target.reset()
                    return  this.$toast.success('Gagal upload gambar..',{
                        position: 'top',
                        duration: 2000
                    })
                }
                
            
        },
         sortFoto(){
            if(localStorage.getItem('salur-foto')){
                this.dataFoto = JSON.parse(localStorage.getItem('salur-foto'))
                let data = JSON.parse(localStorage.getItem('salur-foto'))
                let dfilter = data.filter(d => d.nik == this.salur.nik)
                
                this.tampilfoto = dfilter
            }
         }
    },
}
</script>
<style>
    .preview {
        border-radius: 10px;
        
        width: 100%;
        background-color: white;
        border: 1px solid #DDD;
        padding: 3px;
    }

</style>