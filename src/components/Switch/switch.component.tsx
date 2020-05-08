import React, { FC, useState } from 'react'
import classNames from 'classnames';

export type SwitchSize = 'lg' | 'sm'

export interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    size?: SwitchSize;
    onChange?: (check:boolean) => void;
}

export const Switch: FC<SwitchProps> = (props) => {
    const { checked, disabled, onChange } = props

    const [ check, setCheck ] = useState(checked ? checked : false)

    const classes = classNames('cereal-switch', {
        'disabled': disabled
    })

    const onSwitchChange = (disabled: boolean | undefined) => {
        if(!disabled) {
            setCheck(!check)
            if(onChange) {
                onChange(!check)
            }
        }
    }
    
    return(
        <label className={classes} onChange={() => onSwitchChange(disabled)}>
            <input type="checkbox" checked={check} />
            <span className="cereal-slider round"></span>
        </label>
    )
}

export default Switch;