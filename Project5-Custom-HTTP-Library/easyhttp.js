function easyHTTP() {
  this.http = new XMLHttpRequest()
}

// * Get Request
easyHTTP.prototype.get = function(url, callback) {
  this.http.open('GET', url, true)
  
  this.http.onload = function() {
    if (this.status === 200) {
      // Use callback to make sure operations after receiving the response firstly
      callback(null, JSON.parse(this.responseText))
    } else {
      callback('Error: ' + this.status)
    }
  }
  this.http.send()
}


// * POST Request
easyHTTP.prototype.post = function(url, data, callback) {
  this.http.open('POST', url, data)
  this.http.setRequestHeader('Content-Type', 'application/json')

  this.http.onload = function() {
    callback(null, this.responseText)
  }

  this.http.send(JSON.stringify(data))
}

// * PUT Request
easyHTTP.prototype.put = function(url, data, callback) {
  this.http.open('PUT', url, data)
  this.http.setRequestHeader('Content-Type', 'application/json')

  this.http.onload = function() {
    callback(null, this.responseText)
  }

  this.http.send(JSON.stringify(data))
}

// * DELETE Request
easyHTTP.prototype.delete = function(url, callback) {
  this.http.open('DELETE', url, true)
  
  this.http.onload = function() {
    if (this.status === 200) {
      // Use callback to make sure operations after receiving the response firstly
      callback(null, 'Post deleted.')
    } else {
      callback('Error: ' + this.status)
    }
  }
  this.http.send()
}