import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect:     jest.fn(),
    className:    'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const testVerPropsSubDefaultOpen: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['3']
}

const generateMenu = (props: MenuProps) => {
    return(
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>cool link 3</MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
		</Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .cereal-submenu {
            display: none
        }
        .cereal-submenu.menu-opened {
            display: block
        }
    `

    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('tets Menu and MenuItem component', () => {

    beforeEach(() => {
        wrapper         = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement     = wrapper.getByTestId('test-menu')
        activeElement   = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('cereal-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('clicked items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('cool link 3')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('should render vertical menu correctly when mode set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })

    it('should show dropdown items when click on subMenu', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        wrapper.container.append(createStyleFile())
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.click(dropdownElement)
        expect(wrapper.queryByText('drop1')).toBeVisible()
        fireEvent.click(dropdownElement)
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })

    it('should display submenu by default when defaultOpenSubMenus has matched array', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerPropsSubDefaultOpen))
        wrapper.container.append(createStyleFile())
        expect(wrapper.queryByText('drop1')).toBeVisible()
    })
})