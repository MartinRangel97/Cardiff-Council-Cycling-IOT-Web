import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import IconButton from '../common/icon-button'

import IconSearch from '../../icons/search.svg'

class Searchbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  submit = () => {
    if (this.state.value) {
      this.props.history.push({
        pathname: '/app/search',
        search: '?query=' + this.state.value
      })
    }
  }

  onChange = (event) => {
    this.setState({ value: event.target.value })
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') this.submit()
  }

  render () {
    return (
      <div className='searchbar'>
        <input
          type='text'
          name='search'
          placeholder='Search'
          onChange={this.onChange}
          onKeyPress={this.onKeyPress} />
        <IconButton className='search-btn' onClick={this.submit} img={IconSearch} />
      </div>
    )
  }
}

Searchbar.propTypes = {
  history: PropTypes.object
}

export default withRouter(Searchbar)
