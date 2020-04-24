import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'


const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={action('selected!')}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <MenuItem>cool link 3</MenuItem>
        <SubMenu title='Dropdown Menu'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
    </Menu>
)

const verticalMenu = () => (
    <Menu defaultIndex='0' onSelect={action('selected!')} mode='vertical'>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <MenuItem>cool link 3</MenuItem>
        <SubMenu title='Dropdown Menu'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
    </Menu>
)

const verticalDefaultOpen = () => (
    <Menu defaultIndex='0' onSelect={action('selected!')} mode='vertical' defaultOpenSubMenus={['2']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <MenuItem>cool link 3</MenuItem>
        <SubMenu title='Dropdown Menu'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
        </SubMenu>
    </Menu>
)


storiesOf('Menu Component', module)
    .add('Menu', defaultMenu)
    .add('Vertical Menu', verticalMenu)
    .add('Default open submenu', verticalDefaultOpen)