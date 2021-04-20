/*global chrome*/
import React from 'react';
import _ from 'lodash';
import { Space, Typography } from 'antd';
const { Text } = Typography;

export default function FeedItem({
  item,
}) {
  const {
    // content, // "i want to have a travel and food blogging website together in one website , it must be look professional and responsive with content and design<br /><br /><b>Budget</b>: $200↵<br /><b>Posted On</b>: March 13, 2021 10:35 UTC<br /><b>Category</b>: Full Stack Development<br /><b>Skills</b>:Web Design,     Responsive Design,     Chrome Extension,     Google Analytics,     Python,     Kotlin,     Startup,     Website Security,     Amazon Web Services,     HTML    ↵<br /><b>Location Requirement</b>: Only freelancers located in the United States may apply.↵<br /><b>Country</b>: United States↵<br /><a href="https://www.upwork.com/jobs/Blogging-website_%7E01532e13dbaec44d67?source=rss">click to apply</a>↵"
    // content:encoded: "i want to have a travel and food blogging website together in one website , it must be look professional and responsive with content and design<br /><br /><b>Budget</b>: $200↵<br /><b>Posted On</b>: March 13, 2021 10:35 UTC<br /><b>Category</b>: Full Stack Development<br /><b>Skills</b>:Web Design,     Responsive Design,     Chrome Extension,     Google Analytics,     Python,     Kotlin,     Startup,     Website Security,     Amazon Web Services,     HTML    ↵<br /><b>Location Requirement</b>: Only freelancers located in the United States may apply.↵<br /><b>Country</b>: United States↵<br /><a href="https://www.upwork.com/jobs/Blogging-website_%7E01532e13dbaec44d67?source=rss">click to apply</a>↵"
    // content:encodedSnippet: "i want to have a travel and food blogging website together in one website , it must be look professional and responsive with content and design↵Budget: $200↵Posted On: March 13, 2021 10:35 UTC↵Category: Full Stack Development↵Skills:Web Design,     Responsive Design,     Chrome Extension,     Google Analytics,     Python,     Kotlin,     Startup,     Website Security,     Amazon Web Services,     HTML    ↵Location Requirement: Only freelancers located in the United States may apply.↵Country: United States↵click to apply"
    contentSnippet, // "i want to have a travel and food blogging website together in one website , it must be look professional and responsive with content and design↵Budget: $200↵Posted On: March 13, 2021 10:35 UTC↵Category: Full Stack Development↵Skills:Web Design,     Responsive Design,     Chrome Extension,     Google Analytics,     Python,     Kotlin,     Startup,     Website Security,     Amazon Web Services,     HTML    ↵Location Requirement: Only freelancers located in the United States may apply.↵Country: United States↵click to apply"
    // guid, // "https://www.upwork.com/jobs/Blogging-website_%7E01532e13dbaec44d67?source=rss"
    // isoDate, // "2021-03-13T10:35:21.000Z"
    link, // "https://www.upwork.com/jobs/Blogging-website_%7E01532e13dbaec44d67?source=rss"
    pubDate, // "Sat, 13 Mar 2021 10:35:21 +0000"
    // title, // "Blogging website - Upwork"
  } = item || {};

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
