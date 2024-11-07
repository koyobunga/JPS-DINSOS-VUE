<template lang="">
    <div>
        <!-- <router-link :to="{name: 'Kec', params: {kab.id} }"> -->
        <router-link :to="{ name: 'Kec', params: { kab } }">
        <table class="w-100">
                <tr>
                    <td class="td-list">
                        <span>{{ kab.nama }}</span>
                        <i class="bi bi-chevron-right"></i>
                    </td>
                </tr>
            </table>
        </router-link>
    </div>
</template>
<script>
export default {
    props: ['kab'],
    name: 'Tablelist',  
    
}
</script>
<style>
    a {
        text-decoration: none;
    }
    .td-list{
        font-weight: bold;
        background-color: #fff;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 12px 10px 12px 18px;
        border-bottom: 1px solid #ccc;
    }
    .td-list span{
        margin-right: auto;
    }
    .td-list:hover, .td-list:focus{
        background-color: #ccc;
    }   
</style>