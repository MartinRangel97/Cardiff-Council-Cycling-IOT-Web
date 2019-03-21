/**
 * This file serves as the entry point for the Web App Javascript
 */

// React
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

// App
import App from './app'

// Style
import '../stylesheets/app.scss'

// Font
import 'typeface-poppins'

// Render
render(
  <div className='container'>
    <BrowserRouter>
      <Route path='/app' render={(props) => <App {...props} />} />
    </BrowserRouter>
  </div>,
  document.getElementById('app-root')
)
