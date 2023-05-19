import {Option} from "./data";

type GetMarginLeftProps = {
    marginLeft: number;
    nestingLevel: number
}
export const getMarginLeft = ({marginLeft, nestingLevel}: GetMarginLeftProps): string => {
    return `${marginLeft + (marginLeft * (nestingLevel + 1))}px`;
}


/**
 * Update the item (value update in this case)
 * Works for n-level nesting
 * @param data
 * @param item
 * @param newItem
 */
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

/**
 * Add child element to the parent based on id matching
 * Works for n-level nesting
 * @param data
 * @param item
 * @param newItem
 */
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

/**
 * Function to remove all empty values from the array
 * @param data
 */
export const runDataCleanUp = (data: Option[]): Option[] => {
    return data.filter((element: Option): boolean => {
        // bottom-up approach
        // check all leaf nodes and then reach to the parent element
        if (element.children) {
            element.children = runDataCleanUp(element.children)
        }
        return element.value.trim().length > 0;
    })
}
