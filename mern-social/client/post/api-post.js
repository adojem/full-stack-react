const create = (params, credentials, post) =>
   fetch(`/api/posts/new/${params.userId}`, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: post,
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listNewsFeed = (params, credentials) =>
   fetch(`/api/posts/feed/${params.userId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t},`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

export { create, listNewsFeed };
