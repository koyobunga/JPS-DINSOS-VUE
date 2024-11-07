<template lang="">
    <div>
       
        {{ msg }}
    </div>
</template>
<script>
export default {
    name: 'Kec',
    props: ['msg'],
    data() {
        return {
        }
    },
    mounted() {
        console.log("Kabu "+ this.msg);
    },
}
</script>
<style lang="">
    
</style>