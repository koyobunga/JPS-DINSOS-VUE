<template lang="">
    <div class="pt-5 mt-5"></div>
    <div class="div-menu bg-white shadow d-lg-none px-3 text-center fixed-bottom z-index-99">
        <div class="row">
            <div class="col">
                <RouterLink to="/home" class="menu">
                    <i class="bi bi-house"></i>
                    <div >Home</div>
                </RouterLink> 
            </div>
            <!-- <div class="col">
                <RouterLink to="/info" class="menu">
                        <i class="bi bi-check-circle"></i>
                        <div>Disalurkan</div>
                </RouterLink> 
            </div> -->
         
            <div class="col">
                <RouterLink to="/opsi" class="menu">
                    <i class="bi bi-gear"></i>
                    <div >Opsi</div>
                </RouterLink> 
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'Menu'
}
</script>
<style lang="">
    
</style>