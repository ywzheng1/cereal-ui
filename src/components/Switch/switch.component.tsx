import React, { FC, useState, FormEvent } from 'react'
import classNames from 'classnames';

export type SwitchSize = 'default' | 'sm'

export interface SwitchProps {
    /** additional class to Switch */
    className?: string;
    /** determine whether the Switch is checked */
    checked?: boolean;
    /** content to be shown when the state is checked */
    checkedChildren?: string | React.ReactNode;
    /** content to be shown when the state is unchecked */
    unCheckedChildren?: string | React.ReactNode;
    /** Disable switch */
    disabled?: boolean;
    /**  the size of the Switch, options: default | sm */
    size?: SwitchSize;
    /** trigger when the checked state is changing */
    onChange?: (checked:boolean) => void;
}

export const Switch: FC<SwitchProps> = (props) => {
    const { 
        checked, 
        className, 
        disabled, 
        onChange, 
        checkedChildren, 
        unCheckedChildren, 
        size 
    } = props

    const [ check, setCheck ] = useState(checked ? checked : false)

    const classes = classNames('cereal-switch', className, {
        'disabled': disabled,
        'small': size === 'sm'
    })

    const onSwitchChange = (disabled: boolean | undefined, e: FormEvent) => {
        e.stopPropagation()
        if(!disabled) {
            setCheck(!check)
            if(onChange) {
                onChange(!check)
            }
        }
    }
    
    return(
        <label 
            className={classes} 
            onChange={(e) => onSwitchChange(disabled, e)} 
        >
            <input type="checkbox" checked={check} />
            <span className="cereal-slider round">
                {check 
                ? 
                <span className='checked-children'>
                    {checkedChildren}
                </span> 
                : 
                <span className='unchecked-children'>
                    {unCheckedChildren}
                </span>
                }
            </span>
        </label>
    )
}

export default Switch;