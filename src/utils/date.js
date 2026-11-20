export function getTodayInMexico() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatShortDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const fecha = new Date(year, month - 1, day)
  const parts = new Intl.DateTimeFormat('es-MX', {
    weekday: 'short', day: 'numeric', month: 'short'
  }).formatToParts(fecha);
  const get = (type) => parts.find((p) => p.type === type).value;
  const weekday = get('weekday')
  return `${capitalize(weekday)} ${get('day')} ${get('month')}`
}

export function formatLongDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const fecha = new Date(year, month - 1, day)
  const formatted = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(fecha);
  return capitalize(formatted)
}