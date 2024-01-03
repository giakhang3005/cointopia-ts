import { Col, Row } from 'antd'
import { RightOutlined } from '@ant-design/icons'

type Props = {
    coin: any
    setToken: (value: any) => void
    setModal: (value: any) => void

    setValue: (value: string) => void
    setOtherValue: (value: string) => void
}

const ModalTokenRow = ({ coin, setToken, setModal, setValue, setOtherValue }: Props) => {
    const handleClick = () => {
        setToken(coin)
        setModal(false)

        setValue('')
        setOtherValue('')
    }
    return (
        <Row className='row' onClick={handleClick}>
            <Col span={12} className='infoContainer'>
                <img src={coin.image} className='logo' />
                <div className='info'>
                    <div className="symbol">{coin.symbol.toUpperCase()}</div>
                    <div className="name">{coin.name}</div>
                </div>
            </Col>
            <Col span={6}>
                ${coin.current_price.toLocaleString()}
            </Col>
            <Col span={6} className='arrow'>
                <RightOutlined />
            </Col>
        </Row>
    )
}

export default ModalTokenRow