import {MdModeEditOutline, MdOutlineFolder, MdOutlineTextSnippet} from "react-icons/md";
import React, {ChangeEvent, FocusEvent, FormEvent, MouseEvent, useState} from "react";
import {Option, types} from "./data";
import './FileSystem.css';

interface ItemProps {
    item: Option;
    handleRename?: (item: Option) => void;
    handleFile?: () => void;
    handleFolder?: () => void;

}

const Item = ({item, handleRename, handleFile, handleFolder}: ItemProps) => {
    const [inputVal, setInputVal] = useState(item.value);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.target.value);
    }

    const handleRenameOnClick = (e: MouseEvent<SVGElement>) => {
        e.stopPropagation();
        setIsEditMode(prevState => !prevState);
    }

    const handleAddFolderOnClick = (e: MouseEvent<SVGElement>) => {
        e.stopPropagation();
        handleFolder();
    }

    const handleAddFileOnClick = (e: MouseEvent<SVGElement>) => {
        e.stopPropagation();
        handleFile();
    }

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsEditMode(false);
        item.value = inputVal;
        handleRename(item);
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsEditMode(false);
        item.value = inputVal;
        handleRename(item);
    }

    return (
        <div className="item">
            <div>
                {item.icon}
                {item.value === "" || isEditMode ?
                    <form onSubmit={handleOnSubmit}>
                        <input value={inputVal}
                               onChange={handleInputOnChange}
                               onBlur={handleOnBlur}
                               autoFocus/>
                    </form> :
                    item.value
                }
            </div>
            <div className="actions">
                {handleRename &&
                    <MdModeEditOutline onClick={handleRenameOnClick}/>
                }
                {handleFile && item.type === types.FOLDER &&
                    <MdOutlineTextSnippet onClick={handleAddFileOnClick}/>
                }
                {handleFolder && item.type === types.FOLDER &&
                    <MdOutlineFolder onClick={handleAddFolderOnClick}/>
                }
            </div>
        </div>
    )
}
export default Item;
