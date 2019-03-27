/**
 * This file serves as the entry point for the Web App Javascript
 */

// React
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

// App
import App from './app'

// Style
import '../stylesheets/app.scss'

// Font
import 'typeface-poppins'

// Render
render(
  <IntlProvider>
    <div className='container'>
      <BrowserRouter>
        <Route path='/app' render={(props) => <App {...props} />} />
      </BrowserRouter>
    </div>
  </IntlProvider>,
  document.getElementById('app-root')
)
