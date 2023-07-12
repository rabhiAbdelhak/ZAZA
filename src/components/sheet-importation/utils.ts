import XLSX from 'xlsx'
import type { WorkSheet } from 'xlsx'

export function getSheetHeadersRow(sheet: WorkSheet) {
  const cells = XLSX.utils.sheet_to_formulae(sheet).slice(0, 20)
  let listOfNumbers = cells.map((formula) => {
    const row = formula.split("='")[0].split(/[A-Za-z]+/g)[1]
    const rowNumber = Number.isNaN(Number(row)) ? 1 : Number(row)
    return rowNumber
  })

  const frequency: Record<number, number> = {}
  let max = 0
  let mostFrequentNum = listOfNumbers[0] || 1

  for (const num of listOfNumbers) {
    frequency[num] = frequency[num] ? frequency[num] + 1 : 1
    if (frequency[num] > max) {
      max = frequency[num]
      mostFrequentNum = num
    }
  }

  return mostFrequentNum
}

export const getJsonDataFromFile = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const headerRow = getSheetHeadersRow(worksheet)
  const rangeList = XLSX.utils.decode_range(worksheet['!ref'] || 'A1')
  const xlsColumns = Array.from({ length: rangeList.e.c + 1 }, (_, i) =>
    XLSX.utils.encode_col(i),
  )

  const data: any[] = XLSX.utils.sheet_to_json(worksheet, {
    blankrows: false,
    header: 1,
  })
  return { data, headerRow, xlsColumns }
}
