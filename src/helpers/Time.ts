export function getTime(): string {
  const dayWeek: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
  const date: Date = new Date()
  return `${dayWeek[date.getDay()]}, ${String(date.getHours()).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0')}`
}
export function getTimeInHeader(date:Date,offset:number=0): string {
  const dayWeek: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  date.setMinutes(date.getMinutes()+offset)
  return `${dayWeek[date.getDay()]}, ${String(date.getHours()).padStart(2, '0') }:${ String(date.getMinutes()).padStart(2, '0')}`
}

export function timeToMinutes(time: string): number {
  const [hoursStr, minutesStr] = time.split(':').map((part) => parseInt(part, 10))
  const totalMinutes = hoursStr * 60 + minutesStr
  return totalMinutes
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const hoursStr = String(hours).padStart(2, '0')
  const minsStr = String(mins).padStart(2, '0')
  return `${hoursStr}:${minsStr}`
}

export function dateToMin(date:Date,offset:number=0):number{
return date.getHours()*60+date.getMinutes()+offset
}
