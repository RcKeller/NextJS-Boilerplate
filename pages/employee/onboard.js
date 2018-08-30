import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
// import axios from 'axios'
// import { API } from 'tools'
import loremIpsum from 'lorem-ipsum'

import { Grid, Cell, Card, CardText } from 'react-md'
import { ErrorBoundary } from 'containers'

export default class EMPLOYEE_ONBOARDING_PAGE extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  render () {
    return (
      <article>
        <Helmet title='Onboarding' />
        <Grid>
          <Cell size={12}>
            <h1>Employee Onboarding</h1>
          </Cell>
          <Cell size={6} tabletSize={12} phoneSize={12}>
            <ErrorBoundary title='Onboarding Form'>
              <Card className='md-block-centered'>
                <CardText>
                  <p>{loremIpsum()}</p>
                </CardText>
              </Card>
            </ErrorBoundary>
          </Cell>
        </Grid>
      </article>
    )
  }
}
