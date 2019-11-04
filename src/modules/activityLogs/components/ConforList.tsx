import dayjs from 'dayjs';
import EmptyState from 'modules/common/components/EmptyState';
import React from 'react';
import { IUser } from '../../auth/types';
import { ActivityTitle, Timeline } from '../styles';

import ConforItem from './ConforItem';

type Props = {
  activities: any[];
  user: IUser;
  target?: string;
  type: string;
};

class ActivityList extends React.Component<Props> {
  renderItem(data) {
    return data.map((item, index) => <ConforItem key={index} data={item} />);
  }

  renderList(activity, index) {
    const data = Object.keys(activity);

    return (
      <div key={index}>
        <ActivityTitle>{data}</ActivityTitle>
        {data.map(key => this.renderItem(activity[key]))}
      </div>
    );
  }

  renderTimeLine(activities) {
    const result = activities.reduce((item, activity) => {
      const createdDate = dayjs(activity.createdAt).format('MMMM YYYY');

      item[createdDate] = item[createdDate] || [];
      item[createdDate].push(activity);

      return item;
    }, {});

    return (
      <Timeline>
        {Object.keys(result).map((key, index) => {
          return this.renderList({ [key]: result[key] }, index);
        })}
      </Timeline>
    );
  }

  render() {
    const { activities } = this.props;

    if (!activities || activities.length < 1) {
      return (
        <EmptyState
          text="There aren’t any activities at the moment."
          icon="clock"
        />
      );
    }

    return this.renderTimeLine(activities);
  }
}

export default ActivityList;