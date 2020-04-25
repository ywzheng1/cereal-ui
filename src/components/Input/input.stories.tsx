import React from 'react'
import { storiesOf } from '@storybook/react'

import Input from './input'

const defaultInput = () => (
    <Input placeholder='placeholder text'/>
)

const disabledInput = () => (
    <Input placeholder='placeholder text' disabled={true}/>
)

const inputWithIcon = () => (
    <Input placeholder='disabled' icon='search' />
)

const inputWithDifferentSizes = () => (
    <>
        <Input placeholder='placeholder text' size='lg'/>
        <Input placeholder='placeholder text' size='sm'/>
    </>
)

const inputWithPrependAndAppend = () => (
    <>
        <Input placeholder='placeholder text' prepend='$' />
        <Input placeholder='placeholder text' append='.com'/>
    </>
)

storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('Disabled Input', disabledInput)
    .add('Input with icon', inputWithIcon)
    .add('Different size Input', inputWithDifferentSizes)
    .add('Prepend and Append', inputWithPrependAndAppend)
