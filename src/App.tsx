import { createContext, useState, useEffect } from 'react';
import "./App.scss"
import Nav from './layout/Nav/Nav';
import Home from './layout/Home/Home';
import Martket from './layout/Market/Martket';
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CoinInfo from './layout/CoinInfo/CoinInfo';
import Exchanges from './layout/Exchanges/Exchanges';
import { getMarket, getIpAddress } from './Services/APIs';
import Faq from './layout/Faq/Faq';
import Communities from './layout/Communities/Communities';

export interface IContext {
  coinList: any;
  setCoinList: (data: any) => void;

  loading: boolean;
  setLoading: (data: boolean) => void;
}

export const Data = createContext<IContext | null>(null);

function App() {
  const [coinList, setCoinList] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getMarket(setCoinList, setLoading)

    // const hash = window.location.hash
    // window.location.href = hash;
  }, [])

  //This data help me to know how many client visit and where do they come from
  //I can get client's insight from this and develope many more about this topic
  //Data will be secure and not using for other purpose
  useEffect(() => {
    getIpAddress()
  }, [])


  return (
    <div className="App">
      <Data.Provider value={{ coinList, setCoinList, loading, setLoading }}>
        <ConfigProvider theme={{ token: { colorPrimary: "#7c3aed", colorBgContainer: '#111827', colorBgBase: '#111827', colorTextBase: '#ffffff' } }}>
          <Nav />
          <BrowserRouter>
            <Routes>
              <Route path="/:coinId" element={<CoinInfo />} />
              <Route path="/"
                element={
                  <>
                    <Home />
                    <Martket />
                    <Exchanges />
                    <Faq />
                    <Communities />
                  </>}
              />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Data.Provider>
    </div>
  );
}

export default App;
