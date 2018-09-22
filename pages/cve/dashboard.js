import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import axios from 'axios'
import Link from 'next/link'
import { API } from 'tools'
import { CVE } from 'enums'

import ReactTable from 'react-table'

export default class CVES_PAGE extends React.Component {
  static async getInitialProps ({ req, query }) {
    let props = {}
    try {
      const cves = await axios
        .get(`${API(req)}/cve`)
        .then(res => res.data)
        .catch(Error)
      props.cves = cves
    } catch (err) {
      console.error('cves.js:', err)
    }
    return props
  }
  static propTypes = {
    cves: PropTypes.arrayOf(
      PropTypes.shape(CVE.PropType)
    )
  }
  static defaultProps = {
    cves: []
  }
  columns = [
    {
      Header: 'Overview',
      columns: [
        {
          Header: 'CVE',
          accessor: 'CVE',
          Cell: row => (
            <Link href={`/cve/report?id=${row.value}`}>{row.value}</Link>
          )
        },
        {
          Header: 'CWE',
          accessor: 'CWE'
        }
      ]
    },
    {
      Header: 'Severity',
      columns: [
        {
          Header: 'Level',
          accessor: 'severity'
        },
        {
          Header: 'Score',
          accessor: 'cvss3_score'
        }
      ]
    },
    {
      Header: 'Description',
      columns: [
        {
          Header: 'Bugzilla',
          accessor: 'bugzilla_description'
        },
        {
          Header: 'API Source',
          accessor: 'resource_url'
        }
      ]
    }
  ]
  render () {
    return (
      <article>
        <Helmet title='CVE Dashboard' />
        <section>
          <h1>All Open CVEs</h1>
          <ReactTable
            data={this.props.cves}
            columns={this.columns}
            defaultPageSize={20}
            className='-striped -highlight'
          />
        </section>
      </article>
    )
  }
}
