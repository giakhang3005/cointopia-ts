import { useState, useEffect } from "react"
import { Row, Col } from "antd"
import axios from "axios"
import { CaretUpFilled, CaretRightOutlined, CaretDownFilled } from '@ant-design/icons'
import { getTopMarketCap } from "../../Services/APIs"


type Props = {}
const greenColor: string = '#84cc16'
const redColor: string = '#ef4444'

interface ICoinCard {
    img: string;
    symbol: string;
    price: number;
    priceChanged: number;
}

// DISPLAY FOR EACH COIN
const CoinCard = ({ img, symbol, price, priceChanged }: ICoinCard) => {
    return (
        <div className="coinContainer">
            <span>
                <img src={img} className="logo" />
                <div className="symbol">{symbol.toUpperCase()} </div>
            </span>
            <div className="price">${price > 1000 ? price.toFixed(1).toLocaleString() : price.toFixed(4).toLocaleString()}</div>
            <div className="priceChanged"
                style={{ color: priceChanged <= 0 ? redColor : greenColor }}>
                {priceChanged <= 0 ? <CaretDownFilled className="priceChangedIcon" /> : <CaretUpFilled className="priceChangedIcon upIcon" />}
                {priceChanged.toFixed(2)}%
            </div>
        </div>
    )
}

// TOP MARKET CAP
export const TopMarketCap = (props: Props) => {
    const [topCoins, setTopCoins] = useState<any>(null)

    useEffect(() => {
        getTopMarketCap(setTopCoins, 'marketCap')
    }, [])

    return (
        <Col span={17} sm={11} md={7} className="coinsSection">
            <div className="coinTitle">Market Cap
                <a className="viewmore" href="#market">View more <CaretRightOutlined className="viewMoreIcon" /></a>
            </div>

            {
                topCoins === null && (
                    <i className="noData">Please try again later</i>
                )
            }

            {
                topCoins?.map((coin: any, i: number) => {
                    return (
                        <CoinCard
                            img={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            priceChanged={coin.price_change_percentage_24h} />
                    )
                })
            }
        </Col>
    )
}

// TOP NEWEST TOKEN
export const TopNewToken = (props: Props) => {
    const [topCoins, setTopCoins] = useState<any>(null)

    useEffect(() => {
        getTopMarketCap(setTopCoins, 'newest')
    }, [])

    return (
        <Col span={17} sm={11} md={7} className="coinsSection">
            <div className="coinTitle">Newest Token
                <a className="viewmore" href="#market">View more <CaretRightOutlined className="viewMoreIcon" /></a>
            </div>

            {
                topCoins === null && (
                    <i className="noData">Please try again later</i>
                )
            }

            {
                topCoins?.map((coin: any, i: number) => {
                    return (
                        <CoinCard
                            img={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            priceChanged={coin.price_change_percentage_24h} />
                    )
                })
            }
        </Col>
    )
}

// TOP VOLUME
export const TopVolume = (props: Props) => {
    const [topCoins, setTopCoins] = useState<any>(null)

    useEffect(() => {
        getTopMarketCap(setTopCoins, 'volume')
    }, [])

    return (
        <Col span={17} sm={11} md={7} className="coinsSection">
            <div className="coinTitle">Trading Volume
                <a className="viewmore" href="#market">View more <CaretRightOutlined className="viewMoreIcon" /></a>
            </div>

            {
                topCoins === null && (
                    <i className="noData">Please try again later</i>
                )
            }

            {
                topCoins?.map((coin: any, i: number) => {
                    return (
                        <CoinCard
                            img={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            priceChanged={coin.price_change_percentage_24h} />
                    )
                })
            }
        </Col>
    )
}