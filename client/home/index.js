/**
 * This file serves as the entry point for the Homepage Javascript
 */

// Style
import '../stylesheets/home.scss'

// Font
import 'typeface-poppins'

// Login JS goes here
function createUser () {
  let formData = {
    'email': document.getElementById('email').value,
    'password': document.getElementById('password').value
  }

  let request = new XMLHttpRequest()
  request.open('POST', '/auth/signup')
  request.setRequestHeader('Content-Type', 'application/json')
  request.onload = (data) => {
    if (request.status === 200) {
      console.log('Sucess')
    } else {
      console.log('Failed')
    }
  }
  request.send(JSON.stringify(formData))
  event.preventDefault()
}

// Wait until the DOM is loaded
window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('register').addEventListener('click', createUser)
})

function login () {
  let formData = {
    'email': document.getElementById('email').value,
    'password': document.getElementById('password').value
  }

  let request = new XMLHttpRequest()
  request.open('POST', 'auth/login')
  request.setRequestHeader('Content-Type', 'application/json')
  request.onload = (data) => {
    if (request.status === 200) {
      console.log('Sucess')
    } else {
      console.log('Failed')
    }
  }
  request.send(JSON.stringify(formData))
  event.preventDefault()
}
window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('login').addEventListener('click', login)
})
