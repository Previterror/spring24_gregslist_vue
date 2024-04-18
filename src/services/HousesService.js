import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {
    async listHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        const newHouse = new House(response.data)
        AppState.houses.unshift(newHouse)
    }

    async condemnHouse(houseId) {
        logger.log('Condemning🔧', houseId)
        const response = await api.delete(`api/houses/${houseId}`)
        logger.log('House deleted', response.data)
        const houses = AppState.houses
        const houseIndex = houses.findIndex(house => house.id == houseId)
        if (houseIndex == -1) throw new Error('House index no find')
        houses.splice(houseIndex, 1)
    }

    async getHouses() {
        const response = await api.get('api/houses')
        // logger.log('Houses get', response.data)
        response.data.reverse()
        let houses = response.data.map(house => new House(house))
        AppState.houses = houses
        // logger.log('Houses state', AppState.houses)
    }

}

export const housesService = new HousesService