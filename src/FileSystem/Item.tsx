import {MdModeEditOutline, MdOutlineFolder, MdOutlineTextSnippet} from "react-icons/md";
import React, {ChangeEvent, MouseEvent, FocusEvent, useState, FormEvent} from "react";
import {Option, types} from "./data";

interface ItemProps {
    item : Option;
    handleRename?: (value?: string) => void;
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
        handleRename(inputVal);
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsEditMode(false);
        handleRename(inputVal);
    }

    return (
        <div className="item">
            <div>
                {item.icon}
                {item.value === "" || isEditMode ?
                    <form onSubmit={handleOnSubmit} style={{display: "inline-block"}}>
                        <input value={inputVal}
                               onChange={(e) => handleInputOnChange(e)}
                               onBlur={(e) => handleOnBlur(e)}
                               autoFocus/>
                    </form> :
                    item.value
                }
            </div>
            <div className="actions">
                {handleRename &&
                    <MdModeEditOutline onClick={(e) => handleRenameOnClick(e)}/>
                }
                {handleFile && item.type === types.FOLDER &&
                    <MdOutlineTextSnippet onClick={(e) => handleAddFileOnClick(e)}/>
                }
                {handleFolder && item.type === types.FOLDER &&
                    <MdOutlineFolder onClick={(e) => handleAddFolderOnClick(e)}/>
                }
            </div>
        </div>
    )
}
export default Item;
