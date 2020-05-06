import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    /** Give button extra className for customization */
    className?: string;
    /** Make button disable */
    disabled?:  boolean;
    /** Set button size */
    size?:      ButtonSize;
    /** Set button type: primary, default, danger, link */
    btnType?:   ButtonType;
    children:   React.ReactNode;
    href?:      string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/**
 * ## Button Component  
 * Most common component on websites, supoort all HTML button and a tag's property
 * #### How to import 
 * 
 * ~~~js
 * import { Button } from 'cereal-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    const { btnType, className, disabled, size, children, href, ...restProps } = props

    // btn, btn-lg, btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if( btnType === 'link'&& href ) {
        return(
        <a
            className = {classes}
            href={href}
            {...restProps}
        >
            {children}
        </a>
        )
    }
    else {
        return (
            <button
                className = {classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }

} 

Button.defaultProps = {
    disabled: false,
    btnType:  'default'
}

export default Button;