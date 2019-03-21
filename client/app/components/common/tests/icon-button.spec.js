import React from 'react'
import { shallow } from 'enzyme'

import IconButton from '../icon-button'

// Prepare a mock function and mock image component
const mockOnClick = jest.fn()
const mockImg = () => {
  return (
    <svg />
  )
}

describe('Icon Button Component', () => {
  // Reset the Mock
  beforeEach(() => {
    mockOnClick.mockClear()
  })
  // General Tests
  it('Renders without crashing', () => {
    shallow(<IconButton icon={mockImg} />)
  })
  it('OnClick event fires', () => {
    let wrapper = shallow(<IconButton onClick={mockOnClick} icon={mockImg} />)
    wrapper.find('a.icon-btn').first().simulate('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
  // Snapshot Tests
  describe('Snapshots', () => {
    it('Standard icon button style matches Snapshot', () => {
      let wrapper = shallow(<IconButton icon={mockImg} title='Test' />)
      expect(wrapper).toMatchSnapshot()
    })
    it('Custom class icon button style matches Snapshot', () => {
      let wrapper = shallow(<IconButton className='test' icon={mockImg} title='Test' />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
