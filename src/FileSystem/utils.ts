type GetMarginLeftProps = {
    marginLeft: number;
    nestingLevel: number
}
export const getMarginLeft = ({marginLeft, nestingLevel}: GetMarginLeftProps): string => {
    return `${marginLeft + (marginLeft * (nestingLevel + 1))}px`;
}
