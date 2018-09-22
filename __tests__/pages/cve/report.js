/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'

import Report from 'pages/cve/report'

describe('CVE Report', () => {
  /*
  Here's how you test getInitialProps / API data fetching
  We're not doing it for real since we depend on a
  third party API, but in production, do this!
  */
  let page
  beforeEach(async () => {
    // const props = await Report.getInitialProps()
    const props = { name: 'Foobar', threat_severity: 'critical' }
    page = shallow(<Report {...props} />)
  })
  it('Loads properly', () => {
    expect(page.find('h1').text())
      .toContain('Foobar - critical')
  })
})
