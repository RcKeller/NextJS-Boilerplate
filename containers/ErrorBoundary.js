import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardTitle, CardText, Divider } from 'react-md'

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired
  }
  static defaultProps = {
    title: 'this component'
  }
  state = {
    error: '',
    info: ''
  }
  componentDidCatch (error, info) {
    this.setState({ error, info })
  }
  render () {
    const { error, info } = this.state
    const { children, title } = this.props
    if (error) {
      return (
        <Card className='md-block-centered'>
          <CardTitle title={`Loading ${title} has failed`} subtitle='An error has occured' />
          <CardText>
            <p>Try refreshing the page by pressing F5, and report this incident if it reoccurs.</p>
            <Divider />
            <h6>{`Error at ${window && window.location && window.location.href}`}</h6>
            <code>{JSON.stringify(info.componentStack || info)}</code>
          </CardText>
        </Card>
      )
    }
    return children
  }
}
