import React from 'react';
import "./App.scss"
import Nav from './layout/Nav/Nav';
import Home from './layout/Home/Home';
import Martket from './layout/Market/Martket';
import { ConfigProvider } from "antd";

function App() {
  return (
    <div className="App">
      <ConfigProvider theme={{ token: { colorPrimary: "#7c3aed", colorBgContainer: '#111827' } }}>
        <Nav />
        <Home />
        <Martket />
      </ConfigProvider>
    </div>
  );
}

export default App;
