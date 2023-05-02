import {Fragment, ReactElement, ReactNode} from "react";
import './Menu.css';

interface MenuProps {
    open: boolean;
    children: ReactNode
}
export const Menu = ({open, children}: MenuProps): ReactElement => {
    return (
        <Fragment>
            {open &&
                <div className="menu">
                    {children}
                </div>
            }
        </Fragment>
    )
}

/*
    div     Menu
    ul      MenuList
        li (folder, file) MenuItem
            li


Functionalities - delete, rename, add file, add folder
 */