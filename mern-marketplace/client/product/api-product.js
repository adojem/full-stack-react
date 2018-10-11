const read = params =>
   fetch(`/api/products/${params.productId}`, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const update = (params, credentials, product) =>
   fetch(`/api/product/${params.shopId}/${params.productId}`, {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: product,
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const remove = (params, credentials) =>
   fetch(`/api/product/${params.shopId}/${params.productId}`, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Autorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const create = (params, credentials, product) =>
   fetch(`/api/products/by/${params.shopId}`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: product,
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByShop = params =>
   fetch(`/api/products/by/${params.shopId}`, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const listLatest = () =>
   fetch('/api/products/latest', { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

const listRelated = params =>
   fetch(`/api/products/related/${params.productId}`, { method: 'GET' })
      .then(response => response.json())
      .catch(err => console.log(err));

export {
   create, listByShop, listLatest, listRelated, update, read, remove,
};
