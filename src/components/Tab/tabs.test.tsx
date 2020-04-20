import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Tabs, { TabProps } from './tabs';
import TabItem from './tabItem';

const generateTabs = (props: TabProps) => {
    return(
        <Tabs {...props}>
            <TabItem index={0} label='card1'>this is card one</TabItem>
            <TabItem index={1} label='card2'>this is card two</TabItem>
            <TabItem index={2} label='card3' disabled={true}>this is card three</TabItem>
        </Tabs>
    )
}


const testProps: TabProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    type: 'line'
}

let wrapper: RenderResult

describe('test Tabs and TabItem component', () => {

    beforeEach(() => {
        wrapper = render(generateTabs(testProps))
    })

    it('should render Tabs and TabItem on default props', () => {

    })
})