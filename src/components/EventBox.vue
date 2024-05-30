<template>
  <div>
    <div class="event-box" :class="{ 'event-box-active': isCurrent }">
      <div class="event-box__inner" :class="{ 'event-box__inner-lecture': isLecture }">
        <div v-if="isCurrent" class="event-box__bar">
          <div class="event-box__bar-line" :style="barPersent()"></div>
        </div>
        <span class="event-box__time-box">
          <span class="event-box__time">{{ startEndTime() }}</span>
          <span v-if="isCurrent" class="event-box__end-time">{{ restTime }}</span>
        </span>
        <div v-if="twoAdjacentItems.length > 0" class="event-box__speakers">
          <SpeakerCard v-for="speaker in twoAdjacentItems" :key="speaker.name" v-bind="speaker" />
        </div>
        <div class="event-box__name" :class="{ 'event-box__name-lecture': isLecture }">
          {{ name }}
        </div>
        <div v-if="isLecture" class="event-box__footer">
          <div class="event-box__type">{{ eventType }}</div>
          <div class="event-box__lang">{{ lang }}</div>
          <div class="event-box__theme">{{ theme }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SpeakerCard from './SpeakerCard.vue'
import { minutesToTime } from '../helpers/Time'
import type { SpeakerList } from './../types/interfaces'
const props = defineProps({
  name: String,
  startTime: Number,
  endTime: Number,
  speakers: String,
  speakersPhotos: String,
  eventType: String,
  lang: String,
  theme: String,
  isCurrent: Boolean,
  time: Number
})
const isLecture = ref<boolean>(props.speakers !== '-')
const speakerList = ref<SpeakerList[] | []>([])
const currentIndexSpeaker = ref(0)

if (props.speakers) {
  speakerList.value = props.speakers
    ?.split('; ')
    .map((str) => str.split('/'))
    .filter((el) => el[0].search(/[a-z,а-я]/i) != -1)
    .map((el) => {
      return {
        name: el[0],
        post: el[1],
        photo: props.speakersPhotos
      }
    })
}

const twoAdjacentItems = computed(() => {
  if (speakerList.value.length <= 2) {
    return speakerList.value
  } else {
    return [
      speakerList.value[currentIndexSpeaker.value] || {},
      speakerList.value[(currentIndexSpeaker.value + 1) % speakerList.value.length] || {}
    ]
  }
})

function nextPair() {
  currentIndexSpeaker.value = (currentIndexSpeaker.value + 1) % speakerList.value.length
}

setInterval(() => {
  nextPair()
}, 10000)

const startEndTime = (): string | null => {
  if (props.startTime || props.endTime) {
    return `${minutesToTime(props.startTime)} - ${minutesToTime(props.endTime)}`
  } else return null
}

const restTime = computed(() => {
  if (props.endTime && props.time) {
    return `Осталось ${props.endTime - props.time} мин.`
  } else {
    return 'Не задано время окончания'
  }
})

const barPersent = () => {
  if (props.endTime && props.time && props.startTime) {
    return `width:${Math.round(((props.time - props.startTime) / (props.endTime - props.startTime)) * 100)}%`
  }
}
</script>

<style scoped lang="scss">
.event-box {
  --text-color: rgba(94, 94, 94, 1);
  --bg-color: rgba(238, 238, 238, 1);
  --bg-event-type: rgba(132, 132, 132, 1);
  --color-event: rgb(255, 255, 255);
  --border-color: rgba(132, 132, 132, 1);
  --bg-color-isnolecture: rgba(255, 255, 255, 1);
  color: var(--text-color);
  position: relative;
  margin-bottom: 5vw;
  &-active {
    --bg-color: rgba(119, 116, 33, 1);
    --text-color: rgba(255, 255, 255, 1);
    --bg-event-type: rgba(241, 198, 88, 1);
    --color-event: rgba(33, 52, 119, 1);
    --border-color: rgba(166, 212, 71, 1);
    --bg-color-isnolecture: var(--bg-color);
  }
  &::before {
    content: '';
    height: 0.3rem;
    width: 5rem;
    position: absolute;
    top: 7.2rem;
    left: 3rem;
    background-color: var(--bg-color);
  }
  &::after {
    content: '';
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: 6.3rem;
    left: 1.1rem;
    border: 0.6rem solid var(--bg-color);
    border-radius: 50%;
  }

  .event-box__inner {
    --text-color: black;
    position: relative;
    overflow: hidden;
    margin-left: 8rem;
    padding: 2rem;
    border: 0.5rem solid var(--bg-color);
    border-radius: 2vw;
    background-color: var(--bg-color-isnolecture);
    &-lecture {
      --text-color: white;
      background-color: var(--bg-color);
      padding: 3rem;
    }
    .event-box__bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2rem;
      background-color: rgba(71, 82, 90, 1);
      .event-box__bar-line {
        background: linear-gradient(rgba(116, 212, 71, 1), rgba(198, 255, 82, 1));
        height: 100%;
      }
    }
    .event-box__time-box {
      .event-box__time {
        font-size: 6rem;
        font-weight: 600;
        margin-right: 2.2rem;
      }
      .event-box__end-time {
        position: absolute;
        right: 5%;
        font-size: 2rem;
      }
    }
    .event-box__speakers {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .event-box__name {
      display: inline-block;
      font-size: 5rem;
      font-weight: 300;
      &-lecture {
        font-weight: 700;
      }
    }
    .event-box__footer {
      display: flex;
      font-size: 2.2rem;
      font-weight: 300;
      width: 100%;
      justify-content: space-between;
      margin-top: 5rem;
      & > * {
        padding: 1.2rem 2rem;
        border-radius: 1vw;
      }
      .event-box__type {
        color: var(--color-event);
        background-color: var(--bg-event-type);
      }
      .event-box__lang {
        border: 1px solid var(--border-color);
      }
      .event-box__theme {
        border: 1px solid var(--border-color);
      }
    }
  }
}
</style>
