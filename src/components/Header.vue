<template>
    <div id="header" class="d-flex bg---vt-c-white-soft fixed-top opacity-75">
        <a  class="btn py-3" @click="$router.go(-1)">
            <div><i class="bi bi-chevron-left"></i></div>
        </a>
        <div class="py-3 fw-bold fs-6 px-2">Title Page</div>
        <!-- <a class="btn ms-auto py-3 pe-3"><i class="bi bi-gear"></i></a> -->
    </div>
    <div class="clear-fix"></div>
    <div class="mb-5"></div>
</template>
<script>
export default {
    name: 'Header',
   
}
</script>
