import React, { FC } from 'react';

export interface TabItemProps {
    /** Tab card's name */
    label: string | React.ReactElement;
    /** If tab is disabled */
    disabled?: boolean
}

export const TabItem: FC<TabItemProps> = ({children}) => {

    return(
        <div className='cereal-tabs-panel'>
            {children}
        </div>
    )
}


export default TabItem;