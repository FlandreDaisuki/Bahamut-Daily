// webrequest

const webRequestFilters = { urls: [
  '*://www.gamer.com.tw/ajax/get_csrf_token.php',
  '*://www.gamer.com.tw/ajax/signin.php',
] };

const webRequestOptions = ['blocking', 'responseHeaders'];

chrome.webRequest.onHeadersReceived.addListener((e) => {
  const { responseHeaders } = e;
  const cors = {
    name: 'Access-Control-Allow-Origin',
    value: '*',
  };
  responseHeaders.push(cors);
  return { responseHeaders };
}, webRequestFilters, webRequestOptions);

// browser action

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: 'https://www.gamer.com.tw' });
});
