import React from 'react'
import PropTypes from 'prop-types'

const Section = props => {
  return (
    <section>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  )
}

Section.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node
}

export default Section
