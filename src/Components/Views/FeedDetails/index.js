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
  const {
    // copyright, // "© 2003-2021 Upwork Corporation"
    description, // "All chrome extension jobs as of April 19, 2021 22:21 UTC"
    // docs, // "http://blogs.law.harvard.edu/tech/rss"
    generator, // "Upwork Corporation"
    // image, // {link: "https://www.upwork.com/ab/feed/topics/rss?orgUid=1…amp;topic=5105509&amp;userUid=1356641955060178944", url: "https://www.upwork.com/images/rss_logo.png", title: "All chrome extension jobs | upwork.com"}
    items, // (23) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // language, // "en-us"
    link, // "https://www.upwork.com/ab/feed/topics/rss?orgUid=1356641955064373249&amp;securityToken=44e4adf9fe9dc8907609e28be2f037f447eaa23a3bd95a911708ed54f2439d6e91f11e719f2514cf2d39854b3e02785b88998ea2d313eee6041d0b5f8b9765a8&amp;sort=local_jobs_on_top&amp;topic=5105509&amp;userUid=1356641955060178944"
    // managingEditor, // "rss@upwork.com (Upwork Corporation)"
    // pubDate, // "Mon, 19 Apr 2021 22:21:12 +0000"
    title, // "All chrome extension jobs | upwork.com"
  } = feedDetails || {};

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
