import React, {ReactElement, ReactNode, useRef, useState, MouseEvent, LinkHTMLAttributes} from "react";

interface MenuItemProps extends LinkHTMLAttributes<any> {
    children: ReactNode
}

export const MenuItem = ({children, ...props}: MenuItemProps): ReactElement => {
    const [showChildren, setShowChildren] = useState(true);
    const itemRef = useRef<HTMLLIElement>(null);
    const handleOnClick = (event: MouseEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();

        const children: Element[] = Array.from(itemRef.current.children);
        const childMenu = children.find((child) => child.classList.contains('menu'));
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
