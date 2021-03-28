/*global chrome*/
import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import TextField from 'Components/Base/TextField';
import Button from 'Components/Base/Button';
import Feed from './Feed';

export default function FeedList({
  feeds, addFeedOpen, setActiveFeed,
}) {
  const [newFeed, setNewFeed] = useState();
  
  const addNewFeed = () => {
    axios.get(`https://feed-getter.herokuapp.com/?feed=${encodeURIComponent(newFeed)}`)
    .then(res => {
      const { description, image, link, title, } = res.data;
      let newFeedList;
      const newFeedItem = { description, image, link, title, url: newFeed };
      if (feeds) {
        newFeedList = [...feeds, newFeedItem];
      } else {
        newFeedList = [newFeedItem];
      }
      
      if (chrome && chrome.storage) {
        chrome.storage.sync.set(
          { feeds: newFeedList },
          () => console.log('Udated feed list', newFeedList),
        );
      }
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <>
      <TextField
        value={newFeed}
        onChange={setNewFeed}
      />
      <Button
        onClick={addNewFeed}
        style={{ marginRight: '0.5rem' }}
      >
        Save
      </Button>
      {_.map(feeds, feed => (
        <Feed
          key={`feed_${feed.guid}`}
          onClick={() => setActiveFeed(feed)}
          feed={feed}
        />
      ))}
    </>
  )
}
