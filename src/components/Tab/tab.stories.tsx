import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tabs from './tabs'
import TabItem from './tabItem'

const defaultTabs = () => (
    <Tabs onSelect={action('selected')}>
        <TabItem label='card1'>this is card one</TabItem>
        <TabItem label='card2'>this is card two</TabItem>
        <TabItem label='card3'>this is card three</TabItem>
    </Tabs>
)


storiesOf('Tab Component', module)
    .add('Tabs', defaultTabs)