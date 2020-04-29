import React, { FC, Children } from 'react'

export interface OptionProps {
    index?:    string;
    value:     string;
    label?:    string;
    disabled?: boolean;
}

export const Option: FC<OptionProps> = ({value, children}) => {

    // const {index, value, label, disabled} = props

    return(
        // <option value={value}>{value}, {index}</option>
        <div>{value}</div>
    )
}

export default Option;