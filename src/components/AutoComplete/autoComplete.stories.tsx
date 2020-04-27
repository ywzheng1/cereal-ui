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

const simpleCompletetext = `
### Example Code  
~~~javascript
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
~~~
<hr>
`


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

const AsyncAutoCompleteText = `
### EXAMPLE CODE
This example code shows how to use async fetch to return a suggestions list. 
~~~javascript
const handleFetch = (query:string) => {
    return fetch('https://api.github.com/search/users?q' + query)
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
~~~
`

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


const customRenderText = `
### EXAMPLE CODE
This example code use renderOption to customized suggestion list.  
Data used github user api for example. 
Suggestion list returns 10 users based on input value.
~~~javascript
const handleFetch = (query:string) => {
    return fetch('https://api.github.com/search/users?q=' + query)
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
~~~
`

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete, {info: {source: false, text: simpleCompletetext}})
    .add('Async Dropdown', AsyncAutoComplete, {info: {source: false, text: AsyncAutoCompleteText}})
    .add('Custom Render Dropdown', CustomRender, {info: {source: false, text: customRenderText}})
