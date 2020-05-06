import React from 'react'
import { storiesOf } from '@storybook/react'

const markdownText = `
### 🍪 Welcome to Cereal-UI
A React UI components library.

### Installation

~~~javascript
npm install cereal-ui --save
~~~  

### Usage

~~~javascript
// import styles
import 'cereal-ui/dist/index.css'
// Import component
import { Button } from 'cereal-ui'
~~~

## What this project uses:
- 🔥 React with React hooks
- 🔥 Typescript
- 🚨 Jest and React Testing Library for unit tests
- 📚 Storybook for local documentation and export to static page
- 📚 React-doc-gen for auto documentation generation
- 📦 Third party libraries (react-fontawsome, react0transition-group)
- 🌹 Styles (Sass).
`


storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <h3>Welcome to my component display</h3>
    )
  }, { info : { text: markdownText, source: false, }})