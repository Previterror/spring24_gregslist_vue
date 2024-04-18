<script setup>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';

const editableHouseData = ref({
    price: 0,
    year: 0,
    bedrooms: 0,
    bathrooms: 0,
    levels: 0,
    imgUrl: '',
    description: ''
})

async function listHouse() {
    try {
        logger.log('Creating listing!', editableHouseData)
        await housesService.listHouse(editableHouseData.value)

        editableHouseData.value = {
            price: 0,
            year: 0,
            bedrooms: 0,
            bathrooms: 0,
            levels: 0,
            imgUrl: '',
            description: ''
        }
        Modal.getOrCreateInstance('#houseModal').hide()
    } catch (error) {
        Pop.toast('Cannot list house', 'error')
        logger.error(error)
    }

}


</script>


<template>
    <div class="modal fade" id="houseModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">List a House</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="listHouse()" class="row justify-content-between">
                        <div class="form-floating mb-3 col-md-4 px-1">
                            <input v-model="editableHouseData.price" type="number" class="form-control" id="housePrice"
                                placeholder="1" required>
                            <label for="housePrice">Price</label>
                        </div>
                        <div class="form-floating mb-3 col-md-4 px-1">
                            <input v-model="editableHouseData.year" type=" number" class="form-control" id="houseYear"
                                placeholder="Year" required>
                            <label for="houseYear">Year Built</label>
                        </div>
                        <div class="form-floating mb-3 col-md-4 px-1">
                            <input v-model="editableHouseData.bedrooms" type="number" class="form-control"
                                id="houseBedrooms" placeholder="1" required>
                            <label for="houseBedrooms">Bedrooms</label>
                        </div>
                        <div class="form-floating mb-3 col-md-4 px-1">
                            <input v-model="editableHouseData.bathrooms" type="number" class="form-control"
                                id="houseBathrooms" placeholder="1" required>
                            <label for="houseBathrooms">Bathrooms</label>
                        </div>
                        <div class="form-floating mb-3 col-md-4 px-1">
                            <input v-model="editableHouseData.levels" type="number" class="form-control"
                                id="houseLevels" placeholder="1" required>
                            <label for="houseLevels">Levels</label>
                        </div>
                        <div class="form-floating mb-3 col-md-6 px-1">
                            <input v-model="editableHouseData.imgUrl" type="text" class="form-control" id="houseImage"
                                placeholder="1" maxlength="500">
                            <label for="houseImage">Image URL</label>
                        </div>
                        <div class="form-floating mb-3 col-md-11 px-1">
                            <input v-model="editableHouseData.description" type=" text" class="form-control"
                                id="houseDesc" placeholder="1" maxlength="5000">
                            <label for="houseDesc">Description</label>
                        </div>
                        <div class="col-2 text-end">
                            <button type="submit" class="btn btn-primary">Save Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>