import React, {ComponentProps, ReactElement, useMemo, useState} from "react";
import {Option, types} from "../data";
import {Menu, MenuItem, MenuList} from "../../components/Menu";
import {getMarginLeft} from "../utils";
import Item from "../Item";
import {v4 as uuidv4} from "uuid";
import './FileTree.css';

interface InnerComponentProps extends ComponentProps<"div"> {
    options: Option[]
    nestingLevel: number
    handleRename: ({item, newItem}: { item: Option, newItem: Option }) => void;
    handleAddFileFolder: ({parentItem, newItem}: { parentItem: Option, newItem: Option }) => void;
}

const FileTree = ({
                      options,
                      nestingLevel,
                      handleRename,
                      handleAddFileFolder,
                      ...props
                  }: InnerComponentProps): ReactElement => {

    const [showNestedMenu, setShowNestedMenu] = useState(true);

    const onClickRenameIcon = (
        item: Option,
        newItem: Option
    ) => {
        handleRename({item, newItem});
    }

    const onClickFileIcon = (parentItem: Option) => {
        // Check if empty file already exists
        if (parentItem.children) {
            if (parentItem.children?.find(el => el.value === "" && el.type === types.FILE)) return;
        }

        if (parentItem?.id) {
            const newFile: Option = {
                value: "",
                id: uuidv4(),
                type: types.FILE,
            }
            handleAddFileFolder({parentItem, newItem: newFile});
        }
    }


    const onClickFolderIcon = (parentItem: Option) => {
        // Check if empty folder already exists
        if (parentItem.children) {
            if (parentItem?.children?.find(el => el.value === "" && el.type === types.FOLDER)) return;
        }

        if (parentItem?.id) {
            const newFolder: Option = {
                value: "",
                id: uuidv4(),
                type: types.FOLDER,
            }
            handleAddFileFolder({parentItem, newItem: newFolder});
        }
    }

    const onClickMenuItem = () => {
        setShowNestedMenu(prev => !prev);
    }

    const marginLeft = useMemo(() => getMarginLeft(nestingLevel), []);

    return (
        <Menu {...props}>
            <MenuList>
                {options.map((item) => {
                    const children: Option[] = item.children;
                    if (children) {
                        nestingLevel = nestingLevel + 1;
                        return (
                            <MenuItem key={item.id}
                                      onClick={onClickMenuItem}
                                      style={{marginLeft}}>
                                <Item item={item}
                                      handleFile={() => onClickFileIcon(item)}
                                      handleFolder={() => onClickFolderIcon(item)}
                                      handleRename={(newItem) => onClickRenameIcon(item, newItem)}/>
                                <FileTree
                                    // handle show/hide via className vs unmount/mount component
                                    // to avoid re-render and resetting of showNestedMenu state
                                    // for n-level nesting
                                    className={showNestedMenu ? "show" : "hide"}
                                    options={children}
                                    nestingLevel={nestingLevel}
                                    handleRename={handleRename}
                                    handleAddFileFolder={handleAddFileFolder}/>
                            </MenuItem>
                        )
                    } else {
                        return (
                            <MenuItem key={item.id}
                                      style={{marginLeft}}>
                                <Item item={item}
                                      handleFile={() => onClickFileIcon(item)}
                                      handleFolder={() => onClickFolderIcon(item)}
                                      handleRename={(newItem) => onClickRenameIcon(item, newItem)}/>
                            </MenuItem>
                        )
                    }
                })
                }
            </MenuList>
        </Menu>
    )
}


export default FileTree;