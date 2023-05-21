import React, {ReactElement, ReactNode} from "react";
import './Menu.css';

interface MenuProps {
    children: ReactNode
}

export const Menu = ({children, ...props}: MenuProps): ReactElement => {
    return (
        <div className="menu" {...props}>
            {children}
        </div>
    )
}