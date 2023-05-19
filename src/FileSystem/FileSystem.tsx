import React, {useState} from "react";
import './FileSystem.css';
import {Option, options} from "./data";
import InnerComponent from "./InnerComponent";
import {updateItem, addChildren, runDataCleanUp} from "./utils";

const nestingLevel = 0;


const FileSystem = () => {
    const [data, setData] = useState(options);

    const handleRename = ({item, newItem}: { item: Option, newItem: Option }): void => {
        let updatedData: Option[] = [...data];
        // trim to remove all empty spaces from the value
        if (newItem.value.trim().length > 0) {
            updatedData = updateItem({data: updatedData, item, newItem})
        } else {
            updatedData = runDataCleanUp(updatedData);
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
            <InnerComponent
                options={data}
                nestingLevel={nestingLevel}
                handleRename={handleRename}
                handleAddFileFolder={handleAddFileFolder}/>
        </div>
    )
}


export default FileSystem;