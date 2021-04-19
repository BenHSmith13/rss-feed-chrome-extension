import React from 'react';
import _ from 'lodash';
import { Card, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

export default function Feed({
  feed, onClick,
}) {
  const { image = {}, title, description, } = feed || {};
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
      {description}
      <Button
        onClick={onClick}
        type='text'
        style={{ float: 'right' }}
      >
        <MoreOutlined />
      </Button>
    </Card>
  )
}
