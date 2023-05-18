import React, {useState} from "react";
import './FileSystem.css';
import {Option, options} from "./data";
import InnerComponent from "./InnerComponent";

let nestingLevel = 0;


const FileSystem = () => {
    const [open, setOpen] = useState(true);
    const [data, setData] = useState(options);

    const handleOnClick = () => {
        setOpen(prevState => !prevState);
        nestingLevel = 0
    }

    const handleRename = ({item, newValue}: { item: Option, newValue: string }): void => {
        let updatedData: Option[] = [...data];
        if (newValue.length > 0) {
            updatedData = updatedData.map((el: Option) => {
                    if (el.id === item.id) {
                        el.value = newValue;
                    } else if (el.children) {
                        el.children = el.children.map((child: Option) => {
                            if (child.id === item.id) {
                                child.value = newValue
                            }
                            return child;
                        })
                    }
                    return el;
                }
            )
        }
        setData(updatedData);
    }

    const handleAddFileFolder = ({parentItem, newItem}: { parentItem: Option, newItem: Option }): void => {
        let updatedData: Option[] = [...data];
        updatedData = updatedData.map((el: Option) => {
                if (el.id === parentItem.id) {
                    el.children = [...el.children, newItem];
                } else if (el.children) {
                    el.children = el.children.map((child: Option) => {
                        if (child.id === parentItem.id) {
                            child.children = [...child.children, newItem];
                        }
                        return child;
                    })
                }
                return el;
            }
        )
        setData(updatedData);

    }

    return (
        <div className="container">
            <button onClick={handleOnClick}>View</button>
            <InnerComponent open={open}
                            options={data}
                            nestingLevel={nestingLevel}
                            handleRename={handleRename}
                            handleAddFileFolder={handleAddFileFolder}/>
        </div>
    )
}


export default FileSystem;