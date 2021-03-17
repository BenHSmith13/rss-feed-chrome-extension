import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import FeedItem from './FeedItem';

export default function FeedDetails({
  feed, back,
}) {
  const [feedDetails, setFeedDetails] = useState();

  useEffect(() => {
    if (feed && feed.url) {
      axios.get(`https://feed-getter.herokuapp.com/?feed=${encodeURIComponent(feed.url)}`)
      .then( res => {
        setFeedDetails(res.data);
      }).catch(err => {
        console.error(err);
      })
    }
  }, [feed]);

  return (
    <div>
      {_.map(_.get(feedDetails, 'items'), item => (
        <FeedItem
          key={`feed_${feed.guid}_item_${item.guid}`}
          item={item}
        />
      ))}
    </div>
  )
}
