import React from 'react'
import { shallow } from 'enzyme'

import Loader from '../loader'

describe('Loader Component', () => {
  // General Tests
  it('Renders without crashing', () => {
    shallow(<Loader />)
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Loader matches Snapshot', () => {
      let wrapper = shallow(<Loader />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
