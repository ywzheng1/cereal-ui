import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

export type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** set input to disabled */
    disabled?: boolean;
    /** set input size, support lg and sm */
    size?: InputSize;
    /** add icon at right, support fontawesome icons */
    icon?: IconProp;
    /** add prepend element at left */
    prepend?: string | ReactElement;
    /** add append element at right */
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}


/**
 * Input, use mouse or keyboard to enter value
 * 
 * ~~~js
 * // How to import
 * import { Input } from 'cereal-ui'
 * ~~~
 *
 * Support all HTMLInput native properties
 */

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {disabled, size, icon, prepend, append, style, ...restProps} = props

    const classes = classNames('cereal-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
          return ''
        }
        return value
    }

    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }

    return(
        <div className={classes} style={style}>
            {prepend && <div className='cereal-input-group-prepend'>{prepend}</div>}
            {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input 
                ref={ref}
                className='cereal-input-inner'
                disabled={disabled}
                {...restProps}/>
            {append && <div className='cereal-input-group-append'>{append}</div>}
        </div>
    )
})

export default Input;