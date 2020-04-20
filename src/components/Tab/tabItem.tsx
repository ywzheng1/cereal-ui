import React from 'react';
import classNames from 'classnames';

export interface TabItemProps {
    index: number;
    label?: string | React.ReactElement;
    className?: string;
    disabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({index, label, disabled, children, className}) => {

    const classes = classNames('cereal-tabs-panel', className)

    return(
        <div className={classes}>
            {children}
        </div>
    )
}

TabItem.displayName = 'TabItem'

export default TabItem;