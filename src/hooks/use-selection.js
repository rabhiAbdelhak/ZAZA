import { useState } from 'react'

export const useSelection = (rows) => {
  const [selectedRows, setSelectedRows] = useState([])

  const handleSelect = (event, rowId) => {
    setSelectedRows((prevSelectedRows) => {
      if (event.target.checked) {
        return [...prevSelectedRows, rowId]
      }

      return prevSelectedRows.filter((selectedRow) => selectedRow !== rowId)
    })
  }

  const handleClearSelected = () => {
    setSelectedRows([])
  }

  const handleSelectAll = (event, idAttr) => {
    const identifiant = idAttr ? idAttr : 'id'
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row[identifiant]))
      return
    }

    handleClearSelected()
  }

  const handleSelectOneRow = (id) => {
    setSelectedRows((prevSelected) => {
      return [id]
    })
  }

  return [
    selectedRows,
    handleSelect,
    handleSelectAll,
    handleClearSelected,
    handleSelectOneRow,
  ]
}
