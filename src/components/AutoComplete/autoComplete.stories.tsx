import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete , DataSourceType} from './autoComplete'

interface FruitsProps {
    value: string;
    number: number;
}

const SimpleComplete = () => {
    const fruits = ['apple', 'banana', 'peach', 'cherry', 'watermelon', 'melon', 'coconut', 'tomato']
    
    const fruitsWithNumber = [
        {value: 'apple',      number: 1},
        {value: 'banana',     number: 2},
        {value: 'peach',      number: 3},
        {value: 'cherry',     number: 4},
        {value: 'watermelon', number: 5},
        {value: 'melon',      number: 6},
        {value: 'coconut',    number: 7},
        {value: 'tomato',     number: 8}
    ]
    const handleFetch = (query: string) => {
        return fruits.filter( name => name.includes(query)).map( name => ({value: name}))
    }

    // const handleFetch = (query: string) => {
    //     return fruitsWithNumber.filter( fruit => fruit.value.includes(query) )
    // }

    // const renderOption = (item: DataSourceType) => {
    //     const itemWithNumber = item as DataSourceType<FruitsProps>
    //     return (
    //         <>
    //             <h2>Fruit: {itemWithNumber.value}</h2>
    //             <p>Number: {itemWithNumber.number}</p>
    //         </>
    //     )
    // }

    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            //renderOption={renderOption}
        />
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)
