import {Menu, MenuItem, MenuList} from "./component/Menu";
import {useState} from "react";
import {FcOpenedFolder, FcFile} from 'react-icons/fc';
import './MenuComponent.css';

const options = [{
    label: 'src',
    icon: <FcOpenedFolder/>,
    value: {
        children: [
            {
                label: 'App.js',
                value: 'App.js',
                icon: <FcFile/>
            },
            {
                label: 'App.css',
                value: 'App.css',
                icon: <FcFile/>
            },
            {
                label: 'Components',
                icon: <FcOpenedFolder/>,
                value: {
                    children: [
                        {
                            label: 'Menu',
                            icon: <FcOpenedFolder/>,
                            value: {
                                children: [
                                    {
                                        label: 'Menu.js',
                                        value: 'Menu.js',
                                        icon: <FcFile/>
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    }
}]

const marginLeft = 2;
let nestingLevel = 0;

const getMarginLeft = (marginLeft, nestingLevel) => {
    return `${marginLeft + (marginLeft * (nestingLevel + 1))}px`;
}

const MenuComponent = () => {
    const [open, setOpen] = useState(true);

    const handleOnClick = () => {
        setOpen(prevState => !prevState);
        nestingLevel = 0
    }

    return (
        <div className="container">
            <button onClick={handleOnClick}>View</button>
            <InnerComponent open={open} handleOnClick={handleOnClick} options={options}/>
        </div>
    )
}


const InnerComponent = ({open, handleOnClick, options}) => {
    return (
        <Menu open={open} onClick={handleOnClick} defaultValue={{
            icon: options[0].icon,
            label: options[0].label,
        }}>
            <MenuList>
                {options.map((item) => {
                    if (item?.value?.children) {
                        const children = item.value.children;
                        nestingLevel = nestingLevel + 1;
                        return (
                            <MenuItem key={item.label} style={{
                                marginLeft: getMarginLeft(marginLeft, nestingLevel),
                            }}>
                                {item.icon}
                                {item.label}
                                <InnerComponent open={open} handleOnClick={handleOnClick} options={children}/>
                            </MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item.label}
                                      style={{marginLeft: getMarginLeft(marginLeft, nestingLevel)}}>
                                {item.icon}
                                {item.label}
                            </MenuItem>
                        )
                    }
                })
                }
            </MenuList>
        </Menu>
    )
}

export default MenuComponent;