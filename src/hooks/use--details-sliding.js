import { useState } from 'react'

export function useDetailsSliding(rows, selected) {
  const [selectedId, setSelectedId] = useState(selected)

  const checkIndex = (index) => {
    if (index >= rows.length) {
      return 0
    }

    if (index < 0) {
      return rows.length - 1
    }

    return index
  }

  const handleNext = () => {
    const currentIndex = rows.indexOf(selectedId)
    setSelectedId((prevSelected) => {
      return rows[checkIndex(currentIndex + 1)]
    })
  }

  const handlePrevious = () => {
    const currentIndex = rows.indexOf(selectedId)
    setSelectedId((prevSelected) => {
      return rows[checkIndex(currentIndex - 1)]
    })
  }

  return [selectedId, handleNext, handlePrevious]
}
