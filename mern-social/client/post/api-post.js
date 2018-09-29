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

const remove = (params, credentials) =>
   fetch(`/api/posts/${params.postId}`, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const listByUser = (params, credentials) =>
   fetch(`/api/posts/by/${params.userId}`, {
      method: 'GET',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const like = (params, credentials, postId) =>
   fetch('/api/posts/like', {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId }),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

const unlike = (params, credentials, postId) =>
   fetch('/api/posts/unlike', {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId }),
   })
      .then(response => response.json())
      .catch(err => console.log(err));

export {
   create, like, listByUser, listNewsFeed, unlike, remove,
};
