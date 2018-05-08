(async () => {
  if (!(await checkSignedIn())) {
    doSignIn();
  }
})();

async function checkSignedIn() {
  const url = 'https://www.gamer.com.tw/ajax/signin.php';
  const body = 'action=2';
  const response = await axios.post(url, body, {
    'withCredentials': true,
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return !!response.data.signin;
}

async function getToken() {
  const url = `https://www.gamer.com.tw/ajax/get_csrf_token.php?_=${Date.now()}`;
  const response = await axios.get(url, { 'withCredentials': true });
  return response.data;
}

async function doSignIn() {
  const url = 'https://www.gamer.com.tw/ajax/signin.php';
  const token = await getToken();
  const body = `action=1&token=${token}`;
  const response = await axios.post(url, body, {
    'withCredentials': true,
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.info(response.data.message);
}
