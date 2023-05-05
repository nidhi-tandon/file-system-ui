import {Menu, MenuItem, MenuList} from "../components/Menu";
import {useState, ReactElement} from "react";
import './FileSystem.css';
import {options, Options} from "./data";
import React from 'react';

const marginLeft = 2;
let nestingLevel = 0;

interface InnerComponentProps {
    open: boolean;
    options: Options[]
}

type GetMarginLeftProps = {
    marginLeft: number;
    nestingLevel: number
}

const getMarginLeft = ({marginLeft, nestingLevel}: GetMarginLeftProps): string => {
    return `${marginLeft + (marginLeft * (nestingLevel + 1))}px`;
}

const FileSystem = () => {
    const [open, setOpen] = useState(true);

    const handleOnClick = () => {
        setOpen(prevState => !prevState);
        nestingLevel = 0
    }

    return (
        <div className="container">
            <button onClick={handleOnClick}>View</button>
            <InnerComponent open={open} options={options}/>
        </div>
    )
}


const InnerComponent = ({open, options}: InnerComponentProps): ReactElement => {
    return (
        <Menu open={open}>
            <MenuList>
                {options.map((item) => {
                    if (item?.value && typeof item.value !== 'string') {
                        const children: Options[] = item.value.children;
                        nestingLevel = nestingLevel + 1;
                        return (
                            <MenuItem key={item.label} style={{
                                marginLeft: getMarginLeft({marginLeft, nestingLevel}),
                            }}>
                                {item.icon}
                                {item.label}
                                <InnerComponent open={open} options={children}/>
                            </MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item.label}
                                      style={{marginLeft: getMarginLeft({marginLeft, nestingLevel})}}>
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

export default FileSystem;