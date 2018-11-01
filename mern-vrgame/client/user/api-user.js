const create = user =>
   fetch('/api/users/', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const read = (params, credentials) =>
   fetch(`/api/users/${params.userId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

export { create, read };
