import React from 'react';
import _ from 'lodash';
import { Card } from 'antd';

export default function Feed({
  feed
}) {
  const { image = {}, title} = feed || {};
  const imageUrl = _.get(image, 'url');

  return (
    <Card
     title={
      <>
        {title}
        {imageUrl ? (
          <img
            src={feed.image.url}
            alt="feed logo"
            width={64}
            style={{ float: 'right' }}
          />
        ) : null}
      </>
     }
     style={{ marginTop: '0.5rem' }}
    >
    </Card>
  )
}
