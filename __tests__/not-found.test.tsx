import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '@/pages/404'

describe('NotFoundPage', () => {
  it('renders a heading', () => {
    render(<NotFound />)

    const heading = screen.getByRole('heading', {
      name: /Nothing here!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
