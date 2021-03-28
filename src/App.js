/*global chrome*/
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import { text, secondary } from './Constants/colors';

import FeedList from 'Components/Views/FeedList';
import FeedDetails from 'Components/Views/FeedDetails';

// import finder  from 'chrome-cookie-finder';

// finder('http://www.baidu.com', function(err, cookie, fullCookieInfo) {
//     if (err) {
//         return console.log(err)
//     }

//     console.log('cookie: ', cookie)
//     console.log('fullCookieInfo: ', fullCookieInfo)
// })

function App() {
  const [feeds, setFeeds] = useState([]);
  const [activeFeed, setActiveFeed] = useState();

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.onChanged.addListener((changes, namespace) => {
        for (var key in changes) {
          if (key === 'feeds') { setFeeds(changes[key].newValue); }
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <header style={{
        backgroundColor: secondary,
        color: text,
      }}>
        <img
          src={logo}
          className="App-logo" alt="logo"
          width={64}
          style={{ display: 'inline-block' }}
        />
        <h1 style={{ display: 'inline-block', }}>
          Feed Reeder
        </h1>
      </header>
      {activeFeed ? (
        <FeedDetails
          feed={activeFeed}
          back={() => setActiveFeed()}
        />
      ) : (
        <FeedList
          feeds={feeds}
          addFeedOpen={true}
          setActiveFeed={setActiveFeed}
        />
      )}
    </div>
  );
}

export default App;
