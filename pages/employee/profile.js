import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import axios from 'axios'
import { API } from 'tools'
import { EMPLOYEE } from 'types'

export default class EMPLOYEE_PROFILE_PAGE extends React.Component {
  static async getInitialProps ({ req, query }) {
    let props = {}
    try {
      const { id } = req.params
      const { data } = await axios(`${API(req)}/employee/${id}`)
      props.employee = data
      props.id = req.params
    } catch (err) {
      console.error('pages/employee/profile.js:', err)
    }
    return props
  }
  static propTypes = {
    employee: EMPLOYEE.PropType,
    id: PropTypes.number
  }
  static defaultProps = {
    employee: {},
    id: 0
  }
  render () {
    const { employee, id } = this.props
    return (
      <article>
        <Helmet title={`Employeee - ${id}`} />
        <section>
          <h1>Employee Profile</h1>
          <p>{JSON.stringify(employee)}</p>
        </section>
      </article>
    )
  }
}
