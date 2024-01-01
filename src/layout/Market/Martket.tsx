import { useState, useEffect } from "react"
import "./Market.scss"
import { Row, Col, Spin } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getMarket } from "../../Services/APIs";

type Props = {}

const greenColor: string = '#84cc16'
const redColor: string = '#ef4444'
const coinsPerPage: number = 10

const convertToLetterPrice = (price: number) => {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (price >= 10 * billion) {
        return `${(price / billion).toFixed(3)}B`
    }
    else if (price >= 10 * million) {
        return `${(price / million).toFixed(3)}B`
    }
    else if (price >= 10 * thousand) {
        return `${(price / thousand).toFixed(3)}K`
    }
}

const Martket = (props: Props) => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [coins, setCoins] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getMarket(setCoins, setLoading, coinsPerPage, pageNumber)
    }, [pageNumber])

    const handleChangeNumber = (page: number) => {
        if (page !== pageNumber) {
            setPageNumber(page)
        }
    }

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            handleChangeNumber(pageNumber - 1)
        }
    }

    const handleNextPage = () => {
        if (pageNumber < 5) {
            handleChangeNumber(pageNumber + 1)
        }
    }

    return (
        <div id="market">
            <div className="blocked"></div>
            <div className="title">Market</div>
            <Spin size="large" spinning={loading}>
                {/* Table */}
                <div className="tableContainer">

                    <Row className="Title">
                        <Col span={8} className="cell">Coin</Col>
                        <Col span={5} className="cell number">Price</Col>
                        <Col span={5} className="cell number">Changes (24h)</Col>
                        <Col span={6} className="cell number">Market Cap</Col>
                    </Row>


                    <div className="Body">
                        {
                            coins?.map((coin: any, i: number) => {
                                return (
                                    <Row className="Row" key={i}>
                                        <Col span={8} className="rowCell">
                                            <img src={coin.image} className="image" />
                                            <span className="logo">{coin.symbol.toUpperCase()}</span>
                                            <span className="name">{coin.name}</span>
                                        </Col>
                                        <Col span={5} className="rowCell number">
                                            <span className="price">${coin.current_price}</span>
                                        </Col>
                                        <Col span={5} className="rowCell number" style={{ color: coin.price_change_percentage_24h < 0 ? redColor : greenColor }}>
                                            <span className="changes">{coin.price_change_percentage_24h.toFixed(3)}%</span>
                                        </Col>
                                        <Col span={6} className="rowCell">
                                            <span className="marketCap">
                                                ${convertToLetterPrice(coin.market_cap)}
                                            </span>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>

                    <ul className="pagnition">
                        <LeftOutlined className="icon" onClick={handlePreviousPage} />
                        <li className={pageNumber === 1 ? 'isSelected' : ''} onClick={() => handleChangeNumber(1)}>1</li>
                        <li className={pageNumber === 2 ? 'isSelected' : ''} onClick={() => handleChangeNumber(2)}>2</li>
                        <li className={pageNumber === 3 ? 'isSelected' : ''} onClick={() => handleChangeNumber(3)}>3</li>
                        <li className={pageNumber === 4 ? 'isSelected' : ''} onClick={() => handleChangeNumber(4)}>4</li>
                        <li className={pageNumber === 5 ? 'isSelected' : ''} onClick={() => handleChangeNumber(5)}>5</li>
                        <RightOutlined className="icon" onClick={handleNextPage} />
                    </ul>

                </div>
            </Spin>
        </div>
    )
}

export default Martket