import './Nav.scss'
import { useState } from 'react';
import { Drawer } from 'antd';
import { MenuBtn } from './MenuBtn';

type Props = {}

//Nav items
interface INavItem {
    display: string;
    path: string;
}
const NavItems: INavItem[] = [
    {
        display: 'Home',
        path: '#home'
    },
    {
        display: 'Martket',
        path: '#market'
    },
    {
        display: 'Exchanges',
        path: '#exchanges'
    },
    {
        display: 'FAQ',
        path: '#faq'
    },
    {
        display: 'Communities',
        path: '#communities'
    },
]

const Nav = (props: Props) => {
    const [menuState, setMenuState] = useState<boolean>(false)
    return (
        <nav className='Navbar'>
            <div className='logo'>
                COINTOPIA
            </div>

            {/* Desktop */}
            <ul className='items desktopview'>
                {
                    NavItems.map((item, i) => (
                        <li key={i}>
                            <a href={item.path}>
                                {item.display}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <MenuBtn isOpen={menuState} action={() => setMenuState(!menuState)} />

            {/* Mobile */}
            <Drawer title="MENU" placement="right" onClose={() => setMenuState(false)} open={menuState} closable={true}>
                <ul className='mobileMenu'>
                    {
                        NavItems.map((item, index) => (
                            <li key={index} id='mobileMenuItems'><a onClick={() => setMenuState(false)} href={item.path}>{item.display}</a></li>
                        ))
                    }
                </ul>
            </Drawer>
        </nav>
    )
}

export default Nav