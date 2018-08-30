import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import Link from 'next/link'
import axios from 'axios'
import { API } from 'tools'
import { EMPLOYEE } from 'types'

import { AgGridReact } from 'ag-grid-react'

export default class EMPLOYEE_DASHBOARD_PAGE extends React.Component {
  static async getInitialProps ({ req, query }) {
    let props = {}
    try {
      const { data } = await axios(`${API(req)}/employee`)
      props.employees = data
    } catch (err) {
      console.error('pages/employee/dashboard.js')
    }
    return props
  }
  static propTypes = {
    employees: PropTypes.arrayOf(EMPLOYEE.PropType)
  }
  static defaultProps = {
    employees: []
  }
  columns = [
    {
      headerName: 'Name',
      field: 'name',
      suppressKeyboardEvent: ({ event, node }) => {
        if (event.key === 'Enter') {
          console.log('Route Me', event, node)
        }
      }
    },
    {
      headerName: 'Title',
      field: 'job_titles'
    }
  ]
  render () {
    const { employees } = this.props
    console.log(employees)
    return (
      <article>
        <Helmet title='Dashboard - Employees' />
        <section>
          <h1>Employee Dashboard</h1>
          <div className='ag-theme-balham' style={{ height: '50em', maxHeight: '70vh' }}>
            <AgGridReact
              columnDefs={this.columns}
              rowData={employees}
              enableSorting
              enableFilter
              pagination
              editType='fullRow'
            />
          </div>
        </section>
      </article>
    )
  }
}
