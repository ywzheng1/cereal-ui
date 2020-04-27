import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'


interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** return suggestion list, support local data and aysnc promise */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** when select from suggestion list, trigger this call back */
    onSelect?: (item: DataSourceType) => void;
    /** Optional render option, can customize suggestion list looks */
    renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * Input support auto complete feature. Support async also.
 * Also support keyboard selections.
 * 
 * #### How to import 
 * 
 * ~~~js
 * import { AutoComplete } from 'cereal-ui'
 * ~~~
 */

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, renderOption, value,...restProps } = props

    const [ inputValue, setInputValue ] = useState(value as string)
    const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
    const [ loading, setLoading ] = useState(false)
    const [ highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debouncedValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef, () => setSuggestions([]))

    useEffect(() => {
        if(debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue)
            if(results instanceof Promise) {
                console.log('trigger')
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue])

    const highlight = (index:number) => {
        if(index < 0) index = 0
        if(index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                break
            default:
                break
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const renderTemplete = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <ul className='cereal-suggestion-list'>
                {suggestions.map((item, index) => {
                    const classes = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    })
                    return (
                        <li key={index} className={classes} onClick={() => handleSelect(item)}>
                            {renderTemplete(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className='cereal-auto-complete' ref={componentRef}>
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            { loading && <ul><Icon icon='spinner' spin /></ul>}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete;