import {Option} from "./data";

type GetMarginLeftProps = {
    marginLeft: number;
    nestingLevel: number
}
export const getMarginLeft = ({marginLeft, nestingLevel}: GetMarginLeftProps): string => {
    return `${marginLeft + (marginLeft * (nestingLevel + 1))}px`;
}


export const updateItem = ({data, item, newItem}: { data: Option[], item: Option, newItem: Option }): Option[] => {
    return data.map((element: Option): Option => {
        if (element.id === item.id) {
            element = newItem;
        } else if (element.children) {
            element.children = updateItem({data: element.children, item, newItem})
        }
        return element;
    })
}

export const addChildren = ({data, item, newItem}: { data: Option[], item: Option, newItem: Option }): Option[] => {
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

export const runDataCleanUp = (data: Option[]): Option[] => {
    return data.filter((element: Option): boolean => {
        if (element.children) {
            element.children = runDataCleanUp(element.children)
        }
        return element.value.trim().length > 0;
    })
}
