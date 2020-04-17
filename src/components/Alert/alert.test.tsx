import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertType, BaseAlertProps, AlertCloseButton, AlertCloseButtonProps } from './alert'

const defaultProps: BaseAlertProps = {
    message: 'alert message',
    alertType: AlertType.Default,
}

const buttonProps:AlertCloseButtonProps = {
    onClick: jest.fn(),
}


describe('test Alert component', () => {
    it('should render the correct default alert component', () => {
        const wrapper = render(<Alert {...defaultProps}/>)
        const element = wrapper.getByTestId('alert')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('alert alert-default')
    })

    it('should close alert box when click on "x" button', () => {
        const wrapper = render(<AlertCloseButton {...buttonProps}>x</AlertCloseButton>)
        const element = wrapper.getByText('x')
        expect(element).toBeInTheDocument()
        fireEvent.click(element)
        expect(buttonProps.onClick).toHaveBeenCalled()
    })
})