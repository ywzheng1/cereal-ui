import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Switch } from './switch.component'

const defaultSwitch = () => (
    <Switch checked onChange={action('changed')} />
)

const disabledSwitch = () => (
    <Switch disabled />
)

storiesOf('Switch Component', module)
    .add('Switch', defaultSwitch)
    .add('Disabled', disabledSwitch)