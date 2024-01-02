import { useState, useContext, useEffect } from 'react'
import "./Exchanges.scss"
import { Data, IContext } from "../../App";
import { Row, Col } from 'antd'
import { ArrowRightOutlined, WalletFilled, ArrowDownOutlined } from '@ant-design/icons'
import TokenSection from './TokenSection';

type Props = {}

const Exchanges = (props: Props) => {
    const { coinList, loading } = useContext(Data) as IContext;
    const [firstToken, setFirstToken] = useState<any>(null)
    const [secondToken, setSecondToken] = useState<any>(null)
    const [firstValue, setFirstValue] = useState<number>(0.0)
    const [secondValue, setSecondValue] = useState<number>(0.0)

    useEffect(() => {
        if (coinList !== null) {
            setFirstToken(coinList[0])
            setSecondToken(coinList[1])
        }
    }, [coinList])

    return (
        <div id="exchanges">
            <div className='blocked'></div>
            <div className="title">Exchanges</div>

            <Row className='exchangeContainer'>
                <Col span={0} sm={2}></Col>
                <TokenSection token={firstToken} setToken={setFirstToken} exValue={firstValue} setExValue={setFirstValue} setOthersValue={setSecondValue} otherToken={secondToken} />

                <Col span={24} sm={4} className='middleChangeContainer'>
                    <ArrowRightOutlined className='icon' />
                    <div className="connectWallet">
                        <WalletFilled className='icon' />
                        <div className="callToAction">Connect Wallet</div>
                    </div>
                </Col>

                <Col span={24} sm={4} className='middleChangeContainerMobile'>
                    <ArrowDownOutlined className='icon' />
                </Col>

                <TokenSection token={secondToken} setToken={setSecondToken} exValue={secondValue} setExValue={setSecondValue} setOthersValue={setFirstValue} otherToken={firstToken} />
                
                <Col span={0} sm={2}></Col>
            </Row>
            <Row>
                <Col span={4} sm={0} />
                <Col span={16} sm={0}>
                    <div className="connectWallet">
                        <WalletFilled className='icon' />
                        <div className="callToAction">Connect Wallet</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Exchanges