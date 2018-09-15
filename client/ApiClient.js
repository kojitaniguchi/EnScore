const API_ENDPOINT = 'https://b-api.kyotohack.com';
const fetch = require('node-fetch')

const ApiClient = {
  get : async (path) => {
    const url = API_ENDPOINT + path
    const response = await fetch(url);

    if (response.ok) {
      return (await response.json());
    } else {
      const status = response.status;
      const body = await response.text();
      throw new Error(`status: ${status}, body: ${body}`);
    }
  },
  post : async (path, body) => {
    const url = `${API_ENDPOINT}${path}`;
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    };
    const response = await fetch(url, request);
    if (response.ok) {
      return await response.json();
    } else {
      const status = response.status;
      const body = await response.text();
      throw new Error(`status: ${status}, body: ${body}`);
    }
  }
}

async function test() {
  let score = await ApiClient.get("/user/score")
  console.log("/user/score", score)
  // { app: 0, github: 0, qiita: 0 }

  let info = await ApiClient.post("/user/info")
  console.log("/user/info", info)
  // { Name: 'dammy yoshio', age: '', category: '', region: '' }
  
  let update = await ApiClient.post("/user/update")
  console.log("/user/update", update)
  // { status: 'ok user update!' }

  let rank = await ApiClient.post("/user/rank")
  console.log("/user/update", rank)
  // { all: 1230, rank: 900, totalScore: 220 }

  let create = await ApiClient.post("/score/create")
  console.log("/score/create", create)
  // { status: 'ok score create!' }
}

test()



