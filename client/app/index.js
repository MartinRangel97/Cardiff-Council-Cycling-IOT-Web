/**
 * This file serves as the entry point for the Web App Javascript
 */

// React
import React from 'react'
import { render } from 'react-dom'

// Style
import '../stylesheets/app.scss'

// Font
import 'typeface-poppins'

// Render
render(
  <div className='page'>
    App content will go here.
  </div>,
  document.getElementById('app')
)
