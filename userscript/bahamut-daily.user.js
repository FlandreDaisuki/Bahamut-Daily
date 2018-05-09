// ==UserScript==
// @name         巴哈天天簽到
// @namespace    https://github.com/FlandreDaisuki
// @description  在巴哈任何頁面自動簽到
// @match        *://*.gamer.com.tw/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      *.gamer.com.tw
// @version      0.1.2

// @author       FlandreDaisuki
// @homepageURL  https://github.com/FlandreDaisuki/Bahamut-Daily
// @license      MIT, Copyright (c) 2018 FlandreDaisuki
// @compatible   firefox
// @compatible   chrome
// ==/UserScript==

(async () => {
  if (!(await checkSignedIn())) {
    doSignIn();
  }
})();

async function ajax(details) {
  const xhr = window['GM_xmlhttpRequest'] || (window['GM'] ? GM.xmlHttpRequest : null);
  if (!xhr) {
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    Object.assign(details, {
      onload: resolve,
      onabort: reject,
      onerror: reject,
      ontimeout: reject,
    });
    xhr(details);
  });
}

async function checkSignedIn() {
  const response = await ajax({
    method: 'POST',
    url: 'https://www.gamer.com.tw/ajax/signin.php',
    data: 'action=2',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': document.cookie,
    },
  }).catch(console.error);
  // signin: -1, 未登入
  // signin:  0, 未簽到
  // signin:  1, 已簽到
  return JSON.parse(response.responseText).signin > 0;
}

async function getToken() {
  const response = await ajax({
    method: 'GET',
    url: `https://www.gamer.com.tw/ajax/get_csrf_token.php?_=${Date.now()}`,
    headers: {
      Cookie: document.cookie,
    },
  }).catch(console.error);

  return response.responseText;
}

async function doSignIn() {
  const token = await getToken();
  const response = await ajax({
    method: 'POST',
    url: 'https://www.gamer.com.tw/ajax/signin.php',
    data: `action=1&token=${token}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': document.cookie,
    },
  }).catch(console.error);

  console.info(JSON.parse(response.responseText).message);
}
