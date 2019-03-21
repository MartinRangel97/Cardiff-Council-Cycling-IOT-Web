import React from 'react'
import { shallow } from 'enzyme'

import Toggle from '../toggle'

describe('Toggle Component', () => {
  it('Checked Implementation renders without crashing', () => {
    shallow(<Toggle checked />)
  })
  it('Default Checked implementation renders without crashing', () => {
    shallow(<Toggle defaultChecked />)
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Checked toggle matches snapshot', () => {
      let wrapper = shallow(<Toggle checked />)
      expect(wrapper).toMatchSnapshot()
    })
    it('Default checked toggle matches snapshot', () => {
      let wrapper = shallow(<Toggle defaultChecked />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
