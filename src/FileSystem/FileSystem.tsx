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

    const updateItem = ({data, item, newItem}: { data: Option[], item: Option, newItem: Option }): Option[] => {
        return data.map((element: Option): Option => {
            if (element.id === item.id) {
                element = newItem;
            } else if (element.children) {
                element.children = updateItem({data: element.children, item, newItem})
            }
            return element;
        })
    }

    const addChildren = ({data, item, newItem}: { data: Option[], item: Option, newItem: Option }): Option[] => {
        return data.map((el: Option): Option => {
            if (el.id === item.id) {
                if (el.children) {
                    el.children = [...el.children, newItem];
                } else {
                    el.children = [newItem];
                }
            } else if (el.children) {
                el.children = addChildren({data: el.children, item, newItem})
            }
            return el;
        })
    }

    const handleRename = ({item, newItem}: { item: Option, newItem: Option }): void => {
        let updatedData: Option[] = [...data];
        if (newItem.value.length > 0) {
            updatedData = updateItem({data: updatedData, item, newItem})
        }
        setData(updatedData);
    }

    const handleAddFileFolder = ({parentItem, newItem}: { parentItem: Option, newItem: Option }): void => {
        let updatedData: Option[] = [...data];
        updatedData = addChildren({data: updatedData, item: parentItem, newItem})
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