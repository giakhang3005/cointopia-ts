import React from 'react'
import Home from './Home/Home'
import Martket from './Market/Martket'
import Exchanges from './Exchanges/Exchanges'
import Faq from './Faq/Faq'
import Communities from './Communities/Communities'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <>
            <Home />
            <Martket />
            <Exchanges />
            <Faq />
            <Communities />
        </>
    )
}

export default Homepage