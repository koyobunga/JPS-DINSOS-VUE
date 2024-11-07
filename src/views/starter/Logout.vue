<template lang="">
    <div>
        
    </div>
</template>
<script>
import axios from 'axios';
import url from '../../api/url';
export default {

    name: 'Logout',
    beforeCreate(){
        axios
            .get(`${url}auth/logout`)
            .then((res) => {
                localStorage.removeItem('token')
                localStorage.removeItem('kpm')
                this.$router.push({path: '/'})
            }).catch((err) => {
                this.$router.back()
                this.$toast.error('Gagal logout', {
                    position: 'top'
                })
            })
    }
}
</script>
<style lang="">
    
</style>