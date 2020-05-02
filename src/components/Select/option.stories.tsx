import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './select'
import Option from './option'

const basicSelect = () => (
    <Select onVisibleChange={action('visible')} onChange={action('changed')} placeholder='Please select'>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' disabled />
    </Select>
)

const selectWithDefaultValue = () => (
    <Select onVisibleChange={action('visible')} onChange={action('changed')} defaultValue='3'>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' disabled />
    </Select>
)

const multipleSelect = () => (
    <Select onVisibleChange={action('visible')} onChange={action('changed')} multiple={true}>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' disabled />
    </Select>
)

const diabledSelect = () => (
    <Select onVisibleChange={action('visible')} onChange={action('changed')} disabled placeholder='Disabled : )'>
        <Option value='1' />
        <Option value='2' />
        <Option value='3' />
        <Option value='4' disabled />
    </Select>
)

const disabledSelectText = `
Set input to disabled. Doesn't allow pointer event.
`

storiesOf('Select Component', module)
    .add('Select', basicSelect)
    .add('Default Selected', selectWithDefaultValue)
    .add('Multiple Select', multipleSelect)
    .add('Disabled', diabledSelect, {info: { source: true, text: disabledSelectText}})