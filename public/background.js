/*global chrome*/
const intervalSeconds = 60 * 5;
const intervalTime = 1000 * intervalSeconds;

// move to some kind of storage
// const notificationsSent = {}

// let excluderules = ['wordpress', 'backend', 'native', 'database', 'angular', 'php', 'laravel', 'drupal', 'marketing', 'ruby', 'rails', 'android', 'c++', 'c#', 'python', 'ionic', 'blockchain', 'salesforce', 'elixir', 'magento', 'shopify'];
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

  const {
    // content, // "-	Knowledge of front-end development: HTML5, CSS, JavaScript, TypeScript, React, Angular, jQuery<br />↵-	Knowledge of server-side languages; Java, Python, Flask, Ruby, .NET, etc.<br />↵-	Ability to program to RESTful API&rsquo;s<br />↵-	Knowledge of database technology; MySQL, SQL Server<br />↵-	Ability to do basic UI/UX design and development and prototyping<br />↵-	Understanding of Docker and or Azure technologies.&nbsp;&nbsp;Nginx a plus<br />↵-	Experience with Windows and Linux<br /><br /><br /><b>Hourly Range</b>: $60.00-$75.00↵↵<br /><b>Posted On</b>: March 15, 2021 14:00 UTC<br /><b>Category</b>: Full Stack Development<br /><b>Skills</b>:Python,     JavaScript,     HTML,     AngularJS,     MySQL,     Java,     CSS,     Angular,     Windows,     Linux    ↵<br /><b>Location Requirement</b>: Only freelancers located in the United States may apply.↵<br /><b>Country</b>: United States↵<br /><a href="https://www.upwork.com/jobs/Full-Stack-Developer_%7E01875bbd5de8ca2647?source=rss">click to apply</a>↵"
    // contentSnippet, // "-	Knowledge of front-end development: HTML5, CSS, JavaScript, TypeScript, React, Angular, jQuery↵↵Hourly Range: $60.00-$75.00↵↵Posted On: March 15, 2021 14:00 UTC↵Category: Full Stack Development↵Skills:Python,     JavaScript,     HTML,     AngularJS,     MySQL,     Java,     CSS,     Angular,     Windows,     Linux    ↵Location Requirement: Only freelancers located in the United States may apply.↵Country: United States↵click to apply"
    guid,
    isoDate, // "2021-03-15T14:00:03.000Z"
    // link, // "https://www.upwork.com/jobs/Full-Stack-Developer_%7E01875bbd5de8ca2647?source=rss"
    // pubDate, // "Mon, 15 Mar 2021 14:00:03 +0000"
    title, // "Full Stack Developer - Upwork"
  } = feedItem || {};
  // if (notificationsSent[guid]) { return false; }
  // notificationsSent[guid] = true;

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
                  content, // "Design a chrome extension for product recommendations. Based on contextual search the user using the extension will be given a recommendation for an alternative product that is available locally or of lower cost. Users will be able to login on the chrome extension to save/bookmark their product recommendations to revisit later. <br /><br /><br /><br /><br /><b>Budget</b>: $50↵<br /><b>Posted On</b>: March 12, 2021 00:03 UTC<br /><b>Category</b>: UX/UI Design<br /><b>Skills</b>:Graphic Design,     Web Design,     Chrome Extension    ↵<br /><b>Location Requirement</b>: Only freelancers located in the United States may apply.↵<br /><b>Country</b>: United States↵<br /><a href="https://www.upwork.com/jobs/Create-design-for-product-recommender-chrome-extension_%7E0112e4f747fe27fe36?source=rss">click to apply</a>↵"
                  guid, // "https://www.upwork.com/jobs/Create-design-for-product-recommender-chrome-extension_%7E0112e4f747fe27fe36?source=rss"
                  isoDate, // "2021-03-12T00:03:44.000Z"
                  link, // "https://www.upwork.com/jobs/Create-design-for-product-recommender-chrome-extension_%7E0112e4f747fe27fe36?source=rss"
                  title, // "Create a design for product recommender chrome extension. - Upwork"
                } = item;
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
