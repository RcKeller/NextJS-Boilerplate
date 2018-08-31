import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Router from 'next/router'
import axios from 'axios'
import { API, routing } from 'tools'
import { EMPLOYEE } from 'types'

import { Grid, Cell } from 'react-md'
import { AgGridReact } from 'ag-grid-react'
import { ErrorBoundary } from 'containers'

export default class EMPLOYEE_DASHBOARD_PAGE extends React.Component {
  static async getInitialProps ({ req, res, query }) {
    let props = {}
    try {
      const data = await axios
        .get(`${API(req)}/employee`)
        .then(res => res.data)
      props.employees = data
    } catch (err) {
      routing.redirect('/', res, err)
    }
    return props
  }
  static propTypes = {
    employees: PropTypes.arrayOf(EMPLOYEE.PropType)
  }
  static defaultProps = {
    employees: []
  }
  /*
  navigateOnEnter:
    Callback for datatable rows
    routes users to the record if they press enter
  */
  navigateOnEnter = ({ event, node }) => {
    if (event.key === 'Enter') {
      const { id } = node.data
      Router.push({ pathname: '/employee/profile', query: { id } })
    }
  }
  /*
  Column definitions using the ag-grid API:
    https://www.ag-grid.com/javascript-grid-column-definitions/
    - headerName is what is actually rendered
    - field is the key to cell values
    - suppressKeyboardEvent is really a callback for keypresses
      that includes the row as the "node" propety
  */
  columns = [
    {
      headerName: 'Name',
      field: 'name',
      suppressKeyboardEvent: this.navigateOnEnter
    },
    {
      headerName: 'Title',
      field: 'job_titles',
      suppressKeyboardEvent: this.navigateOnEnter
    },
    // Departments weren't specified in the instructions but it makes sense to have them
    {
      headerName: 'Department',
      field: 'department',
      suppressKeyboardEvent: this.navigateOnEnter
    }
  ]
  render () {
    const { employees } = this.props
    return (
      <article>
        <Helmet title='Dashboard - Employees' />
        <Grid>
          <Cell size={12}>
            <h1>Employee Dashboard</h1>
          </Cell>
          <Cell size={12}>
            <ErrorBoundary title='Employee Datatable'>
              <div id='grid-wrapper' className='ag-theme-balham'>
                <AgGridReact
                  columnDefs={this.columns}
                  rowData={employees}
                  enableSorting
                  enableFilter
                  pagination
                  editType='fullRow'
                />
              </div>
            </ErrorBoundary>
          </Cell>
        </Grid>
      </article>
    )
  }
}
