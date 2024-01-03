import { useState } from 'react'
import { DemoWalletData } from './DemoWalletData'
import { Row, Col, message } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Data, IContext } from "../../App";
import { useContext } from 'react';
import { checkLocalData } from './ExchangeLocalStrFunc';

const greenColor: string = '#84cc16'
const redColor: string = '#ef4444'

type Props = {
  setConnectedWalletData: (value: any) => void
  setTransactionHistory: (value: any) => void
  connectedWalletData: any
  transactionHistory: any
}

const checkDecialPlaces = (value: number) => {
  if (value < 1 / (10 * 10)) {
    return value.toFixed(18)
  } else if (value < 1 / (10 * 5)) {
    return value.toFixed(10)
  } else if (value < 1 / (10 * 2)) {
    return value.toFixed(5)
  } else {
    return value.toFixed(3)
  }
}

const ConnectWalletModal = ({ setConnectedWalletData, connectedWalletData, transactionHistory, setTransactionHistory }: Props) => {
  const { coinList, loading } = useContext(Data) as IContext;
  const [inputAddr, setInputAddr] = useState<string>('')
  const [inputSKey, setInputSKey] = useState<string>('')
  const [err, setErr] = useState<boolean>(false)
  const [isViewingAssets, setIsViewingAssets] = useState<boolean>(true)

  const handleConnect = () => {
    if (inputAddr === DemoWalletData.address && inputSKey === DemoWalletData.secretKey) {
      message.success('Connected successfully')

      const checkWallet = checkLocalData("wallet")
      setConnectedWalletData(checkWallet === null ? DemoWalletData : checkWallet)
      setTransactionHistory(checkWallet === null ? [] : checkLocalData("history"))

      setInputAddr('')
      setInputSKey('')
      setErr(false)
    } else {
      setErr(true)
    }
  }

  const handleDisconnect = () => {
    setConnectedWalletData(null)
    message.success('Disconnected successfully')
  }

  return (
    <>
      {connectedWalletData === null ?
        //! User not connect wallet
        (<div className='connectWalletContainer'>
          {/* Connect wallet main section */}
          <Row className="connectWalletForm">
            {/* Address */}
            <Col span={5} className='inputTitle'>Address:</Col>
            <Col span={19}><input className='inputBox' type="text" value={inputAddr} onChange={(e) => setInputAddr(e.target.value)} /></Col>
          </Row>
          {/* Secret Key */}
          <Row className="connectWalletForm">
            <Col span={5} className='inputTitle'>Secret Key:</Col>
            <Col span={19}><input className='inputBox' type="text" value={inputSKey} onChange={(e) => setInputSKey(e.target.value)} /></Col>
          </Row>
          {/* Error message */}
          {err && <Row >
            <Col span={5}></Col>
            <Col span={19} className='errNoti'> Invalid Address or Secret Key</Col>
          </Row>}
          <Row>
            <button className='confirmConnectBtn' onClick={handleConnect}>Connect</button>
          </Row>
          <Row>
            <div className="note" style={{ marginBottom: '6px' }}>1. Cointopia does not provide any API calling to connect your wallet so you need to fill demo wallet address & key to test</div>
            <div className="note" style={{ marginTop: 0 }}>2. Cointopia will save your test wallet & transactions history to your browser, you can access it any time by connect demo wallet again</div>
          </Row>

          {/* Demo wallet info */}
          <div className="demoWalletInfo">
            <div className='title'>Demo Wallet:</div>
            <div className="address"><b>Address:</b> {DemoWalletData.address}</div>
            <div className="secretKey"><b>SecretKey:</b> {DemoWalletData.secretKey}</div>
          </div>
        </div>
        ) :

        //! User  have connected wallet
        <div>
          <div className='tokenTableContainer'>
            {/* Wallet address */}
            <Row className='WallAddrContainer'>
              Wallet: <div className='WallAddr'>{connectedWalletData.address}</div>
            </Row>
            {/* Show all assets in wallet */}
            <div className='assetsTokenContainer'>
              {
                isViewingAssets
                  ?
                  // Show all assets in the wallet
                  connectedWalletData.assets.map((coin: any, index: number) => {
                    return (
                      <>
                        <Row className='row'>
                          <Col span={10} className='infoContainer'>
                            {/* <img src={coin.image} className='logo' /> */}
                            <div className='info'>
                              <div className="symbol" style={{ fontSize: '17px' }}>{coin.symbol.toUpperCase()}</div>
                              <div className="name" style={{ fontSize: '11px' }}>{coin.name}</div>
                            </div>
                          </Col>
                          <Col span={3}>

                          </Col>
                          <Col span={11} className='arrow' style={{ fontSize: '15px' }}>
                            {checkDecialPlaces(coin.amount)}
                          </Col>
                        </Row>
                      </>
                    )
                  })
                  :
                  // Showing transactions
                  transactionHistory.map((transaction: any, i: number) => {
                    return (
                      <>
                        <Row className='row'>
                          {/* Timestamp */}
                          <Row className='timestamp'>
                            {transaction.time}
                          </Row>

                          <Row style={{ width: '100%' }}>
                            {/* From Token */}
                            <Col span={5} className='infoContainer'>
                              <div className='info'>
                                <div className="symbol" style={{ fontSize: '17px' }}>{transaction.fromToken.symbol.toUpperCase()}</div>
                                <div className="name" style={{ fontSize: '11px' }}>{transaction.fromToken.name}</div>
                              </div>
                            </Col>
                            <Col span={3} style={Object.assign({ fontSize: '12px' })}>
                              ${transaction.fromToken.price}
                            </Col>
                            <Col span={3} className='arrow' style={{ fontSize: '12px' }}>
                              <div style={{ color: redColor }}>-{transaction.fromToken.exchangeAmount}</div>
                              <div>{transaction.fromToken.newValue.toFixed(4)}</div>
                            </Col>

                            {/* Arrow */}
                            <Col span={2} style={Object.assign({ display: 'flex' }, { justifyContent: 'center' })}>
                              <RightOutlined />
                            </Col>

                            {/* To Token */}
                            <Col span={5} className='infoContainer'>
                              <div className='info'>
                                <div className="symbol" style={{ fontSize: '17px' }}>{transaction.toToken.symbol.toUpperCase()}</div>
                                <div className="name" style={{ fontSize: '11px' }}>{transaction.toToken.name}</div>
                              </div>
                            </Col>
                            <Col span={3} style={{ fontSize: '12px' }}>
                              ${transaction.toToken.price}
                            </Col>
                            <Col span={3} className='arrow' style={Object.assign({ fontSize: '12px' })}>
                              <div style={{ color: greenColor }}>+{transaction.toToken.exchangeAmount.toFixed(4)}</div>
                              <div>{transaction.toToken.newValue.toFixed(4)}</div>
                            </Col>
                          </Row>
                        </Row>
                      </>
                    )
                  })
              }
            </div>
            {/* Disconnect Btn */}
            <Row>
              <Row className='viewHistory'>
                <button className='viewText' onClick={() => setIsViewingAssets(prev => !prev)}>{isViewingAssets ? "View Transactions" : "View Assets"}</button>
              </Row>
              <Row className="connectWallet" style={Object.assign({ width: '100%' }, { margin: 0 })}>
                <div className="exchangeBtn" onClick={handleDisconnect} >Disconnect Wallet</div>
              </Row>
            </Row>
          </div>
        </div>
      }
    </>
  )
}

export default ConnectWalletModal