import { Button } from 'antd'
import './Nav.scss'

interface IProps {
    isOpen: boolean
    action: () => void
}

const animationOri = {
    opacity: 0
}
const animationIn = {
    opacity: 1
}
const transition = {
    duration: 0.8
}


export const MenuBtn = ({ isOpen, action }: IProps) => {
    return (
        <div className="MenuBtn" onClick={action}

        >
            <span className={isOpen ? `open` : `close`}></span>
            <span className={isOpen ? `open` : `close`}></span>
            <span className={isOpen ? `open` : `close`}></span>
        </div>
    )
}