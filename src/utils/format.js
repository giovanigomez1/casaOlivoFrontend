const priceFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0
})


export const formatPrice = (value) => priceFormatter.format(value)