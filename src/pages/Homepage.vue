<script setup>
import { ref } from 'vue';

const message = ref("Benvenuto nel Pokédex!");
</script>

<template>
    <div class="content">

        <div class="container mt-4">
            <div class="row py-5">
                <div class="col-12 col-md-4 mb-4" v-for="n in 6" :key="n">
                    <div class="card h-100">
                    <img src="https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeNzg-kMHhUBP4AmHnLsrPYzxKHVceLnkwtLhxZlDssj7KjhStloJR6px7EbquZ83uDcygnWkekxysvuNYVzLQ3GyBMRl2PpU7pO.jpg?r=db8" class="card-img-top" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title"> GENERAZIONE {{ n }}</h5>
                    </div>
                    </div>
                </div>
            </div>
        </div>


        

    </div>
</template>

<style lang="scss" scoped>

.content{
    background-image: url('https://i.pinimg.com/564x/6f/d9/e6/6fd9e6a4bcb5676aaf34c2db9a110ee7.jpg');
    background-size: contain;


}

</style>