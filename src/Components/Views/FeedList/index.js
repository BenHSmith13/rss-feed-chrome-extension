import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Layout, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { setItem } from 'Utils/storage';

import Feed from './Feed';

export default function FeedList({
  feeds, setActiveFeed,
}) {
  const [newFeed, setNewFeed] = useState('');
  
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

      setItem('feeds', newFeedList, () => console.log('Udated feed list', newFeedList));
      setNewFeed('');
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <Layout.Content className='content'>
      <Input.Group compact>
        <Input
          value={newFeed}
          onChange={e => setNewFeed(e.target.value)}
          style={{ width: '60%'}}
          placeholder='New Feed Url'
        />
        <Button
          onClick={addNewFeed}
          type='primary'
        >
          <PlusOutlined />
          Add Feed
        </Button>
      </Input.Group>
      {_.map(feeds, feed => (
        <Feed
          key={`feed_${feed.guid || feed.link}`}
          onClick={() => setActiveFeed(feed)}
          feed={feed}
        />
      ))}
    </Layout.Content>
  )
}
