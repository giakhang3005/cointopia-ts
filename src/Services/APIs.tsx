import axios from "axios"
import { message } from "antd"

const endPoint = 'https://api.coingecko.com/api/v3'
const marketCap = 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false&locale=en'
const volume = 'coins/markets?vs_currency=usd&order=volume_desc&per_page=3&page=1&sparkline=false&price_change_percentage=24h&locale=en'
const newest = 'coins/markets?vs_currency=usd&order=id_asc&per_page=3&page=1&sparkline=false&price_change_percentage=24h&locale=en'

//get top market cap
export const getTopMarketCap = (setTopCoins: (value: any) => void, topType: string) => {
    let apisString = endPoint
    switch (topType) {
        case 'marketCap':
            apisString += `/${marketCap}`
            break;
        case 'volume':
            apisString += `/${volume}`
            break;
        case 'newest':
            apisString += `/${newest}`
            break;
        default:
            break;
    }

    axios.get(`${apisString}`)
        .then(res => {
            setTopCoins(res.data)
        })
        .catch(err => {
            console.log(err)
            // message.error('You have sending too many requests, please try again in 5 minutes.')
        })
}

//get top market cap
export const getTrendingCoins = (setTopCoins: (value: any) => void) => {

    axios.get(`${endPoint}/search/trending`)
        .then(res => {
            const receiveCoins = res.data.coins
            let top3Coins = [receiveCoins[0], receiveCoins[1], receiveCoins[3]]
            setTopCoins(top3Coins)
        })
        .catch(err => {
            console.log(err)
            // message.error('You have sending too many requests, please try again in 5 minutes.')
        })
}

export const getMarket = (setTopCoins: (value: any) => void, setLoading: (value: any) => void) => {
    setLoading(true)
    axios.get(`${endPoint}/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&locale=en`)
        .then(res => {
            setTopCoins(res.data)
        })
        .catch(err => {
            console.log(err)
            // message.error('You have sending too many requests, please try again in 5 minutes.')
        })
        .finally(() => setLoading(false))
}

export const getCoinInfo = (coinId: string, setCoinInfo: (value: any) => void, setLoading: (value: any) => void) => {
    setLoading(true)
    axios.get(`${endPoint}/coins/${coinId}`)
        .then(res => {
            setCoinInfo(res.data)
        })
        .catch(err => {
            console.log(err)
            message.error('You have sending too many requests, please try again in 5 minutes.')
        })
        .finally(() => setLoading(false))
}

export const getChartData = (coinId: string, setChartData: (value: any) => void) => {
    axios.get(`${endPoint}/coins/${coinId}/market_chart?vs_currency=usd&days=14&interval=daily`)
        .then(res => {
            setChartData(res.data)
        })
        .catch(err => {
            console.log(err)
            message.error('You have sending too many requests, please try again in 5 minutes.')
        })
}
