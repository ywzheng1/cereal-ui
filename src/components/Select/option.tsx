import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { SelectContext } from './select'
import Icon from '../Icon/icon'

export interface OptionProps {
    index?:    string;
    value:     string;
    label?:    string;
    disabled?: boolean;
}

export const Option: FC<OptionProps> = ({index, value, label, disabled, children}) => {

    const context = useContext(SelectContext)
    const isSelected = context.selectedValues.includes(value)

    const classes = classNames('cereal-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    })

    const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
        console.log(isSelected)
        if(context.onSelect && !disabled) {
            context.onSelect(value, isSelected)
        }
    }

    return(
        
        <li key={index} className={classes} onClick={(e) => handleClick(e, value, isSelected)}>
            {children || (label? label: value)}
            { context.multiple && isSelected && <span> <Icon icon="check" /> </span>}
        </li>
    )
}

export default Option;