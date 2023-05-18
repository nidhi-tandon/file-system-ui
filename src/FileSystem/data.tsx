import {FcFile, FcOpenedFolder} from "react-icons/fc";
import React from 'react';
import {v4 as uuidv4} from "uuid";

export type Option = {
    value: string;
    icon: JSX.Element;
    id: string
    children?: Option[]
    type: string
}

export const types = {
    FILE: 'FILE',
    FOLDER: 'FOLDER'
}
export const options: Option[] = [{
    value: 'src',
    icon: <FcOpenedFolder/>,
    id: uuidv4(),
    type: types.FOLDER,
    children: [
        {
            value: 'App.ts',
            icon: <FcFile/>,
            id: uuidv4(),
            type: types.FILE,
        },
        {
            value: 'App.css',
            icon: <FcFile/>,
            id: uuidv4(),
            type: types.FILE,
        },
        {
            value: 'Components',
            icon: <FcOpenedFolder/>,
            id: uuidv4(),
            type: types.FOLDER,
            children: [
                {
                    value: 'Menu',
                    icon: <FcOpenedFolder/>,
                    id: uuidv4(),
                    type: types.FOLDER,
                    children: [
                        {
                            value: 'Menu.ts',
                            icon: <FcFile/>,
                            id: uuidv4(),
                            type: types.FILE,
                        }
                    ]
                },
            ],
        }]
}]
