import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import Select, { SelectProps } from './select'
import Option from './option'

jest.mock('../Icon/icon', () => {
    return (props: any) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})

const testProps: SelectProps = {
    name: 'cereal-select',
    defaultValue: 'c option'
}

const multiSelectProps: SelectProps = {
    multiple: true
}

const disabledProps: SelectProps = {
    disabled: true
}

const generateSelect = ( props: SelectProps ) => {
    return (
        <Select {...props}>
            <Option value='a option' />
            <Option value='b option' />
            <Option value='c option' />
            <Option value='disabled' disabled/>
        </Select>
    )
}

let wrapper: RenderResult, 
    selectElement: HTMLElement, 
    inputElement: HTMLInputElement

describe('Select Component', () =>{

    beforeEach(() => {
        wrapper         = render(generateSelect(testProps))
        selectElement   = wrapper.getByTestId('test-select')
        inputElement    = wrapper.getByPlaceholderText('Please Select') as HTMLInputElement
    })

    it('Should render select component correctly with correct default value', async () => {
        expect(inputElement).toBeInTheDocument()
        expect(inputElement.value).toEqual('c option')
        fireEvent.click(inputElement)
        await wait(() => {
            expect(wrapper.queryByText('a option')).toBeInTheDocument()
        })
        expect(wrapper.container.querySelectorAll('li').length).toEqual(4)
        const secondElement = wrapper.queryByText('b option') as HTMLElement
        fireEvent.click(secondElement)
        expect(inputElement.value).toEqual('b option')
        const disabledElement = wrapper.queryByText('disabled') as HTMLElement
        fireEvent.click(disabledElement)
        // expect value doesn't change
        expect(inputElement.value).toEqual('b option')
    })

    it('Should able to select multiple tags when multiple set to true', async () => {
        cleanup()
        const wrapper = render(generateSelect(multiSelectProps))
        const inputElement = wrapper.getByPlaceholderText('Please Select') as HTMLInputElement
        fireEvent.click(inputElement)
        await wait(() => {
            expect(wrapper.container.querySelectorAll('li').length).toEqual(4)
        })
        const firstElement = wrapper.queryByText('a option') as HTMLElement
        const secondElement = wrapper.queryByText('b option') as HTMLElement
        // click first option
        fireEvent.click(firstElement)
        // add selected classname 
        expect(firstElement).toHaveClass('is-selected')
        // click second option
        fireEvent.click(secondElement)
        // add selected classname 
        expect(secondElement).toHaveClass('is-selected')
        const selectedTags = wrapper.getByTestId('test-selected-tags')
        expect(selectedTags.querySelectorAll('.selected-tags').length).toEqual(2)

        // click second option again
        fireEvent.click(secondElement)
        expect(secondElement).not.toHaveClass('is-selected')

        fireEvent.click(wrapper.getByText('times'))

        console.log(wrapper.debug())
        expect(selectedTags.querySelectorAll('.selected-tags').length).toEqual(1)
    })

    it('Should disabled select component when disabled is true', async () => {
        cleanup()
        const wrapper = render(generateSelect(disabledProps))
        const inputElement = wrapper.getByPlaceholderText('Please Select') as HTMLInputElement
        expect(inputElement).toBeInTheDocument()
        expect(wrapper.container.querySelector('.cereal-select')).toHaveClass('is-disabled')
        fireEvent.click(inputElement)

        await wait(() => {
            expect(wrapper.container.querySelectorAll('li').length).toEqual(0)
        })

    })
})