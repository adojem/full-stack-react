const create = (params, credentials, order, token) =>
   fetch(`/api/orders/${params.userId}`, {
      method: 'POST',
      headers: {
         Accept: 'application.json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ order, token }),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByShop = (params, credentials) =>
   fetch(`/api/orders/shop/${params.shopId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const getStatusValues = () =>
   fetch('/api/order/status_values', { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

export { create, getStatusValues, listByShop };
