import { useState } from 'react'

function useSelectedListItem<T>(list: T[] | undefined = []) {
  const [selectedItem, setSelectedItem] = useState<T>()

  const goNext = () => {
    if (!selectedItem || !list.length) {
      return
    }
    const index = list.indexOf(selectedItem)
    const item = list[index + 1] || list[0]
    setSelectedItem(item)
  }

  const goPrev = () => {
    if (!selectedItem || !list.length) {
      return
    }
    const index = list.indexOf(selectedItem)
    const item = list[index - 1] || list[list.length - 1]
    setSelectedItem(item)
  }

  return { selectedItem, setSelectedItem, goNext, goPrev }
}

export default useSelectedListItem
