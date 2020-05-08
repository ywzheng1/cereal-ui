import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Switch } from './switch.component'
import Icon from '../Icon/icon'

const defaultSwitch = () => (
    <Switch checked onChange={action('changed')} />
)

const withTextandIcon = () => (
    <>
        <Switch 
            onChange={action('changed')} 
            checkedChildren='On'
            unCheckedChildren='Off'
        />
        <br/>
        <Switch 
            checked 
            onChange={action('changed')} 
            checkedChildren='🚀'
            unCheckedChildren='🚢'
        />
        <br/>
        <Switch 
            checked 
            onChange={action('changed')} 
            checkedChildren={<Icon icon='check'/>}
            unCheckedChildren={<Icon icon='times'/>}
        />
    </>
)

const differentSizeSwitch = () => (
    <>
    <Switch 
        checked 
        onChange={action('changed')} 
        size='sm'
        checkedChildren='On'
        unCheckedChildren='Off'
    />
    <br/>
    <Switch 
        checked 
        onChange={action('changed')} 
        checkedChildren='On'
        unCheckedChildren='Off'
    />
    </>
)

const disabledSwitch = () => (
    <Switch disabled />
)

storiesOf('Switch Component', module)
    .add('Switch', defaultSwitch)
    .add('With text and icon', withTextandIcon)
    .add('Different size', differentSizeSwitch)
    .add('Disabled', disabledSwitch)