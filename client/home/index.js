/**
 * This file serves as the entry point for the Homepage Javascript
 */

// Style
import '../stylesheets/home.scss'

// Font
import 'typeface-poppins'

// Login JS goes here
const axios = require('axios').Axios

document.addEventListener('click', createUser())

function createUser () {
  let email = document.getElementById('email')
  let password = document.getElementById('password')

  console.log(email)
  console.log(password)
}
