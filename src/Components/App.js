import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';

import { createStorageListener, getItem } from 'Utils/storage';

import FeedList from 'Components/Views/FeedList';
// import FeedDetails from 'Components/Views/FeedDetails';
import Filters from 'Components/Views/Filters';
const { Header, Footer, Content } = Layout;

function App() {
  const [feeds, setFeeds] = useState([]);
  const [filters, setFilters] = useState({});
  const [tab, setTab] = useState('feedList');

  useEffect(() => {
    getItem('feeds', setFeeds);
    createStorageListener('feeds', setFeeds);
    getItem('filters', setFilters);
    createStorageListener('filters', setFilters);
  }, []);

  let body;
  if (tab === 'feedList') {
    body = <FeedList
      feeds={feeds}
    />
  } else if (tab === 'filters') {
    body = <Filters
      filters={filters}
    />
  }

  return (
    <Layout className="App">
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
      <Content className='content'>
        {body}
      </Content>
      <Footer>
        {/* I like Feet */}
      </Footer>
    </Layout>
  );
}

export default App;
