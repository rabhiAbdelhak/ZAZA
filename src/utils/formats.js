export const removeComma = (number) => {
  if (typeof number === 'number') return number
  const newNumber = number?.replace(',', '')
  return parseFloat(newNumber)
}

export const dinarFormat = (price) => {
  if (!price && price !== 0) return null
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'DZD',
    currencySign: 'accounting',
  })
    .format(removeComma(price))
    .replace(' ', ' ')
}

export const filterToQueryParameters = (filter) => {
  if (!filter) {
    return ''
  }

  const params = []
  for (const property in filter) {
    const value = filter[property]
    if (value) {
      params.push(`${property}=${value}`)
    }
  }
  return params?.length ? `?${params.join('&')}` : ''
}
