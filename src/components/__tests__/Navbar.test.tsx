import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders brand and links', () => {
    render(<Navbar />)
    expect(screen.getByText(/SecNews/i)).toBeInTheDocument()
    expect(screen.getByText(/Subscribe/i)).toBeInTheDocument()
  })
})
