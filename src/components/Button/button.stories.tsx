import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
    <div>
        <Button size='lg'>large button</Button>
        <Button size='sm'>small button</Button>
    </div>
)

const buttonWithType = () => (
    <div>
        <Button btnType='primary'>Primary</Button>
        <Button btnType='default'>Default</Button>
        <Button btnType='danger'>Danger</Button>
        <Button btnType='link' href='https://google.com'>Link Button</Button>
    </div>
)

storiesOf('Button Component', module)
    .add('Button', defaultButton)
    .add('different size Button', buttonWithSize)
    .add('different type Button', buttonWithType)