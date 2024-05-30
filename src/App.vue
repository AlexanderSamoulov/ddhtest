<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getTime, getTimeInHeader, dateToMin } from './helpers/Time'
const route = useRoute()
const sectionName = ref<null | string>(null)
const setTime = ref(getTime())
const setDate = ref<Date>(new Date())

/* setInterval(() => {
  setDate.value = new Date()
}, 30000) */

const timeInHeader = computed(() => {
  return getTimeInHeader(setDate.value)
})

watchEffect(() => {
  sectionName.value = String.fromCharCode(64 + Number(route.params.id))
})
const routes = [1, 2, 3, 4, 5]

const incrementHour = () => {
  setDate.value = new Date(setDate.value.getTime() + 60 * 60 * 1000)
}

const decrementHour = () => {
  setDate.value = new Date(setDate.value.getTime() - 60 * 60 * 1000)
}
</script>

<template>
  <main class="main">
    <header class="header">
      <div class="header__settings">
        <span> Изменение времени</span>
        <button @click="decrementHour()" class="header__offset-reduce">-</button>
        <button @click="incrementHour()" class="header__offset-increase">+</button>
        <span>Ссылки</span>
        <router-link
          v-for="router in routes"
          :to="`/${router}`"
          :key="router"
          class="header__routes"
          >{{ router }}</router-link
        >
      </div>
      <div class="header__inner">
        <h1 class="header__name">СЕКЦИЯ {{ sectionName }}</h1>
        <time class="header__time">{{ timeInHeader }}</time>
      </div>
    </header>
    <RouterView :time="setTime" :date="setDate" />
  </main>
</template>

<style scoped lang="scss">
.main {
  max-width: 1010px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  .header {
    .header__settings {
      font-size: 2rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 5rem;
      background-color: rgba(119, 116, 33, 1);
      span {
        font-size: 2.5rem;
        margin: 0 2rem;
      }
      .header__offset-reduce,
      .header__offset-increase,
      .header__routes {
        text-decoration: none;
        width: 5%;
        height: 3rem;
        background-color: rgba(166, 212, 71, 1);
        margin-right: 1%;
        border-radius: 0.5rem;
      }
    }
    .header__inner {
      margin-left: 8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header__name {
        font-size: 10rem;
        font-weight: 700;
        margin: 0;
      }
      .header__time {
        font-size: 6rem;
        font-weight: 700;
      }
    }
  }
}
</style>
