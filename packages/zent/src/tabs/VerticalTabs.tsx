import * as React from 'react';
import cn from 'classnames';
import noop from 'lodash-es/noop';

import LazyMount from '../utils/component/LazyMount';
import {
  IVerticalInnerTab,
  IVerticalTabsProps,
  IVerticalTab,
  ITabPanelProps,
  IVerticalTabPanelProps,
} from './types';
import VerticalTabsNav from './components/tabs-nav/VerticalTabsNav';
import BaseTabs from './components/base/BaseTabs';
import { getTabDataFromChild } from './utils';
import TabDivide from './components/TabDivide';
import TabPanel from './components/TabPanel';

export class VerticalTabs<Id extends string | number = string> extends BaseTabs<
  Id,
  IVerticalInnerTab<Id>,
  IVerticalTabPanelProps<Id>,
  IVerticalTabsProps<Id>
> {
  static TabPanel = TabPanel;
  static Divide = TabDivide;

  static defaultProps: Partial<IVerticalTabsProps<string>> = {
    activeId: '',
    onChange: noop,
  };

  get tabsCls() {
    const { className } = this.props;
    return cn('zent-tabs', `zent-tabs-type__vertical`, className);
  }

  getTabDataListFromTabs(
    tabs: NonNullable<Array<IVerticalTab<Id>>>
  ): Array<IVerticalInnerTab<Id>> {
    const { activeId } = this.props;

    return tabs.map<IVerticalInnerTab<Id>>(tab => {
      if ('divide' in tab) {
        return tab;
      } else {
        return {
          ...tab,
          actived: tab.key === activeId,
        };
      }
    });
  }

  getTabDataListFromChildren(
    children: NonNullable<IVerticalTabsProps<Id>['children']>
  ): Array<IVerticalInnerTab<Id>> {
    const { activeId } = this.props;

    return React.Children.map(
      children,
      (
        child: React.ReactElement<
          React.PropsWithChildren<IVerticalTabPanelProps<Id>>
        >
      ) => {
        if ('divide' in child.props) {
          return { divide: true };
        }
        return getTabDataFromChild(
          child as React.ReactElement<
            React.PropsWithChildren<ITabPanelProps<Id>>
          >,
          activeId
        );
      }
    );
  }

  renderNav(tabDataList: Array<IVerticalInnerTab<Id>>) {
    const { onChange, scrollHeight } = this.props;

    return (
      <VerticalTabsNav
        scrollHeight={scrollHeight}
        onChange={onChange}
        tabDataList={tabDataList}
      />
    );
  }

  renderTabPanel(tabItem: IVerticalInnerTab<Id>) {
    if ('divide' in tabItem) {
      return null;
    }
    return (
      <LazyMount mount={tabItem.actived} key={tabItem.key}>
        <TabPanel
          tab={tabItem.title}
          actived={tabItem.actived}
          className={tabItem.className}
          id={tabItem.key}
        >
          {tabItem.panelChildren}
        </TabPanel>
      </LazyMount>
    );
  }
}

export default VerticalTabs;
