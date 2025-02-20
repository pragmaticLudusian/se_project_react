const baseUrl = "http://localhost:3001";
const baseHeaders = { "content-type": "application/json" };

async function _request(url, options) {
  return _checkResponse(await fetch(url, options));
}

function _checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`error ${res.status}`);
}

export function getItems() {
  return _request(`${baseUrl}/items`); // GET headers is optional
}

export function addItem(name, imageUrl, weather) {
  return _request(`${baseUrl}/items`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export function deleteItem(id) {
  return _request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: baseHeaders,
  });
}
