import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService {
    async condemnHouse(houseId) {
        logger.log('Condemning🔧', houseId)
        const response = await api.delete(`api/houses/${houseId}`)
    }
    async getHouses() {
        const response = await api.get('api/houses')
        logger.log('Houses get', response.data)
        let houses = response.data.map(house => new House(house))
        AppState.houses = houses
        logger.log('Houses state', AppState.houses)
    }

}

export const housesService = new HousesService