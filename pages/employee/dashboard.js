import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import axios from 'axios'
// import { API } from 'tools'
import { EMPLOYEE } from 'constants'

export default class EMPLOYEE_DASHBOARD extends React.Component {
  static propTypes = {
    employees: PropTypes.arrayOf(EMPLOYEE.PropType)
  }
  static defaultProps = {
    employees: []
  }
  render () {
    return (
      <article>
        <Helmet title='Dashboard - Employees' />
        <section>
          <h1>Create New Employee</h1>
          <p>...</p>
        </section>
      </article>
    )
  }
}
