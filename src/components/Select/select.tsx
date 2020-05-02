import React, { FC, useState, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { OptionProps } from './option'
import Input from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

export interface SelectProps {
    disabled?: boolean;
    defaultValue?: string | string[];
    className?:    string;
    placeholder?:  string;
    multiple?:     boolean;
    name?:         string;
    onChange?:        (selectedValue: string, selectedValues: string[]) => void;
    onVisibleChange?: (visible: boolean) => void;
}

interface ISelectContext {
    multiple?:     boolean;
    onVisibleChange?: (visible: boolean) => void;
    selectedValues: string[];
    onSelect?: (value: string, isSelect?: boolean) => void;
}

export const SelectContext = createContext<ISelectContext>({selectedValues: []})

export const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue,
        placeholder, 
        disabled, 
        multiple, 
        name, 
        onChange, 
        onVisibleChange,
        children
    } = props

    const [ menuOpen, setOpen ] = useState(false)
    const [ value, setValue ] = useState(typeof defaultValue === 'string' ? defaultValue : '')
    const [ selectedValues, setSelectedValues ] = useState<string[]>(Array.isArray(defaultValue)? defaultValue :[])

    const handleOptionClick = (value: string, isSelect?: boolean) =>{
        if(!multiple) {
            setOpen(false)
            isSelect ? setValue('') : setValue(value)
        } else {
            setValue('')
        }

        if(multiple) {
            if (isSelect) {
                setSelectedValues(selectedValues.filter(v => v !== value))
            } else {
                !selectedValues.includes(value) && setSelectedValues([...selectedValues, value])
            }
           
        }

        if(onChange) {
            onChange(value, [...selectedValues, value])
        }
    }

    const passedContext:ISelectContext = {
        multiple,
        onVisibleChange,
        selectedValues,
        onSelect: handleOptionClick
    }

    const classes = classNames('cereal-select', {
        'is-disabled': disabled,
        'menu-is-open': menuOpen,
        'is-multiple': multiple 
    })

    const renderChildren = () => {
        return (
            React.Children.map(children, (child, index) => {
                const childElement = child as FunctionComponentElement<OptionProps>

                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            })
        )
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
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
                value={multiple ? '' : value}
                readOnly
                name={name}
                icon="angle-down"
            />
            <SelectContext.Provider value={passedContext}>
                <Transition 
                    in={menuOpen}
                    animation="zoom-in-top"
                    timeout={300}
                >
                    <ul className='cereal-select-dropdown'>
                        {renderChildren()}
                    </ul>
                </Transition>
            </SelectContext.Provider>
            {
                multiple && 
                <div className='multiple-selected-tags'>
                    {selectedValues.map(value => {
                        return (
                            <span className='selected-tags'>{value} 
                            <Icon className='selected-tags-icon' icon="times" onClick={() => handleOptionClick(value,true)}/>
                            </span>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Select;