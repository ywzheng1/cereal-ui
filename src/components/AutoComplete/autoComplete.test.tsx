import React from 'react'
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

jest.mock('../Icon/icon', () => {
    return (props: any) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})

const testArray = [
    {value: 'ab', number: 11},
    {value: 'abc', number: 1},
    {value: 'b', number: 4},
    {value: 'c', number: 15},
]

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}

interface TestWithNumberProps {
    value: string;
    number: number;
}

const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<TestWithNumberProps>
    return (
    <>
        <h6>Name: {itemWithNumber.value}</h6>
        <p>Number: {itemWithNumber.number}</p>
    </>
    )
}

// Async
const handleAsyncFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

let wrapper: RenderResult, inputNode: HTMLInputElement

describe('test AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render( <AutoComplete {...testProps}/> )
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })

    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        // should have two suggestion items
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
        // click the first item
        fireEvent.click(wrapper.getByText('ab'))
        expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
        // fill the input
        expect(inputNode.value).toBe('ab')
    })

    it('should provide keyboard support', async () => {
        // input change
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        const firstResult = wrapper.queryByText('ab')
        const secondResult = wrapper.queryByText('abc')

        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(firstResult).toHaveClass('item-highlighted')
        // arrow down
        fireEvent.keyDown(inputNode, { keyCode: 40 })
        expect(secondResult).toHaveClass('item-highlighted')
        // arrow up
        fireEvent.keyDown(inputNode, { keyCode: 38 })
        expect(firstResult).toHaveClass('item-highlighted')
        // press enter
        fireEvent.keyDown(inputNode, { keyCode: 13 })
        expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })

    it('click outside should hide the dropdown', async () => {
        // input change
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })
        fireEvent.click(document)
        expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    })

    it('renderOption should generate the right template', async () => {
        cleanup()

        const testProps: AutoCompleteProps = {
            fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
            onSelect: jest.fn(),
            placeholder: 'auto-complete',
            renderOption: renderOption
        }

        const wrapper = render( <AutoComplete {...testProps}/> )
        const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
        // input change
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await wait(() => {
            expect(wrapper.queryByText('Name: ab')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('h6').length).toEqual(2)
        expect(wrapper.container.querySelectorAll('p').length).toEqual(2)
        expect(wrapper.container.querySelector('h6')).toHaveTextContent('Name: ab')
    })

    it('async fetchSuggestions should works correctly', async () => {
        cleanup()

        const testProps: AutoCompleteProps = {
            fetchSuggestions: handleAsyncFetch,
            onSelect: jest.fn(),
            placeholder: 'auto-complete'
        }

        const wrapper = render( <AutoComplete {...testProps}/> )
        const inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement

        // input change
        fireEvent.change(inputNode, {target: {value: 'a'}})
        await wait(() => {
            // console.log(wrapper.debug())
            expect(wrapper.queryByText('A')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(10)
    })
})