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
                    <div class="col-6 p-1" v-for="(item, index) in dataFoto" :key="index">    
                        <img :src="`https://e-jps.gorontaloprov.go.id/arsip/foto/${item.foto}`" alt="" class="preview">
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
import url from '../api/url';
export default {
    props: ['salur'],

    data() {
        return {
            imageData: '',
            base64: '',
            loading: false,
            form: {
                id_salur: '',
                foto: ''
            },
            dataFoto: ''

        }
    },
    mounted() {
        this.$refs.modalGambar.click()        
        this.getSalurfoto()
    },
    beforeUnmount() {
        this.$refs.closeModal.click()
        // this.toggleBodyClass('.modal-backdrop')
    },

    methods: {
        hapusFoto(id_foto){
            let token = JSON.parse(localStorage.getItem('token'));
            axios
                .delete(`${url}salur-foto`, {
                    params:{ id_foto: id_foto},
                    headers: {
                            'Accept':'application/json',
                            'Authorization': 'Bearer ' + token.token
                        }
                })
                .then((res) => {
                    this.getSalurfoto()
                    return this.$toast.warning('Data dihapus..', {
                        position: 'top',
                        duration: 1000
                    })
                })
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
                    // localStorage.setItem('foto', JSON.stringify(this.base64))
                }
                
            }
        },
        uploadImage(e){
            
            console.log(this.salur.id_salur);
            this.loading=true
            this.form.id_salur = this.salur.id_salur
            this.form.foto = this.base64
            let token = JSON.parse(localStorage.getItem('token'));
            
            axios
                    .post(`${url}salur-foto/insert`, this.form, {
                        headers: {
                            'Accept':'application/json',
                            'Authorization': 'Bearer ' + token.token
                        }
                    })
                    .then((res) => {
                        this.loading = false
                        this.getSalurfoto()
                        this.imageData = ''
                        this.$toast.success('Foto disimpan', {
                            position: 'top'
                        })
                        e.target.reset()
                    })
        },
         getSalurfoto(){
            axios
            .get(`${url}salur-foto/data`, {
                params: {id_salur: this.salur.id_salur}
            })
            .then((res) => {
                this.dataFoto = res.data.records.reverse('id_foto')
                console.log(this.dataFoto);
            })
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