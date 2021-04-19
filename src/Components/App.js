import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';

import { createStorageListener, getItem } from 'Utils/storage';

import FeedList from 'Components/Views/FeedList';
// import FeedDetails from 'Components/Views/FeedDetails';
import Filters from 'Components/Views/Filters';
import FeedDetails from 'Components/Views/FeedDetails';
const { Header } = Layout;

function App() {
  const [feeds, setFeeds] = useState([]);
  const [filters, setFilters] = useState({});
  const [tab, setTab] = useState('feedList');
  const [activeFeed, setActiveFeed] = useState();

  useEffect(() => {
    getItem('feeds', setFeeds);
    createStorageListener('feeds', setFeeds);
    getItem('filters', setFilters);
    createStorageListener('filters', setFilters);
  }, []);

  let body;
  if (activeFeed) {
    body = <FeedDetails
      feed={activeFeed}
      back={() => setActiveFeed()}
    />
  } else if (tab === 'feedList') {
    body = <FeedList
      feeds={feeds}
      setActiveFeed={setActiveFeed}
    />
  } else if (tab === 'filters') {
    body = <Filters
      filters={filters}
    />
  }

  return (
    <Layout className="app">
      <Header className='site-header'>
        <h1>Feed Reader</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[tab]}
        >
          <Menu.Item
            key='feedList'
            onClick={e => setTab(e.key)}
          >
              Feed List
          </Menu.Item>
          <Menu.Item
            key="filters"
            onClick={e => setTab(e.key)}
          >
            Filters
          </Menu.Item>
        </Menu>
      </Header>
      {body}
    </Layout>
  );
}

export default App;
