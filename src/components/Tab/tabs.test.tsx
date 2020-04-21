import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import Tabs, { TabProps } from './tabs';
import TabItem from './tabItem';

const generateTabs = (props: TabProps) => {
    return(
        <Tabs {...props}>
            <TabItem label='card1'>content1</TabItem>
            <TabItem label='card2'>content2</TabItem>
            <TabItem label='card3' disabled={true}>content3</TabItem>
        </Tabs>
    )
}


const testProps: TabProps = {
    defaultIndex: 0,
    className: 'test',
    onSelect: jest.fn(),
    type: 'line'
}

let wrapper: RenderResult, tabElement: HTMLElement, activeTab: HTMLElement, disabledTab: HTMLElement, tabContent: HTMLElement

describe('test Tabs and TabItem component', () => {

    beforeEach(() => {
        wrapper     = render(generateTabs(testProps))
        tabElement  = wrapper.getByTestId('test-tabs')
        activeTab   = wrapper.getByText('card1')
        disabledTab = wrapper.getByText('card3')
        tabContent  = wrapper.getByText('content1')
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render Tabs and TabItem on default props', () => {
        expect(tabElement).toBeInTheDocument()
        expect(tabElement).toHaveClass('cereal-tabs test')
        expect(tabElement.querySelectorAll(':scope > ul').length).toEqual(1)
        expect(activeTab).toHaveClass('cereal-tabs-nav-item is-active')
        expect(disabledTab).toHaveClass('cereal-tabs-nav-item disabled')
        expect(tabContent).toBeInTheDocument()
        expect(tabContent).toHaveClass('cereal-tabs-panel')
    })

    it('clicked tab should change to active tab', () => {
        const { queryByText, getByText } = wrapper
        const cardTwo = getByText('card2')
        fireEvent.click(cardTwo)
        expect(queryByText('card1')).not.toHaveClass('is-active')
        expect(cardTwo).toHaveClass('is-active')
        expect(queryByText('content2')).toBeInTheDocument()
        expect(queryByText('content1')).not.toBeInTheDocument()
        expect(testProps.onSelect).toHaveBeenCalledWith(1) //1 is index number
    })
})