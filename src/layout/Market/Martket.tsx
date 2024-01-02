import { useState, useEffect, useContext } from "react"
import "./Market.scss"
import { Row, Col, Spin } from "antd"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Data, IContext } from "../../App";

type Props = {}

const greenColor: string = '#84cc16'
const redColor: string = '#ef4444'
const coinsPerPage: number = 10

const convertToLetterPrice = (price: number) => {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (price >= billion) {
        return `${(price / billion).toFixed(3)}B`
    }
    else if (price >= million) {
        return `${(price / million).toFixed(3)}M`
    }
    else if (price >= thousand) {
        return `${(price / thousand).toFixed(3)}K`
    }
}

const Martket = (props: Props) => {
    const { coinList, loading } = useContext(Data) as IContext;

    const [pageNumber, setPageNumber] = useState<number>(1)
    const [secondPage, setSecondPage] = useState<number>(2)
    const [thirdPage, setThirdPage] = useState<number>(3)
    const [forthPage, setForthPage] = useState<number>(4)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [displayCoins, setDisplayCoins] = useState<any>(null)

    useEffect(() => {
        setCurrCoinPage(pageNumber)
        setTotalPage(coinList === null ? 0 : Math.ceil(coinList.length / coinsPerPage))
    }, [coinList])

    const setCurrCoinPage = (page: number) => {
        const startNumber = (page - 1) * coinsPerPage
        let coinsArr = []

        if (coinList !== null) {
            for (let i = startNumber; i < startNumber + 10; i++) {
                coinsArr.push(coinList[i])
            }
        }

        setDisplayCoins(coinsArr)
    }

    const handleChangeNumber = (page: number) => {
        let secondPageLocal = secondPage,
            thirdPageLocal = thirdPage,
            forthPageLocal = forthPage;
        if (page !== pageNumber) {
            setCurrCoinPage(page)


            if (page <= 2 || page >= totalPage - 2) {
                if (page <= 2) {
                    thirdPageLocal = 3
                } else {
                    thirdPageLocal = totalPage - 2
                }
            } else {
                thirdPageLocal = page
            }

            setPageNumber(page)
            setSecondPage(thirdPageLocal - 1)
            setThirdPage(thirdPageLocal)
            setForthPage(thirdPageLocal + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            handleChangeNumber(pageNumber - 1)
        }
    }

    const handleNextPage = () => {
        if (pageNumber < totalPage) {
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

                    {displayCoins === null || displayCoins?.length === 0
                        ?
                        <i className="tryagain">You have sending too many request, Please try again later.</i>
                        :
                        (<>
                            <div className="Body">
                                {
                                    displayCoins?.map((coin: any, i: number) => {
                                        return (
                                            <Row className="Row" key={i}>
                                                <Col span={8} className="rowCell">
                                                    <img src={coin.image} className="image" />
                                                    <Link to={`/${coin.id}`} className="logo">{coin.symbol.toUpperCase()}</Link>
                                                    <Link to={`/${coin.id}`} className="name">{coin.name}</Link>
                                                </Col>
                                                <Col span={5} className="rowCell number">
                                                    <span className="price">${coin.current_price.toLocaleString()}</span>
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

                                {pageNumber > 2 && <li className="dotdotdot">...</li>}

                                <li
                                    className={pageNumber === secondPage ? 'isSelected' : ''}
                                    onClick={() => handleChangeNumber(secondPage)}
                                >
                                    {secondPage}
                                </li>

                                <li className={pageNumber === thirdPage ? 'isSelected' : ''}
                                    onClick={() => handleChangeNumber(thirdPage)}
                                >
                                    {thirdPage}
                                </li>
                                <li
                                    className={pageNumber === forthPage ? 'isSelected' : ''}
                                    onClick={() => handleChangeNumber(forthPage)}
                                >
                                    {forthPage}
                                </li>
                                {pageNumber <= totalPage - 3 && <li className="dotdotdot">...</li>}
                                <li
                                    className={pageNumber === totalPage ? 'isSelected' : ''}
                                    onClick={() => handleChangeNumber(totalPage)}
                                >
                                    {totalPage}
                                </li>
                                <RightOutlined className="icon" onClick={handleNextPage} />
                            </ul>
                        </>)}

                </div>
            </Spin>
        </div>
    )
}

export default Martket