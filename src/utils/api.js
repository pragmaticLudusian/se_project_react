const baseUrl = "http://localhost:3001";
const baseHeaders = { "content-type": "application/json" };

function _request(url, options) {
  return fetch(url, options).then(_checkResponse);
}

function _checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`error ${res.status}`);
}

export function getItems() {
  return _request(`${baseUrl}/items`, { headers: baseHeaders });
}

export function postItem() {}

export function deleteItem() {}
