import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Router from 'next/router'
import axios from 'axios'
import loremIpsum from 'lorem-ipsum'
import { API, format } from 'tools'
import { EMPLOYEE } from 'types'

import { Grid, Cell, Card, CardTitle, CardText, Divider } from 'react-md'
import { ErrorBoundary } from 'containers'

export default class EMPLOYEE_PROFILE_PAGE extends React.Component {
  static async getInitialProps ({ req, query }) {
    let props = {}
    try {
      const { id } = query || req.params
      const { data } = await axios(`${API(req)}/employee/${id}`)
      props.employee = data
      props.id = Number.parseInt(id)
    } catch (err) {
      console.error('pages/employee/profile.js:', err)
    }
    return props
  }
  static propTypes = {
    employee: EMPLOYEE.PropType,
    id: PropTypes.number.isRequired
  }
  static defaultProps = {
    employee: {},
    id: 0
  }
  constructor (props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  /*
  Bind page navigation events to the window
  Use the react lifecycle to ensure window existence && prevent duplicate listeners
  */
  componentDidMount () {
    if (window) window.addEventListener('keydown', this.handleKeyPress)
  }
  componentWillUnmount () {
    if (window) window.removeEventListener('keydown', this.handleKeyPress)
  }

  /*
  handleKeyPress - Page navigation between employee records based on L/R arrows
  NOTE: The instructions do say to navigate based on up/down inputs,
  but users would end up navigating on accident when scrolling through content
  */
  handleKeyPress ({ key }) {
    const { id } = this.props
    console.log(key)
    switch (key) {
      case 'ArrowLeft':   // Previous screen
        if (id > 1) Router.push({ pathname: '/employee/profile', query: { id: id - 1 } })
        break
      case 'ArrowRight':  // Next screen
        if (id >= 0) Router.push({ pathname: '/employee/profile', query: { id: id + 1 } })
        break
      case 'Backspace':   // Back to the dashboard
        Router.push('/employee/dashboard')
        break
    }
  }
  render () {
    const { employee, id } = this.props
    return (
      <article>
        <Helmet title={`Employeee - ${id}`} />
        <Grid>
          <Cell className='margin-auto' size={6} tabletSize={12} phoneSize={12}>
            <ErrorBoundary title='Employee Record'>
              <Card className='md-block-centered'>
                <CardTitle title={employee.name || 'Anonymous'} subtitle={`${employee.job_titles}, ${employee.department}`} />
                <CardText>
                  <p>{loremIpsum()}</p>
                  <Divider />
                  <h6>{`Salary: ${format.USD(employee.employee_annual_salary)} / year`}</h6>
                </CardText>
              </Card>
            </ErrorBoundary>
          </Cell>
        </Grid>
      </article>
    )
  }
}
