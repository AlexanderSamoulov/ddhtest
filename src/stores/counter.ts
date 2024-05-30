import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const date = ref(new Date())

const dateToString=computed(()=>{
    const dayWeek: string[] = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    return `${dayWeek[date.value.getDay()]}, ${date.value.getHours() > 9 ? date.value.getHours() : '0' + date.value.getHours()}:${date.value.getMinutes() > 9 ? date.value.getMinutes() : '0' + date.value.getMinutes()}`
  
})

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment,date,dateToString }
})
