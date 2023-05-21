import {v4 as uuidv4} from "uuid";

export type Option = {
    value: string;
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
    id: uuidv4(),
    type: types.FOLDER,
    children: [
        {
            value: 'App.ts',
            id: uuidv4(),
            type: types.FILE,
        },
        {
            value: 'App.css',
            id: uuidv4(),
            type: types.FILE,
        },
        {
            value: 'Components',
            id: uuidv4(),
            type: types.FOLDER,
            children: [
                {
                    value: 'Menu',
                    id: uuidv4(),
                    type: types.FOLDER,
                    children: [
                        {
                            value: 'Menu.ts',
                            id: uuidv4(),
                            type: types.FILE,
                        }
                    ]
                },
            ],
        }]
}]
