import {Fragment, useRef, useState} from "react";
import './Menu.css';

export const MenuItem = ({children, ...props}) => {
    const [showChildren, setShowChildren] = useState(true);
    const itemRef = useRef(null);
    const handleOnClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let children = Array.from(itemRef.current.children);
        let childMenu = children.find((child) => child.classList.contains('menu'));
        if (childMenu) {
            if (showChildren) {
                childMenu.classList.remove('show');
                childMenu.classList.add('hide');
            } else {
                childMenu.classList.remove('hide');
                childMenu.classList.add('show');
            }
        }
        setShowChildren(prev => !prev);
    }

    return (
        <li {...props} onClick={handleOnClick} ref={itemRef}>
            {children}
        </li>
    )
}

export const MenuList = ({children, open = true}) => {
    if (children?.length < 1) return null;

    return (
        <ul>
            {children.map((item) => item)}
        </ul>
    )
}

export const Menu = ({open, children}) => {
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