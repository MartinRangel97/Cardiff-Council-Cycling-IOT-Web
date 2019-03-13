import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import IconButton from '../common/icon-button'

import IconBack from '../../icons/back.svg'

class SidebarPage extends React.Component {
  goBack = () => {
    if (this.props.history.length > 1) {
      this.props.history.goBack()
    } else {
      this.props.history.push(this.props.match.path)
    }
  }

  render () {
    return (
      <div className='sidebar-page'>
        <div className='page-header'>
          {this.props.canGoBack &&
            <IconButton className='back-btn' alt='Back' img={IconBack} onClick={this.goBack} />
          }
          <h1>{this.props.title}</h1>
        </div>
        {this.props.children}
      </div>
    )
  }
}

SidebarPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  canGoBack: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object
}

// Wrap the component using withRouter so we can access Router features like history.
export default withRouter(SidebarPage)
