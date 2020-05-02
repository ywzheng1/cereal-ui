import React, { FC, useState, useRef, useEffect, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
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

    const containerWidth = useRef(0)
    const containerRef = useRef<HTMLInputElement>(null)

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
    
    useEffect(() => {
        if (containerRef.current) {
          containerWidth.current = containerRef.current.getBoundingClientRect().width
        }
    })

    useClickOutside(containerRef, () => { 
        setOpen(false)
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false)
        }
    })

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
        <div className={classes} ref={containerRef}>
            <div onClick={handleClick}>
                <Input
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    name={name}
                    icon="angle-down"
                />
            </div>
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
                    <div className='multiple-selected-tags' style={{maxWidth: containerWidth.current - 32}}>
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