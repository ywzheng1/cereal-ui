import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { SelectContext } from './select'
import Icon from '../Icon/icon'

export interface OptionProps {
    index?:    string;
    /** Value for select item, this value can't be duplicate */
    value:     string;
    /** Label for selection, if empty, will use value as label */
    label?:    string;
    /** If the select item is not able to click */
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

Option.displayName = 'Option'

export default Option;