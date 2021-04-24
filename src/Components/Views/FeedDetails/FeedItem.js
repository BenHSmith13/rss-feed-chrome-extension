/*global chrome*/
import React from 'react';
import _ from 'lodash';
import { Space, Typography } from 'antd';
const { Text } = Typography;

export default function FeedItem({
  item,
}) {
  const { contentSnippet, link, pubDate, } = item || {};

  const openItem = () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.create({
        active: true,
        url: link,
      });
    }
  }

  return (
    <Space direction='vertical'>
      <Text type="secondary">{pubDate}</Text>
      {contentSnippet}
      <a href={link} onClick={() => openItem(link)}>
        {_.head(_.split(link, '?'))}
      </a>
    </Space>
  )
}
