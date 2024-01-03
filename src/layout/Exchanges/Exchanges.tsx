import { useState, useContext, useEffect } from 'react'
import "./Exchanges.scss"
import { Data, IContext } from "../../App";
import { Row, Col, Modal, message } from 'antd'
import { ArrowRightOutlined, WalletFilled, ArrowDownOutlined, SlidersFilled } from '@ant-design/icons'
import TokenSection from './TokenSection';
import ConnectWalletModal from './ConnectWalletModal';
import { saveToLocal } from './ExchangeLocalStrFunc';

type Props = {}

interface IAssets {
    amount: number,
    name: string,
    id: string,
    symbol: string,
}

const Exchanges = (props: Props) => {
    const { coinList, loading } = useContext(Data) as IContext;
    const [firstToken, setFirstToken] = useState<any>(null)
    const [secondToken, setSecondToken] = useState<any>(null)
    const [firstValue, setFirstValue] = useState<string>('')
    const [secondValue, setSecondValue] = useState<string>('')
    const [modalState, setModalState] = useState<boolean>(false)
    const [connectedWalletData, setConnectedWalletData] = useState<any>(null)
    const [transactionHistory, setTransactionHistory] = useState<any>(null)

    useEffect(() => {
        if (coinList !== null) {
            setFirstToken(coinList[0])
            setSecondToken(coinList[1])
        }
    }, [coinList])

    const handleExchange = () => {

        // Check if any value start or end with .
        if (firstValue.endsWith(".") || firstValue.startsWith(".") || secondValue.endsWith(".") || secondValue.startsWith(".")) {
            message.error('Invalid exchange value')
        } else {
            // Check if any value greater than 0
            if (parseFloat(firstValue) > 0 || parseFloat(secondToken) > 0) {
                //declare variables to hold both trading token and its index in the wallet
                let exchangeFromToken: IAssets = {
                    amount: 0,
                    name: 'nothing',
                    id: "nothing",
                    symbol: "nothing",
                },
                    exchangeToToken: IAssets | null = {
                        amount: 0,
                        name: 'nothing',
                        id: "nothing",
                        symbol: "nothing",
                    };
                let fromAssetIndex = -1,
                    toAssetIndex = -1;

                //check if both tokens are exist in the asset
                connectedWalletData.assets.forEach((asset: any, i: number) => {
                    if (firstToken.id === asset.id) {
                        exchangeFromToken = asset
                        fromAssetIndex = i
                    }
                    if (secondToken.id === asset.id) {
                        exchangeToToken = asset
                        toAssetIndex = i
                    }
                })

                // Check if user have enough "From token" to exchange
                // No token in the wallet
                if (exchangeFromToken.id === "nothing") {
                    message.error(`You don't have enough ${firstToken.symbol.toUpperCase()} to exchange`)
                }
                // Have token but not enough 
                else if (exchangeFromToken.amount < parseFloat(firstValue)) {
                    message.error(`You don't have enough ${firstToken.symbol.toUpperCase()} to exchange`)
                }
                // Enough
                else {
                    // Calculate amount of "From token" left in the wallet
                    const newFromAsset = {
                        id: exchangeFromToken.id,
                        symbol: exchangeFromToken.symbol,
                        name: exchangeFromToken.name,
                        amount: exchangeFromToken.amount - parseFloat(firstValue),
                    }

                    // Set the new amount to "From token" in the wallet
                    let newWallet = connectedWalletData
                    newWallet.assets[fromAssetIndex] = newFromAsset

                    // Decalre variable to hold new to token
                    let newToAsset = {}

                    // If the "To token" exist in the wallet
                    if (exchangeToToken.id !== "nothing") {
                        newToAsset = {
                            id: exchangeToToken.id,
                            symbol: exchangeToToken.symbol,
                            name: exchangeToToken.name,
                            //force change type to number
                            amount: exchangeToToken.amount * 1 + parseFloat(secondValue) * 1,
                        }
                        // Set new amount to it
                        newWallet.assets[toAssetIndex] = newToAsset
                    }
                    // "To token" does not exist in the wallet
                    else {
                        newToAsset = {
                            id: secondToken.id,
                            symbol: secondToken.symbol,
                            name: secondToken.name,
                            amount: parseFloat(secondValue),
                        }
                        // Push new item to the wallet assets
                        newWallet.assets.push(newToAsset)
                    }

                    // Set new wallet
                    setConnectedWalletData(newWallet)

                    //get transaction time
                    const now = new Date()
                    const nowString = `${now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}:${now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()}
                    ${now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()}/${now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1}/${now.getFullYear()}`

                    //set transaction
                    let transactionsList = transactionHistory
                    let transaction = {
                        fromToken: {
                            id: firstToken.id,
                            symbol: firstToken.symbol,
                            name: firstToken.name,
                            price: firstToken.current_price,
                            exchangeAmount: parseFloat(firstValue),
                            newValue: newFromAsset.amount,
                        },
                        toToken: {
                            id: secondToken.id,
                            symbol: secondToken.symbol,
                            name: secondToken.name,
                            price: secondToken.current_price,
                            exchangeAmount: parseFloat(secondValue),
                            newValue: exchangeToToken.amount * 1 + parseFloat(secondValue) * 1,
                        },
                        time: nowString,
                    }

                    transactionsList.push(transaction)
                    setTransactionHistory(transactionsList)

                    //save to local
                    saveToLocal(newWallet, transactionsList)

                    // Reset trade value
                    setFirstValue('')
                    setSecondValue('')
                    // Notify
                    message.success('Exchange successfully')
                }
            } else {
                message.error('Exchange value can not be 0')
            }
        }
    }

    return (
        <div id="exchanges">
            <div className='blocked'></div>
            <div className="title">Exchanges</div>

            {/* Modal */}
            <Modal
                title={connectedWalletData === null ? "CONNECT YOUR WALLET" : "WALLET INFORMATIONS"}
                open={modalState}
                footer={null}
                onCancel={() => setModalState(false)}
            >
                <ConnectWalletModal setConnectedWalletData={setConnectedWalletData} connectedWalletData={connectedWalletData} transactionHistory={transactionHistory} setTransactionHistory={setTransactionHistory} />
            </Modal>

            {/* Exchange */}
            <Row className='exchangeContainer'>
                <Col span={0} sm={2}></Col>
                <TokenSection token={firstToken} setToken={setFirstToken} exValue={firstValue} setExValue={setFirstValue} setOthersValue={setSecondValue} otherToken={secondToken} />

                {/* Desktop Arrow & Button */}
                <Col span={24} sm={6} className='middleChangeContainer'>
                    <ArrowRightOutlined className='icon' />
                    {/* Connect wallet */}
                    {connectedWalletData === null
                        ?
                        (<div className="connectWallet" onClick={() => setModalState(true)}>
                            <WalletFilled className='icon' />
                            <div className="callToAction" >Connect Wallet</div>
                        </div>)
                        :
                        // Exchange
                        (<div className='exchangeContainerSection'>
                            <div className="connectWallet" onClick={handleExchange}>
                                <div className="exchangeBtn" >Exchange</div>
                            </div>
                            <div className="viewAssetsBtn" onClick={() => setModalState(true)}>
                                <div className="exchangeBtn" >View Assets</div>
                            </div>
                        </div>
                        )}
                </Col>

                {/* Mobile Arrow */}
                <Col span={24} sm={0} className='middleChangeContainerMobile'>
                    <ArrowDownOutlined className='icon' />
                </Col>

                <TokenSection token={secondToken} setToken={setSecondToken} exValue={secondValue} setExValue={setSecondValue} setOthersValue={setFirstValue} otherToken={firstToken} />

                {/* <Col span={0} sm={2}></Col> */}
            </Row>

            {/* Mobile button */}
            <Row>
                <Col span={4} sm={0} />
                <Col span={16} sm={0}>
                    {/* Connect wallet */}
                    {connectedWalletData === null
                        ?
                        (<div className="connectWallet" onClick={() => setModalState(true)}>
                            <WalletFilled className='icon' />
                            <div className="callToAction" >Connect Wallet</div>
                        </div>)
                        :
                        // Exchange
                        (<div className='exchangeContainerSection'>
                            <div className="connectWallet" onClick={handleExchange}>
                                <div className="exchangeBtn" >Exchange</div>
                            </div>
                            <div className="viewAssetsBtn" onClick={() => setModalState(true)}>
                                <div className="exchangeBtn" >View Assets</div>
                            </div>
                        </div>
                        )}
                </Col>
            </Row>
        </div>
    )
}

export default Exchanges