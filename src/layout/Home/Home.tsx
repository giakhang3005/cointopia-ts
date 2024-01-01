import "./Home.scss"
import { Row, Col } from "antd"
import { TopMarketCap, TopNewToken, TopVolume } from "./CoinsCard"

type Props = {}

const Home = (props: Props) => {
    return (
        <div id="home">
            <img src="./Assets/Images/btc.png" className="decorPic" id="btc" />
            <img src="./Assets/Images/eth.png" className="decorPic" id="eth"/>
            <div className="blocked"></div>
            <div className="title">COINTOPIA</div>
            <div className="description">MARKET IN YOUR HANDS</div>
            <div className="Card">
                <Row className="allCardsContainer">
                    <TopMarketCap />
                    {/* <Col sm={1} /> */}
                    <TopNewToken />
                    {/* <Col sm={1} /> */}
                    <TopVolume />
                </Row>

            </div>
        </div>
    )
}

export default Home