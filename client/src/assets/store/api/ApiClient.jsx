const API_ENDPOINT = 'http://localhost:8001';



const ApiClient = {
  // get = async (path, params) => {
  //   const url = this.createUrl(path, params);
  //   console.log(`url: ${url}`);
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     return (await response.json());
  //   } else {
  //     const status = response.status;
  //     const body = await response.text();
  //     throw new Error(`status: ${status}, body: ${body}`);
  //   }
  // };

  post : async (path, body) => {
    const url = `${API_ENDPOINT}/${path}`;
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

export default ApiClient;
