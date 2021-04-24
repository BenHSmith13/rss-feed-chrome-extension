/*global chrome*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import FeedItem from './FeedItem';
import { PageHeader, Layout, Collapse, Button, Row, Col } from 'antd';
import { setItem } from 'Utils/storage';
const { Panel } = Collapse;

export default function FeedDetails({
  feed, feeds, back,
}) {
  const [feedDetails, setFeedDetails] = useState();
  const { description, generator, link, title, items, } = feedDetails || {};

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

  const collapseChange = key => {
    console.log(key);
  }

  const deleteFeed = () => {
    const newFeeds = _.filter(feeds, f => f.description !== feed.description);
    setItem('feeds', newFeeds, back);
  }

  const openFeed = () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.create({
        active: true,
        url: link,
      });
    }
  }

  return (
    <>
    <Row>
      <Col span={18}>
        <PageHeader
          onBack={back}
          title={title}
          subTitle={generator}
        >
        </PageHeader>
      </Col>
      <Col span={6} style={{ textAlign: 'right', padding: '1rem'}}>
        <Button danger onClick={deleteFeed}>
          Delete
        </Button>
      </Col>
    </Row>
      <Layout.Content className='content'>
        <Row>
          <Col span={12}>
            {description}
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <a href={link} onClick={openFeed}>
              {_.head(_.split(link, '?'))}
            </a>
          </Col>
        </Row>
        <Collapse onChange={collapseChange}>
          {_.map(items, item => (
            <Panel
              header={item.title}
              key={`feed_${feed.guid}_item_${item.guid}`}
            >
              <FeedItem item={item} />
            </Panel>
          ))}
        </Collapse>
      </Layout.Content>
    </>
  )
}
