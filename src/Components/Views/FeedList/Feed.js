import React from 'react';
import _ from 'lodash';

export default function Feed({
  feed,
}) {
  const { image = {}, title} = feed || {}; 

  return (
    <div>
      {_.get(feed, 'image.url') ? (
        <img
          src={feed.image.url}
          alt="feed logo"
          width={64}
          style={{ display: 'inline-block' }}
        />
      ) : null}
      {feed.title}
    </div>
  )
}
