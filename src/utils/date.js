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

function toLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toDateString(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function formatShortDate(dateStr) {
  const parts = new Intl.DateTimeFormat('es-MX', {
    weekday: 'short', day: 'numeric', month: 'short'
  }).formatToParts(toLocalDate(dateStr));
  const get = (type) => parts.find((p) => p.type === type).value;
  const weekday = get('weekday')
  return `${capitalize(weekday)} ${get('day')} ${get('month')}`
}

export function formatLongDate(dateStr) {
  const formatted = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(toLocalDate(dateStr));
  return capitalize(formatted)
}

export function formatFullDate(dateStr) {
  const formatted = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(toLocalDate(dateStr));
  return capitalize(formatted)
}

export function addDays(dateStr, n) {
  const date = toLocalDate(dateStr)
  date.setDate(date.getDate() + n)
  return toDateString(date)
}