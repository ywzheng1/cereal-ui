import { FC } from 'react'
import Tab, { TabProps } from './tabs'
import TabItem, { TabItemProps } from './tabItem'

export type ITabsComponent = FC<TabProps> & {
  Item: FC<TabItemProps>
}
const TransTabs = Tab as ITabsComponent
TransTabs.Item = TabItem

export default TransTabs