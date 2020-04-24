import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem'

export interface TabProps {
    /** Default active tab */
    defaultIndex?: number;
    className?: string;
    onSelect?: (selectedIndex: number) => void;
    type?: 'line' | 'card';
}


/**
 * Tab Component
 * Provided a section with switchable content, keep screen clean
 * 
 * ### Import method
 * 
 * ~~~js
 * import { Tabs } from 'cereal-ui'
 * ~~~
 */


export const Tabs: FC<TabProps> = (props) => {
    const { defaultIndex, className, onSelect, children, type } = props

    const [ activeIndex, setActiveIndex ] = useState(defaultIndex)

    const tabClass = classNames('cereal-tabs', className)

    const navClass = classNames('cereal-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
      })

    const handleSelect = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
        if (!disabled) {
            setActiveIndex(index)
            if (onSelect) {
              onSelect(index)
            }
          }
    }

    const renderNav = () => {
        return React.Children.map(children, (child, index) => {
            
            const childElement = child as React.FunctionComponentElement<TabItemProps>
            const { label, disabled } = childElement.props

            const classes = classNames('cereal-tabs-nav-item', {
                'is-active': activeIndex === index,
                'disabled': disabled,
              })

            return(
                <li className={classes} onClick={(e) => handleSelect(e, index, disabled)}>
                    {label}
                </li>
            )
        })
    }

    const renderContent = () => {
        return React.Children.map(children, (child, index) => {
            if (index === activeIndex) {
                return child
              }
        })
    }

    return (
        <div className={tabClass} data-testid='test-tabs'>
            <ul className={navClass}>
                {renderNav()}
            </ul>
            
            <div className='cereal-tabs-panel'>
                {renderContent()}
            </div>
        </div>
    )

}

Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
  }

export default Tabs;