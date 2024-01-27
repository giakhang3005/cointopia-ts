import { createContext, useState, useEffect } from 'react';
import "./App.scss"
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { getMarket, getIpAddress } from './Services/APIs';
import { routers } from './Routers';

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
          <RouterProvider router={routers} />
        </ConfigProvider>
      </Data.Provider>
    </div>
  );
}

export default App;
