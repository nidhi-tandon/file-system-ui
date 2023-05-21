import React, {useState} from "react";
import './FileSystem.css';
import {Option, options} from "./data";
import FileTree from "./FileTree";
import {updateItem, addChildren, runDataCleanUp} from "./utils";

const nestingLevel = 0;


const FileSystem = () => {
    const [data, setData] = useState(options);

    const handleRename = ({item, newItem}: { item: Option, newItem: Option }): void => {
        let updatedData: Option[];
        // trim to remove all empty spaces from the value
        if (newItem.value.trim().length > 0) {
            updatedData = updateItem({data, item, newItem})
        } else {
            // remove all empty values from state
            updatedData = runDataCleanUp(data);
        }
        setData(updatedData);
    }

    const handleAddFileFolder = ({parentItem, newItem}: { parentItem: Option, newItem: Option }): void => {
        const updatedData: Option[] = addChildren({data, parentItem, newItem})
        setData(updatedData);
    }

    return (
        <div className="container">
            <FileTree
                options={data}
                nestingLevel={nestingLevel}
                handleRename={handleRename}
                handleAddFileFolder={handleAddFileFolder}/>
        </div>
    )
}


export default FileSystem;