import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

const portalRoot = document.getElementById('portal-root')

export default class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.element = document.createElement('div')
  }

  componentDidMount = () => {
    portalRoot.appendChild(this.element)
  }

  componentWillUnmount = () => {
    portalRoot.removeChild(this.element)
  }

  render () {
    return createPortal(this.props.children, this.element)
  }
}

Portal.propTypes = {
  children: PropTypes.node
}
