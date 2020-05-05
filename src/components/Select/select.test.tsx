import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import { config } from 'react-transition-group'
import Select, { SelectProps } from './select'
import Option from './option'

config.disabled = true

jest.mock('../Icon/icon', () => {
    return (props: any) => {
        return <span onClick={props.onClick}>{props.icon}</span>
    }
})

const testProps: SelectProps = {
    name: 'cereal-select',
    defaultValue: 'c option',
    onChange: jest.fn(),
    onVisibleChange: jest.fn(),
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
    inputElement: HTMLInputElement

describe('Select Component', () =>{

    beforeEach(() => {
        wrapper         = render(generateSelect(testProps))
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
        // check the events
        expect(testProps.onVisibleChange).toHaveBeenCalledWith(false)
        expect(testProps.onChange).toHaveBeenCalledWith('b option', ['b option'])
        expect(inputElement.value).toEqual('b option')
   
        // click input box again
        fireEvent.click(inputElement)
        const disabledElement = wrapper.getByText('disabled') as HTMLElement
        // check disabled item class
        expect(disabledElement).toHaveClass('is-disabled')
        // then try to click disabled item
        fireEvent.click(disabledElement)
        // expect value doesn't change to disabled
        expect(inputElement.value).toEqual('b option')
    })

    it('Should able to select multiple tags when multiple set to true', () => {
        cleanup()
        const wrapper = render(generateSelect(multiSelectProps))
        const inputElement = wrapper.getByPlaceholderText('Please Select') as HTMLInputElement
        fireEvent.click(inputElement)
       
        expect(wrapper.container.querySelectorAll('li').length).toEqual(4)
        
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
        // remove acitve class
        expect(secondElement).not.toHaveClass('is-selected')
        // Should have only 1 selected now
        expect(selectedTags.querySelectorAll('.selected-tags').length).toEqual(1)

        //remove placeholder
        expect(inputElement.placeholder).toEqual('')

        // Click tag close
        fireEvent.click(wrapper.getByText('times'))
        // Should have no tag selected
        expect(selectedTags.querySelectorAll('.selected-tags').length).toEqual(0)
        //refill placeholder text
        expect(inputElement.placeholder).toEqual('Please Select')

    })

    it('Should disabled select component when disabled is true', () => {
        cleanup()
        const wrapper = render(generateSelect(disabledProps))
        const inputElement = wrapper.getByPlaceholderText('Please Select') as HTMLInputElement
        expect(inputElement).toBeInTheDocument()
        expect(wrapper.container.querySelector('.cereal-select')).toHaveClass('is-disabled')
        fireEvent.click(inputElement)

        expect(wrapper.container.querySelectorAll('li').length).toEqual(0)
    })
})