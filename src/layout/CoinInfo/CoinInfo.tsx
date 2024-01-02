import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getCoinInfo } from '../../Services/APIs';
import { Row, Col, Spin } from 'antd'
import "./CoinInfo.scss"

type Props = {}
const greenColor: string = '#84cc16'
const redColor: string = '#ef4444'

const CoinInfo = (props: Props) => {
    const [coinInfo, setCoinInfo] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    //get path
    const parameter = useParams();
    const coinId: any = parameter.coinId

    useEffect(() => {
        getCoinInfo(coinId, setCoinInfo, setLoading)
    }, [])

    return (
        <div className='coinInfo'>
            <Spin spinning={loading}>
                <Row style={{ width: '100%' }}>
                    <Col span={0} sm={2}></Col>
                    <Col span={24} sm={22} style={{ width: '100%' }}>
                        <Row>
                            <Col span={24} sm={6} className='imageContainer'>
                                <img src={coinInfo?.image.large} className='icon' />
                                <div className='name'>{coinInfo?.name}</div>
                                <div className='rank'>Rank: <span>#{coinInfo?.market_cap_rank}</span></div>
                            </Col>
                            <Col span={0} sm={2}></Col>
                            <Col span={24} sm={16}>
                                <Row>
                                    <Col span={12} sm={8} className='changes'>
                                        24h Change: <span style={{ color: coinInfo?.market_data.price_change_percentage_24h > 0 ? greenColor : redColor }}>{coinInfo?.market_data.price_change_percentage_24h.toFixed(3)}%</span>
                                    </Col>
                                    <Col span={12} sm={8} className='price'>
                                        Price: <span style={{ color: coinInfo?.market_data.price_change_percentage_24h > 0 ? greenColor : redColor }}>${coinInfo?.market_data.current_price.usd.toLocaleString()}</span>
                                    </Col>
                                    <Col span={24} sm={8} className='coinSymbol'>
                                        Symbol: {coinInfo?.symbol.toUpperCase()}
                                    </Col>
                                </Row>
                                <Row>
                                    <div dangerouslySetInnerHTML={{ __html: coinInfo?.description.en }} className='description'></div>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                    {/* <Col sm={1}></Col> */}
                </Row>
            </Spin>
        </div>
    )
}

export default CoinInfo