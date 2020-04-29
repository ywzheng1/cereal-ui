import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './select'
import Option from './option'

const basicSelect = () => (
    <Select onChange={action('selected!')} placeholder='Please select'>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' />
    </Select>
)

const selectWithDefaultValue = () => (
    <Select onChange={action('selected!')} defaultValue='3'>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' />
    </Select>
)

const multipleSelect = () => (
    <Select onChange={action('selected!')} multiple={true}>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' />
    </Select>
)

storiesOf('Select Component', module)
    .add('Select', basicSelect)
    .add('Default Selected', selectWithDefaultValue)
    .add('Multiple Select', multipleSelect)