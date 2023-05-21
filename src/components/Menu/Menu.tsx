import React, {ReactElement, ReactNode} from "react";
import './Menu.css';

interface MenuProps {
    children: ReactNode
}

export const Menu = ({children}: MenuProps): ReactElement => {
    return (
        <div className="menu">
            {children}
        </div>
    )
}