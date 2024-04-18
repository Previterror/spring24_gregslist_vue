<script setup>
import { computed, onMounted } from 'vue';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import HouseCard from '../components/HouseCard.vue';
import { logger } from '../utils/Logger.js';

const houses = computed(() => AppState.houses)
const account = computed(() => AppState.account)

async function getHouses() {
  try {
    await housesService.getHouses()
  } catch (error) {
    Pop.toast('Could not get Houses', 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getHouses()
})


</script>


<template>
  <section class="container">


    <section class="row">
      <div class="col-12 mt-3 d-flex align-items-center gap-4">
        <h1>Houses</h1>
        <button v-if="!account" type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
          data-bs-target="#houseModal" title="List a House">
          <i class="mdi mdi-home-plus"></i>
        </button>
      </div>
    </section>

    <section class="row">
      <div v-for="house in houses" :key="house.id" class="col-12 mb-3">
        <HouseCard :house="house" />
      </div>
    </section>


    <HouseFormModal />
  </section>
</template>


<style scoped></style>