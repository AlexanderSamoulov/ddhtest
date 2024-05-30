<template>
  <div class="wrapper-event">
    <EventBox
      v-for="event in currentEvents"
      :key="event.name"
      :name="event.name"
      :startTime="event.startTime"
      :endTime="event.endTime"
      :speakers="event.speakers"
      :speakersPhotos="event.speakersPhotos"
      :eventType="event.eventType"
      :lang="event.lang"
      :theme="event.theme"
      :isCurrent="event.isCurrent"
      :time="currentTime"
    />
  </div>
</template>

<script setup lang="ts">
import EventBox from './../components/EventBox.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { timeToMinutes, dateToMin } from '../helpers/Time'
import type { Data, Event } from './../types/interfaces'
const props = defineProps({
  date: Date
})

const route = useRoute()
const data = ref<null | Data[]>(null)

function fetchData(): void {
  fetch(`json/report_${route.params.id}.json`)
    .then((res) => res.json())
    .then((res) => (data.value = res.slice(1)))
    .catch((err) => console.log(err))
}
watch(
  () => route.params.id,
  () => {
    fetchData()
  }
)
onMounted(() => {
  fetchData()
})

setInterval(() => {
  fetchData()
}, 300000)

const currentTime = computed(() => (props.date ? dateToMin(props.date) : 0))

const currentEvents = computed((): Event[] => {
  if (data.value) {
    return data.value
      .map((event) => {
        let start = timeToMinutes(event.__2)
        let end = start + event.__3
        if (currentTime.value && currentTime.value < end) {
          return {
            name: event.__1,
            startTime: start,
            endTime: end,
            speakers: event.__4,
            speakersPhotos: event.__5,
            eventType: event.__6,
            lang: event.__7,
            theme: event.__8,
            isCurrent: currentTime.value > start && currentTime.value < end ? true : false
          }
        } else return null
      })
      .filter((item) => item)
  } else return []
})
</script>
<style lang="scss" scoped></style>
