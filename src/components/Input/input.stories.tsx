import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Input } from './input'

// const ControlledInput = () => {
//     const [value, setValue] = useState()
//     return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}}/>
//   }

const defaultInput = () => (
    <>
        <Input 
            style={{width: '300px'}}
            placeholder='placeholder text' 
            onChange={action('changed')} 
        />
    </>
)

const disabledInput = () => (
    <Input 
        style={{width: '300px'}}
        placeholder='placeholder text' 
        disabled={true}
    />
)

const inputWithIcon = () => (
    <Input 
        style={{width: '300px'}}
        placeholder='placeholder with icon' 
        icon='search' 
        onChange={action('changed')} 
    />
)

const inputWithDifferentSizes = () => (
    <>
        <Input 
            style={{width: '300px'}}
            placeholder='placeholder text' 
            size='lg'
            onChange={action('changed')}
        />
        <Input 
            style={{width: '300px'}}
            placeholder='placeholder text' 
            size='sm'
            onChange={action('changed')}
        />
    </>
)

const inputWithPrependAndAppend = () => (
    <>
        <Input 
            style={{width: '300px'}}
            placeholder='placeholder text' 
            prepend='$' 
            onChange={action('changed')}
        />
        <Input 
            style={{width: '300px'}}
            placeholder='placeholder text' 
            append='.com'
            onChange={action('changed')}
        />
    </>
)

storiesOf('Input Component', module)
    .add('Input', defaultInput)
    .add('Disabled Input', disabledInput)
    .add('Input with icon', inputWithIcon)
    .add('Different size Input', inputWithDifferentSizes)
    .add('Prepend and Append', inputWithPrependAndAppend)
