import React from 'react'
import { storiesOf } from '@storybook/react'

// const markdownText = `
// ### 使用 React+typescript 从零到一打造一套你自己的组件库
// vikingship 是为慕课网打造的一套教学组件库，使用 React Hooks 和 typescript

// 意在让大家从零到一，由浅入深的提高自己的 React 和 typescript 水平

// ### 安装试试

// ~~~javascript
// npm install vikingship --save
// ~~~


// ### 使用

// ~~~javascript
// // 加载样式
// import 'vikingship/dist/index.css'
// // 引入组件
// import { Button } from 'vikingship'
// ~~~

// ### 课程亮点

// * 🔥typescript with React Hooks
// * 💧渐进式的教学过程，很多章后面都有扩展作业，引导同学们深入学习和掌握知识
// * ⛑️使用 react-testing-library 完成单元测试
// * 📚使用 storybook 本地调试和生成文档页面
// * 📚使用 react-doc-gen 自动生成文档
// * 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
// * 🌹样式（Sass）文件从零开始，掌握大型应用的 CSS 组织方法
// * 🎉涉及全部流程，包括最后的 npm publish，husky提交发布前验证，travis CI/CD 集成，发布文档站点等
// `

const markdownText = `
### 🍪 Welcome to Cereal-UI
Cereal-UI provides basic stylish react components.

## What this project uses:
- 🔥 React with React hooks
- 🔥 Typescript
- 🚨 Jest and React Testing Library for unit tests
- 📚 Storybook for local documentation and export to static page
- 📚 React-doc-gen for auto documentation generation
- 📦  Third party libraries (react-fontawsome, react0transition-group)
- 🌹 Styles (Sass).
`


storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <h3>Welcome to my component display</h3>
    )
  }, { info : { text: markdownText, source: false, }})