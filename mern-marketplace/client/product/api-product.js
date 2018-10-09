const create = (params, credentials, product) => fetch(`/api/products/by/${params.shopId}`, {
   method: 'GET',
   headers: {
      Accept: 'application/json',
      Autorization: `Bearer ${credentials.t}`,
   },
   body: product,
})
   .then(response => response.json())
   .catch(err => console.log(err));

export { create };
