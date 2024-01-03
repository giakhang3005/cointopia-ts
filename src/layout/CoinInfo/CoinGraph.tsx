import { useState, useEffect } from 'react'
import { getChartData } from '../../Services/APIs';
import "./CoinInfo.scss"
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


type Props = {
    coinId: string;
}

const testData = {
    "prices": [
        [
            1703116800000,
            43634.1241684964
        ],
        [
            1703203200000,
            43849.69959939619
        ],
        [
            1703289600000,
            44003.6960216438
        ],
        [
            1703376000000,
            43752.03088478376
        ],
        [
            1703462400000,
            43034.971063091514
        ],
        [
            1703548800000,
            43638.236302200916
        ],
        [
            1703635200000,
            42516.426940282516
        ],
        [
            1703721600000,
            43418.46777504291
        ],
        [
            1703808000000,
            42600.65063315619
        ],
        [
            1703894400000,
            42074.70715618848
        ],
        [
            1703980800000,
            42220.61140121376
        ],
        [
            1704067200000,
            42208.202176186474
        ],
        [
            1704153600000,
            44168.68118687473
        ],
        [
            1704240000000,
            44994.67388689237
        ],
        [
            1704252627000,
            45254.627172148845
        ]
    ],
    "market_caps": [
        [
            1703116800000,
            854173854159.8182
        ],
        [
            1703203200000,
            858312140014.9476
        ],
        [
            1703289600000,
            861822676200.4246
        ],
        [
            1703376000000,
            856850313226.057
        ],
        [
            1703462400000,
            845029028630.4425
        ],
        [
            1703548800000,
            854524607072.9797
        ],
        [
            1703635200000,
            832471600531.6842
        ],
        [
            1703721600000,
            849194163327.4839
        ],
        [
            1703808000000,
            836073458797.803
        ],
        [
            1703894400000,
            822933961870.5416
        ],
        [
            1703980800000,
            826609156660.5117
        ],
        [
            1704067200000,
            827596236151.1959
        ],
        [
            1704153600000,
            863804922701.8125
        ],
        [
            1704240000000,
            878395004792.8407
        ],
        [
            1704252627000,
            887733442991.7443
        ]
    ],
    "total_volumes": [
        [
            1703116800000,
            28334648885.87903
        ],
        [
            1703203200000,
            21948638202.58336
        ],
        [
            1703289600000,
            20833936534.62855
        ],
        [
            1703376000000,
            9872050975.657969
        ],
        [
            1703462400000,
            18313974069.822754
        ],
        [
            1703548800000,
            18744716867.39297
        ],
        [
            1703635200000,
            20477744539.87234
        ],
        [
            1703721600000,
            23244754807.443966
        ],
        [
            1703808000000,
            20336573643.81929
        ],
        [
            1703894400000,
            24832397519.050613
        ],
        [
            1703980800000,
            14727224645.41767
        ],
        [
            1704067200000,
            14183728910.169804
        ],
        [
            1704153600000,
            16958999497.58364
        ],
        [
            1704240000000,
            39089952715.542786
        ],
        [
            1704252627000,
            31887986382.03472
        ]
    ]
}
const CoinGraph = ({ coinId }: Props) => {
    const [chartData, setChartData] = useState<any>(null)
    useEffect(() => {
        getChartData(coinId, setChartData)
    }, [])
    return (
        <div>
            <div className='graphTitle'>Price Chart</div>

            <div className='graphContainer'>
                <Line
                    className="displayGraph"
                    // style={{ padding: "8px 1% 1% 0" }}
                    data={{
                        labels: chartData?.prices.map((data: any, i: number) => {
                            if (i === chartData?.prices.length - 1) {
                                return 'Now'
                            } else {
                                const d = new Date(data[0])
                                return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
                            }
                        }),
                        datasets: [
                            {
                                label: "Prices",
                                data: chartData?.prices.map((data: any) => data[1]),
                                borderColor: "#a78bfa",
                                backgroundColor: "#a78bfa",
                            },
                        ],
                    }}
                    options={{}}
                />
            </div>
        </div>
    )
}

export default CoinGraph