/*global chrome*/
export function setItem(key, value, cb = () => null) {
  if (chrome && chrome.storage) { // chrome
    chrome.storage.sync.set({ [key]: value }, cb);
  } else {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
    window.dispatchEvent(new Event('storage')); // needed for the storage listener on the same page to pick this up
    cb();
  }
}

export function getItem(key, cb = () => ({})) {
  if (chrome && chrome.storage) { // chrome
    chrome.storage.sync.get(key, res => {
      console.log(res);
      cb(res[key]);
    });
  } else {
    cb(JSON.parse(localStorage.getItem(key)));
  }
}

export function removeItem(key, cb = () => null) {
  if (chrome && chrome.storage) { // chrome
    chrome.storage.sync.set({ [key]: null }, cb);
  } else {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
    cb();
  }
}

export function createStorageListener(key, cb = () => null) {
  if (chrome && chrome.storage) {
    chrome.storage.onChanged.addListener(changes => {
      for (const changeKey in changes) {
        if (changeKey === key) {
          cb(changes[key].newValue);
        }
      }
    });
  } else {
    window.addEventListener('storage', () => {
      cb(JSON.parse(localStorage.getItem(key)));
    });
  }
}