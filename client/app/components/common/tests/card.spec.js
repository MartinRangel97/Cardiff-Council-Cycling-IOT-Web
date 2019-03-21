import React from 'react'
import { shallow } from 'enzyme'

import Card from '../card'

// Prepare a mock function
const mockOnClick = jest.fn()

describe('Card Component', () => {
  // Reset the Mock
  beforeEach(() => {
    mockOnClick.mockClear()
  })
  // General Tests
  it('Renders without crashing', () => {
    shallow(<Card>Test Child</Card>)
  })
  it('OnClick event fires', () => {
    let wrapper = shallow(<Card onClick={mockOnClick}>Test Child</Card>)
    wrapper.find('a.card').first().simulate('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Standard card style matches Snapshot', () => {
      let wrapper = shallow(<Card>Test Child</Card>)
      expect(wrapper).toMatchSnapshot()
    })
    it('OnClick card style matches Snapshot', () => {
      let wrapper = shallow(<Card onClick={mockOnClick}>Test Child</Card>)
      expect(wrapper).toMatchSnapshot()
    })
    it('Link card style matches Snapshot', () => {
      let wrapper = shallow(<Card link='/test'>Test Child</Card>)
      expect(wrapper).toMatchSnapshot()
    })
    it('Custom class card style matches Snapshot', () => {
      let wrapper = shallow(<Card className='test'>Test Child</Card>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
