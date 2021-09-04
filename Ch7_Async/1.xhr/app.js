// * 1. XHR Object Methods
document.getElementById('button').addEventListener('click', loadData)

function loadData() {
  // Create an XHR Object
  const xhr = new XMLHttpRequest()

  // OPEN
  xhr.open('GET', 'xhrData.txt')

  xhr.onload = function() {
    // console.log(xhr.status)
    if (xhr.status === 200) {
      console.log(this)
      console.log(this.responseText)
    }
  }

  // SEND
  xhr.send()
}