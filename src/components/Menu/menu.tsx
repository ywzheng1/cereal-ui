import React, { FC, useState, createContext, CSSProperties, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    /** default active menu */
    defaultIndex?: string;
    className?: string;
    /** menu type: horizontal or vertical */
    mode?: MenuMode;
    style ?: CSSProperties;
    /** when select menu, trigger a callback */
    onSelect?: SelectCallback;
    /** a index array, decide which submenu is default open */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode,
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'})



/**
 * Provide website navigation, support two types of menu: horizonal and vertical  
 * Also support submenu, with default open option  
 * 
 * ### Import method
 * 
 * ~~~js
 * import { Menu } from 'cereal-ui'
 * // Then support MenuItem and SubMenu component
 * ~~~
 */

export const Menu: FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props
    const [ currentActive, setActive ] = useState(defaultIndex)

    const classes = classNames('cereal-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;