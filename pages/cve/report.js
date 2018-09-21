import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import axios from 'axios'
import { API } from 'tools'
import { CVE } from 'enums'

import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from 'react-md'

export default class CVE_PAGE extends React.Component {
  // ENV: SSR
  static async getInitialProps ({ req, res, query }) {
    let props = {}
    try {
      const { id } = req ? req.params : query
      const cve = await axios
        .get(`${API(req)}/cve/${id}`)
        .then(res => res.data)
        .catch(Error)
      props = cve
    } catch (err) {
      console.error('cve.js:', err)
    }
    return props
  }
  // ENV: CSR
  static propTypes = {
    ...CVE.PropType
  }
  static defaultProps = {}
  render () {
    const { name, cwe, public_date, threat_severity, statement, mitigation, upstream_fix, bugzilla, details, package_state } = this.props
    const { description } = bugzilla || {}
    return (
      <article>
        <Helmet title='CVE Dashboard' />
        <section>
          <h1>
            <span>
              {`${name} - ${threat_severity}`}
            </span>
            <span style={{ float: 'right' }}>
              {public_date && new Date(public_date).toLocaleDateString('en-US')}
            </span>
          </h1>
          <h2>{cwe}</h2>
          <hr />
          <h3>Description</h3>
          <p>{description}</p>
          {details && <p>{details.join('\n')}</p>}
          <h3>Affected Systems</h3>
          <DataTable plain>
            <TableHeader>
              <TableRow>
                <TableColumn>Product</TableColumn>
                <TableColumn>Package</TableColumn>
                <TableColumn>Fix State</TableColumn>
                <TableColumn>CPE</TableColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(package_state) && package_state.map((p, i) => (
                <TableRow key={i}>
                  <TableColumn>{p.product_name}</TableColumn>
                  <TableColumn>{p.package_name}</TableColumn>
                  <TableColumn>{p.fix_state}</TableColumn>
                  <TableColumn>{p.cpe}</TableColumn>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
          <h3>Mitigation</h3>
          <p>{statement}</p>
          <p>{mitigation}</p>
          <h3>Fixes</h3>
          {upstream_fix
            ? <ul>
              {upstream_fix.split(', ').map((fix, i) => (
                <li key={i}>{fix}</li>
              ))}
            </ul>
            : <p>Not Available.</p>
          }
        </section>
      </article>
    )
  }
}
