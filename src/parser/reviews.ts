var scraper = require('app-store-scraper')
import config from '../config.json'

export const parse = async() => {
    return scraper.reviews({
        appId: config.appID,
        country: config.country,
        sort: scraper.sort.RECENT, 
        page: 1 
    })
}