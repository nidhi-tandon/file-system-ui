import React, {ReactElement} from "react";
import {Option, types} from "./data";
import {FcFile, FcOpenedFolder} from "react-icons/fc";
import {Menu, MenuItem, MenuList} from "../components/Menu";
import {getMarginLeft} from "./utils";
import Item from "./Item";
import {v4 as uuidv4} from "uuid";


const marginLeft = 2;

interface InnerComponentProps {
    options: Option[]
    nestingLevel: number
    handleRename: ({item, newItem}: { item: Option, newItem: Option }) => void;
    handleAddFileFolder: ({parentItem, newItem}: { parentItem: Option, newItem: Option }) => void;
}

const InnerComponent = ({
                            options,
                            nestingLevel,
                            handleRename,
                            handleAddFileFolder
                        }: InnerComponentProps): ReactElement => {

    const handleRenameOnClick = (
        item: Option,
        newItem: Option
    ) => {
        handleRename({item, newItem});
    }

    const handleFileOnClick = (parentItem: Option) => {
        if (parentItem?.id) {
            const newFile: Option = {
                icon: <FcFile/>,
                value: "",
                id: uuidv4(),
                type: types.FILE,
            }
            handleAddFileFolder({parentItem, newItem: newFile});
        }
    }


    const handleFolderOnClick = (parentItem: Option) => {
        if (parentItem?.id) {
            const newFolder: Option = {
                icon: <FcOpenedFolder/>,
                value: "",
                id: uuidv4(),
                type: types.FOLDER,
            }
            handleAddFileFolder({parentItem, newItem: newFolder});
        }
    }

    return (
        <Menu open>
            <MenuList>
                {options.map((item) => {
                    const children: Option[] = item.children;
                    if (children) {
                        nestingLevel = nestingLevel + 1;
                        return (
                            <MenuItem key={item.id} style={{
                                marginLeft: getMarginLeft({marginLeft, nestingLevel}),
                            }}>
                                <Item item={item}
                                      handleFile={() => handleFileOnClick(item)}
                                      handleFolder={() => handleFolderOnClick(item)}
                                      handleRename={(newItem) => handleRenameOnClick(item, newItem)}/>
                                <InnerComponent
                                    options={children}
                                    nestingLevel={nestingLevel}
                                    handleRename={handleRename}
                                    handleAddFileFolder={handleAddFileFolder}/>
                            </MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item.id}
                                      style={{marginLeft: getMarginLeft({marginLeft, nestingLevel})}}>
                                <Item item={item}
                                      handleFile={() => handleFileOnClick(item)}
                                      handleFolder={() => handleFolderOnClick(item)}
                                      handleRename={(newItem) => handleRenameOnClick(item, newItem)}/>
                            </MenuItem>
                        )
                    }
                })
                }
            </MenuList>
        </Menu>
    )
}


export default InnerComponent;