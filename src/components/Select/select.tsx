import React, { FC, useState, useRef, useEffect, createContext, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import useClickOutside from '../../hooks/useClickOutside'
import { OptionProps } from './option'
import Input from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

export interface SelectProps {
    /** If input is disabled or not */
    disabled?:     boolean;
    /** Set default selected value */
    defaultValue?: string | string[];
    /** Allow custom className */
    className?:    string;
    /** Add a placeholder text to input component */
    placeholder?:  string;
    /** If allow multiple selection */
    multiple?:     boolean;
    /** Select input's name property */
    name?:         string;
    /** A callback function when selected value changes */
    onChange?:        (selectedValue: string, selectedValues: string[]) => void;
    /** A callback function when dropdown show or hide */
    onVisibleChange?: (visible: boolean) => void;
}

interface ISelectContext {
    multiple?:     boolean;
    onVisibleChange?: (visible: boolean) => void;
    selectedValues: string[];
    onSelect?: (value: string, isSelect?: boolean) => void;
}

export const SelectContext = createContext<ISelectContext>({selectedValues: []})


/**
 * ### ✨ Select Component
 * Popup a dropdown list for user to pick, replaced native select  
 * Also support multi-select option  
 * When dropdown opened, click outside also allow user to close dropdown
 * 
 * ### How to import
 * 
 * ~~~js
 * import { Select } from 'cereal-ui'
 * // Then able to use <Select> and <Option>
 * ~~~
 */

export const Select: FC<SelectProps> = (props) => {
    const {
        defaultValue,
        placeholder, 
        className,
        disabled, 
        multiple, 
        name, 
        onChange, 
        onVisibleChange,
        children
    } = props

    const input = useRef<HTMLInputElement>(null)
    const containerWidth = useRef(0)
    const containerRef = useRef<HTMLInputElement>(null)

    const [ menuOpen, setOpen ] = useState(false)
    const [ value, setValue ] = useState(typeof defaultValue === 'string' ? defaultValue : '')
    const [ selectedValues, setSelectedValues ] = useState<string[]>(Array.isArray(defaultValue)? defaultValue :[])

    const handleOptionClick = (value: string, isSelect?: boolean) =>{
        if(!multiple) {
            setOpen(false)
            setValue(value)
            if (onVisibleChange) {
                onVisibleChange(false)
            }
        } else {
            setValue('')
        }

        let updatedValues = [value]

        if(multiple) {
            updatedValues = isSelect ? selectedValues.filter((v) => v !== value) :  [...selectedValues, value]
            setSelectedValues(updatedValues)
        }

        if(onChange) {
            onChange(value, updatedValues)
        }
    }

    useEffect(() => {
        // focus input
        if (input.current) {
          input.current.focus()
          if (multiple && selectedValues.length > 0) {
            input.current.placeholder = ''
          } else {
            if (placeholder) input.current.placeholder = placeholder
          }
        }
      }, [selectedValues, multiple, placeholder])
    
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

    const classes = classNames('cereal-select', className, {
        'is-disabled': disabled,
        'menu-is-open': menuOpen,
        'is-multiple': multiple 
    })

    const renderChildren = () => {
        return (
            React.Children.map(children, (child, index) => {
                const childElement = child as FunctionComponentElement<OptionProps>

                if (childElement.type.displayName === 'Option') {
                    return React.cloneElement(childElement, {
                        index: `select-${index}`
                    })
                } else {
                    console.error("Warning: select component has a child which is not a Option component")
                }
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
        <div className={classes} ref={containerRef} data-testid="test-select">
            <div onClick={handleClick} data-testid="test-select-input">
                <Input
                    ref={input}
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
                <div 
                    className='multiple-selected-tags' 
                    style={{maxWidth: containerWidth.current - 32}}
                    data-testid="test-selected-tags"
                >
                    {selectedValues.map(value => {
                        return (
                            <span className='selected-tags' key={`select-item-${value}`}>{value} 
                            <Icon className='selected-tags-icon' icon="times" onClick={() => handleOptionClick(value,true)}/>
                            </span>
                        )
                    })}
                </div>
            }
        </div>
    )
}

Select.defaultProps = {
    name: 'cereal-select',
    placeholder: 'Please Select'
}

export default Select;