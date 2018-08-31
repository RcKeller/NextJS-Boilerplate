import React from 'react'
import Helmet from 'react-helmet'
import Router from 'next/router'
import axios from 'axios'
import loremIpsum from 'lorem-ipsum'
import { API } from 'tools'

import { Grid, Cell, Card, CardTitle, CardText } from 'react-md'
import { ProfileForm } from 'components'
import { ErrorBoundary } from 'containers'

export default class EMPLOYEE_ONBOARDING_PAGE extends React.Component {
  static propTypes = {}
  static defaultProps = {}
  /*
  Submit new employee profile
    I would normally have this be a controlled component
    But for the sake of simplicity here, I'm using native APIs
  */
  onSubmit (event) {
    event.preventDefault()
    try {
      const form = new FormData(event.target)
      let data = {}
      for (let [key, value] of form.entries()) {
        data[key] = value
      }
      axios
        .post(`${API()}/employee`, data)
        .then(res => {
          const { id } = res.data
          id
            ? Router.push({ pathname: '/employee/profile', query: { id } })
            : Error('Server failed to create a new record')
        })
        .catch(err => Error('Failed to post', err))
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }
  render () {
    return (
      <article>
        <Helmet title='Onboarding' />
        <Grid>
          <Cell className='margin-auto' size={6} tabletSize={12} phoneSize={12}>
            <Card className='md-block-centered'>
              <CardTitle title='Employee Onboarding' />
              <CardText>
                <p>{`Instructions: ${loremIpsum()}`}</p>
              </CardText>
              <ErrorBoundary title='Onboarding Form'>
                <ProfileForm onSubmit={this.onSubmit} includeSalary />
              </ErrorBoundary>
            </Card>
          </Cell>
        </Grid>
      </article>
    )
  }
}
