import React from 'react'
import Helmet from 'react-helmet'

export default class INDEX_PAGE extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  render () {
    return (
      <article>
        <Helmet title='Home - Chicago HR System' />
        <section>
          <h1>Welcome to Chigago HR</h1>
          <p>Please use the navigation bar.</p>
        </section>
      </article>
    )
  }
}
