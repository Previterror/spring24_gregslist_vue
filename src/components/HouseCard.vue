<script setup>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

defineProps({
    house: House
})

async function condemnHouse(houseId) {
    try {
        const confirmCondemn = await Pop.confirm("Please verify condemnation.")

        if (!confirmCondemn) return

        await housesService.condemnHouse(houseId)

    } catch (error) {
        Pop.toast('Could not condemn', houseId)
        logger.error(error)
    }
}

</script>


<template>
    <div class="bg-success rounded shadow d-flex">
        <img :src="house.imgUrl" :alt="house.description" class="img-fluid house-img rounded-start">
        <div class="p-3">
            <h2 class="fs-4">{{ house.year }}, {{ house.bedrooms }} Bedrooms, {{ house.bathrooms }} Bath</h2>
            <h3 class="fs-5">${{ house.price.toLocaleString() }}</h3>
            <p>Listed on {{ house.createdAt.toLocaleDateString() }} by {{ house.creator.name }}</p>
            <p>{{ house.description }}</p>
            <button class="btn btn-outline-danger" :title="`Condemn this house ${house.description}`"
                @click="condemnHouse(house.id)">
                <i class="mdi mdi-home-remove"></i>
            </button>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.house-img {
    width: 40%;
    height: 40vh;
    object-fit: cover;
}
</style>