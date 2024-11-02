<script setup>
import { ref } from 'vue';

const message = ref("Benvenuto nel Pokédex!");
</script>



<template>

    <div class="content">

        <div class="container-fluid">
            <div class="row">
                <div class="col-9">
                    <div class="row">
                        <div class="block col-6 bg-danger"></div>
                        <div class="block col-6 bg-warning"></div>
                    </div>
                    <div class="row">
                        <div class="block col-3 bg-warning"></div>
                        <div class="block col-6 bg-primary"></div>
                        <div class="block col-3 bg-danger"></div>
                    </div>
                </div>
                <div class="col-3 bg-info"></div>
            </div>
        </div>


    </div>
</template>


<style lang="scss" scoped>

.content{
    background: url('../assets/background-nobg.png') repeat 0 0;
    animation: animate-bg 20s infinite linear;


    .block{
        height: 300px;
    }

    

    
    @keyframes animate-bg{
        100%{
            background-position: 100px 100px;
        }
    }
}
</style>