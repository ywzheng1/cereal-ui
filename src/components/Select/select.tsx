import React, { FC, useState, SelectHTMLAttributes, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { OptionProps } from './option'
import Input from '../Input/input'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLElement>, 'onChange'> {
    defaultValue?: string | string[];
    className?:    string;
    placeholder?:  string;
    disabled?:     boolean;
    multiple?:     boolean;
    name?:         string;
    onChange?:        (selectedValue: string, selectedValues: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}

export const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue, 
        className, 
        placeholder, 
        disabled, 
        multiple, 
        name, 
        onChange, 
        onVisibleChange,
        children,
        ...restProps
    } = props

    const [ menuOpen, setOpen ] = useState(false)
    const [ value, setValue ] = useState(typeof defaultValue === 'string' ? defaultValue : '')

    const classes = classNames('cereal-select', {
        'is-disabled': disabled,
        'menu-is-open': menuOpen,
        'is-multiple': multiple 
    })

    const renderChildren = () => {
        return (
            React.Children.map(children, (child, index) => {
                const childElement = child as FunctionComponentElement<OptionProps>
                const value = childElement.props.value

                const content = () => {
                    return (
                        <li>{value}</li>
                    )
                }

                return React.cloneElement(content(), {
                    index: index.toString()
                })
            })
        )
    }
  
    const handleChange = (e: React.ChangeEvent, value: string) => {
        console.log(value)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('clicked')
        if(!disabled) {
            setOpen(!menuOpen)
            if(onVisibleChange) {
                onVisibleChange(!menuOpen)
            }
        }
    }

    return(

        <div className={classes} onClick={handleClick}>
            <Input
                placeholder={placeholder && placeholder}
                value={value}
            />
            <ul className='cereal-select-dropdown'>
                {renderChildren()}
            </ul>
        </div>
    )
}

export default Select;