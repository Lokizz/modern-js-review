class EasyHTTP {
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
      fetch(url, opts)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
  
      fetch(url, opts)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  }

  delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => resolve('Post deleted...'))
        .catch(err => reject(err))
    })
  }
}