document.getElementById('button1').addEventListener('click', loadCustomer)

document.getElementById('button2').addEventListener('click', loadCustomers)

function loadCustomer(e) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'customer.json', true)

  xhr.onload = () => {
    if (xhr.status === 200) {
      // console.log(xhr.responseText)

      const customer = JSON.parse(xhr.responseText)

      const output = `
        <ul>
          <li>ID: ${customer.id}</li>
          <li>Name: ${customer.name}</li>
          <li>Company: ${customer.company}</li>
          <li>Phone: ${customer.phone}</li>
        </ul>
      `

      document.getElementById('customer').innerHTML = output
    }
  }

  xhr.send()
}

function loadCustomers() {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'customers.json', true)

  xhr.onload = () => {
    if (xhr.status === 200) {
      const customers = JSON.parse(xhr.responseText)
      let output = ''

      customers.forEach(customer => {
        output += `
          <ul>
            <li>ID: ${customer.id}</li>
            <li>Company: ${customer.company}</li>
            <li>Phone: ${customer.phone}</li>
          </ul>        
        `
      })

      document.getElementById('customers').innerHTML = output
    }
  }

  xhr.send()
}