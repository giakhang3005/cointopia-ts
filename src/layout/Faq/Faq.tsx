import React from 'react'
import "./Faq.scss"
import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

type Props = {}

const Faq = (props: Props) => {
    return (
        <div id="faq">
            <div className="blocked"></div>

            <div className='title'>FAQ</div>

            <div className='collapseContainer'>
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{ key: '1', label: 'What is Blockchain?', children: <p>A blockchain is a distributed database or ledger shared among a computer network's nodes. They are best known for their crucial role in cryptocurrency systems for maintaining a secure and decentralized record of transactions, but they are not limited to cryptocurrency uses. Blockchains can be used to make data in any industry immutable—the term used to describe the inability to be altered.</p> }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{ key: '2', label: 'What is Crypto?', children: <p>A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. It is a decentralized system for verifying that the parties to a transaction have the money they claim to have, eliminating the need for traditional intermediaries, such as banks, when funds are being transferred between two entities.</p> }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{
                        key: '7', label: 'What is Cointopia?', children:
                            <>
                                Cointopia is a online platform that support "newbie" to understand basic knowledge about crypto-currency
                            </>
                    }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{
                        key: '3', label: 'What wallet do Cointopia support?', children:
                            <ol>
                                <li>Coinbase Wallet</li>
                                <li>Metamask</li>
                                <li>Trezor</li>
                                <li>Ledger</li>
                                <li>Exodus</li>
                                <li>Trust Wallet</li>
                            </ol>
                    }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{
                        key: '4', label: 'How to view coins Informations and Graph?', children:
                            <ol>
                                <li>Go to <a href="#market">Market</a> section</li>
                                <li>Click on the Symbol, Name or <CaretRightOutlined /> of the coin that you want to view details/graph</li>
                                <li>If you want to go back, simply click Home on the Navbar</li>
                            </ol>
                    }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{
                        key: '5', label: 'How to trade on Cointopia?', children:
                            <ol>
                                <li>Go to <a href="#exchanges">Exchanges</a> section</li>
                                <li>On the Left (Desktop) and Top (Mobile), select the currency that you want to exchange from</li>
                                <li>On the Right (Desktop) and Bottom (Mobile), select the currency that you want to exchange to</li>
                                <li>Type the amount in 1 amount box, then it will calculate other amount for you</li>
                                <li>Connect your wallet and click Exchange</li>
                            </ol>
                    }]}
                />
                <Collapse
                    className='collapse'
                    size="large"
                    items={[{
                        key: '6', label: 'Why Cointopia does not display some or all Data?', children:
                            <>
                                There are several reasons:
                                <ol>
                                    <li>You have no/low internet connection, you should check your connection and refresh again</li>
                                    <li>You have request for data too many times, you should try again later after 5 minutes</li>
                                </ol>
                            </>
                    }]}
                />

            </div>
        </div>
    )
}

export default Faq