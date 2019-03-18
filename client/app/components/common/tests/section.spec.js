import React from 'react'
import { shallow } from 'enzyme'

import Section from '../section'

// Prepare a mock child
const MockChild = () => {
  return (
    <div className='child-div' />
  )
}

describe('Section Component', () => {
  // General Tests
  it('Renders without crashing', () => {
    shallow(
      <Section title='Test'>
        <MockChild />
      </Section>
    )
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Section matches Snapshot', () => {
      let wrapper = shallow(
        <Section title='Test'>
          <MockChild />
        </Section>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
