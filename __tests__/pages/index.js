/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'

import Index from 'pages/'

describe('CVE Dashboard', () => {
  it('Loads properly', () => {
    const page = shallow(<Index />)
    expect(page.find('h1').text())
      .toEqual('RedHat Vulnerability Dashboard')
  })
})

// I do not recommend snapshot tests, but here's how it's done:
/*
import renderer from 'react-test-renderer'
describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
*/
