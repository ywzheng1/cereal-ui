import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete } from './autoComplete'

const SimpleComplete = () => {
    const fruits = ['apple', 'banana', 'peach', 'cherry', 'watermelon', 'melon', 'coconut', 'tomato']
    const handleFetch = (query: string) => {
        return fruits.filter( name => name.includes(query))
    }

    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
        />
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)
