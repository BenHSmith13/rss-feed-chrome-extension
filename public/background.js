/*global chrome*/
const intervalSeconds = 60 * 5;
const intervalTime = 1000 * intervalSeconds;

// TODO: move to some kind of storage
const notificationsSent = {}

let filters;
const daysAgoToInclude = 1000 * 60 * 60 * 24 * 2; // ms * sec * min * hrs * days;

chrome.storage.sync.get('filters', res => {
  filters = res.filters || {};
});
chrome.storage.onChanged.addListener(changes => {
  for (const key in changes) {
    if (key === 'filters') {
      filters = changes[key].newValue;
      console.log('updated filters', filters);
    }
  }
});

const shouldNotify= feedItem => {
  if (!filters) { return false; } // filters have not loaded

  const { guid, isoDate, title, } = feedItem || {};
  if (notificationsSent[guid]) { return false; }
  notificationsSent[guid] = true;

  const itemTimeStamp = new Date(isoDate).getTime();
  const now  = Date.now();
  if (itemTimeStamp < now - daysAgoToInclude) {
    console.log('too old ', title);
    return false;
  }

  if (filters.include && filters.include.active && filters.include.rules) {
    for (const word of filters.include.rules) {
      if (title.toLowerCase().includes(word.toLowerCase())) {
        console.log('including ', title);
        return true;
      }
    }
  }

  if (filters.exclude && filters.exclude.active&& filters.exclude.rules) {
    for (const word of filters.exclude.rules) {
      if (title.toLowerCase().includes(word.toLowerCase())) {
        console.log('excluding ', title);
        return false;
      }
    }
  }

  return true;
}

setInterval(() => {
  chrome.storage.sync.get('feeds', res => {
    if (res.feeds.length) {
      res.feeds.forEach(feed => {
        const x = new XMLHttpRequest();
        x.open('GET', `https://feed-getter.herokuapp.com/?feed=${encodeURIComponent(feed.url)}`);
        x.onload = () => {
          if (x.responseText !== 'No Feed') {
            const response = JSON.parse(x.responseText);
            if (response.items && response.items.length) {
              response.items.forEach(item => {
                const {
                  content,
                  contentSnippet,
                  description,
                  guid,
                  isoDate,
                  link,
                  title,
                } = item;
                console.log(item);
                if (shouldNotify(item)) {
                  chrome.notifications.create(link, {
                    type: 'basic',
                    iconUrl: './logo512.png',
                    title,
                    message: content,
                    requireInteraction: true,
                  }, id => {});
                }
              });
            }
          }
        }
        x.send();
      });
    }
  });
}, intervalTime);

chrome.notifications.onClicked.addListener(url => {
  chrome.tabs.create({
    active: true,
    url,
  });
});
