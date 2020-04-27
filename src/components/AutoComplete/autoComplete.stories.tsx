import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete , DataSourceType} from './autoComplete'

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const SimpleComplete = () => {
    const fruits = ['🍎apple', '🍌banana', '🍑peach', '🍒cherry', '🍉watermelon', '🍈melon', '🥥oconut', '🍅tomato']


    const handleFetch = (query: string) => {
        return fruits.filter( name => name.includes(query)).map( name => ({value: name}))
    }

    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
        />
    )
}

const AsyncAutoComplete = () => {
    const handleFetch = (query:string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
                .then(res => res.json())
                .then(({items}) => {
                    console.log(items)
                    return items.slice(0, 10).map((item:any) => ({value: item.login, ...item}))
                })
    }

    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
        />
    )
}

const CustomRender = () => {

    const handleFetch = (query:string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
                .then(res => res.json())
                .then(({items}) => {
                    console.log(items)
                    return items.slice(0, 10).map((item:any) => ({value: item.login, ...item}))
                })
    }

    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GithubUserProps>
        return (
        <>
            <h6>Name: {itemWithGithub.login}</h6>
            <p>url: {itemWithGithub.url}</p>
        </>
        )
    }

    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        />
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)
    .add('Async Dropdown', AsyncAutoComplete)
    .add('Custom Render Dropdown', CustomRender)
