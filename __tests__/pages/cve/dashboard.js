/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'

import Dashboard from 'pages/cve/dashboard'

describe('CVE Dashboard', () => {
  it('Loads properly', () => {
    const page = shallow(<Dashboard />)
    expect(page.find('h1').text())
      .toEqual('All Open CVEs')
  })
})
