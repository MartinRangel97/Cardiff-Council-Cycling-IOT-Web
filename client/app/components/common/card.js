import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const Card = props => {
  if (props.link) {
    // If a link prop exists, return the card as a React Router link
    return (
      <Link className={`card clickable ${props.className ? props.className : ''}`} to={props.link}>
        {props.children}
      </Link>
    )
  } else if (props.onClick) {
    // If an onClick prop exists, return the card as clickable with the onClick action
    return (
      <a className={`card clickable ${props.className ? props.className : ''}`} onClick={props.onClick}>
        {props.children}
      </a>
    )
  } else {
    // If there's no link or onClick, return a standard card
    return (
      <a className={`card ${props.className ? props.className : ''}`}>
        {props.children}
      </a>
    )
  }
}

Card.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
  children: PropTypes.node
}

export default Card
