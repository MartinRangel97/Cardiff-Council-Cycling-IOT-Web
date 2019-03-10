/**
 * This file serves as the entry point for the Web App Javascript
 */

// React
import React from 'react'
import { render } from 'react-dom'

// App
import App from './app'

// Style
import '../stylesheets/app.scss'

// Font
import 'typeface-poppins'

// Render
render(
  <div className='container'>
    <App />
  </div>,
  document.getElementById('app')
)
