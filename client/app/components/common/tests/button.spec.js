import React from 'react'
import { shallow } from 'enzyme'

import Button from '../button'

// Prepare a mock function
const mockOnClick = jest.fn()

describe('Button Component', () => {
  // Reset the Mock
  beforeEach(() => {
    mockOnClick.mockClear()
  })
  // General Tests
  it('Renders without crashing', () => {
    shallow(<Button text='Test Button' />)
  })
  it('OnClick event fires', () => {
    let wrapper = shallow(<Button text='Test Button' onClick={mockOnClick} />)
    wrapper.find('button.btn').first().simulate('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Standard button style matches Snapshot', () => {
      let wrapper = shallow(<Button text='Test Standard Button' />)
      expect(wrapper).toMatchSnapshot()
    })
    it('Danger button style matches Snapshot', () => {
      let wrapper = shallow(<Button text='Test Danger Button' danger />)
      expect(wrapper).toMatchSnapshot()
    })
    it('Custom class button matches Snapshot', () => {
      let wrapper = shallow(<Button className='test' text='Test Standard Button' />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
