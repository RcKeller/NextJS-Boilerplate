import React from 'react'
import T from 'prop-types'
import './Content.scss'

class Content extends React.Component {
  render () {
    // TODO: Add a container
    return (
      <div className='container'>
        {this.props.children}
      </div>
    )
  }
}

Content.propTypes = {
  children: T.any.isRequired
}

Content.defaultProps = {
  children: null
}

export default Content
