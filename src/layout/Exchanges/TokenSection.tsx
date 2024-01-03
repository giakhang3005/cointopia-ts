import { Col, Row, Modal } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { Data, IContext } from "../../App";
import { useContext } from 'react';
import ModalTokenRow from './ModalTokenRow'

type Props = {
    token: any;
    setToken: (value: any) => void;

    exValue: string;
    setExValue: (value: string) => void;

    setOthersValue: (value: string) => void;
    otherToken: any;
}

const TokenSection = ({ token, setToken, exValue, setExValue, setOthersValue, otherToken }: Props) => {
    const { coinList, loading } = useContext(Data) as IContext;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [displayCoinsList, setDisplayCoinsList] = useState<any>(null)

    const handleValueChange = (newValue: string) => {
        //only number and . is accepted
        const regex = /^[0-9.]*$/;

        //Check if APIs getting token, value match regex
        if (token !== null && otherToken !== null && newValue.match(regex) ) {
            setExValue(newValue)
            setOthersValue(isNaN(parseFloat(newValue)) ? '' : `${parseFloat(newValue) * (token.current_price / otherToken.current_price)}`)
        }
    }

    useEffect(() => {
        if (searchValue === '' || searchValue === null) {
            setDisplayCoinsList(coinList)
        } else {
            let coinsArr = coinList.filter((coin: any) => {
                return coin.symbol.toUpperCase().includes(searchValue.toUpperCase()) || coin.name.toUpperCase().includes(searchValue.toUpperCase()) && coin
            })

            setDisplayCoinsList(coinsArr)
        }
    }, [searchValue, coinList])

    return (
        <>

            <Modal
                title="SELECT TOKEN"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                footer={null}
            >
                <input className='modalSelectTokenInput' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <div className='tokenTableContainer'>
                    {
                        displayCoinsList?.map((coin: any, index: number) => {
                            return (
                                <ModalTokenRow coin={coin} key={index} setToken={setToken} setModal={setIsModalOpen} setValue={setExValue} setOtherValue={setOthersValue} />
                            )
                        })
                    }
                </div>
            </Modal>
            <Col span={4} sm={0} />
            <Col span={20} sm={8} className='tokenContainer'>
                <Row className='selectSection'>
                    <img src={token?.image} className='logo' />
                    <span className="clickSection" onClick={() => setIsModalOpen(true)}>
                        <div className='symbol'>{token ? token?.symbol.toUpperCase() : 'No data'}</div>
                        <CaretDownOutlined className="icon" />
                    </span>
                </Row>
                <Row>
                    <input type="text" className='inputAmount' placeholder='0.0' onChange={(e) => handleValueChange(e.target.value)} value={`${exValue}`} />
                </Row>
                <Row className='currPrice'>
                    Current Price: ${token ? token?.current_price.toLocaleString() : 0}
                </Row>
            </Col>
            {/* <Col span={2} sm={0} /> */}
        </>
    )
}

export default TokenSection