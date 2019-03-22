/**
 * This file serves as the entry point for the Homepage Javascript
 */

// Style
import '../stylesheets/home.scss'

// Font
import 'typeface-poppins'

// Login JS goes here
const $ = require('jquery')

function createUser () {
  // let email = document.getElementById('email')
  // let password = document.getElementById('password')

  $('#newUser').submit(function (e) {
    let formData = {
      'email': $('input[name=email]').val(),
      'password': $('input[name=password]').val()
    }

    console.log('Form Data = ' + formData)
    console.log(JSON.stringify(formData))

    $.ajax({
      type: 'POST',
      url: '/auth/signup',
      data: formData,
      dataType: 'text',
      encode: true
    }).done(function (data) {
      console.log('Sucess')
      window.location.href('/')
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log('failed')
    })
    e.preventDefault()
  })
}

document.getElementById('register').addEventListener('click', createUser)
