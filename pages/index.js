import React from 'react'
import Helmet from 'react-helmet'

export default class INDEX_PAGE extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  render () {
    return (
      <article>
        <Helmet title='Home' />
        <section>
          <h1>RedHat Vulnerability Dashboard</h1>
          <p>Sample Application using NextJS, Node/Express and React-MD</p>
        </section>
      </article>
    )
  }
}
