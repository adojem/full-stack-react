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
      .catch(err => console.lgo(err));

export { create };
