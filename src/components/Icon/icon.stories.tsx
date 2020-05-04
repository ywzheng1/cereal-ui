import React from 'react'
import { storiesOf } from '@storybook/react'

import Icon from './icon'

const basictIcon = () => (
    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Icon icon='times' />
        <Icon icon='anchor' />
        <Icon icon='angle-down' />
        <Icon icon='angle-up' />
        <Icon icon='angle-left' />
        <Icon icon='angle-right' />
        <Icon icon='arrow-circle-down' />
        <Icon icon='arrow-circle-up' />
        <Icon icon='mobile' />
        <Icon icon='bath' />
        <Icon icon='bell' />
    </div>
)

storiesOf('Icon Component', module)
    .add('Icon', basictIcon)