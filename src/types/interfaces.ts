export interface Data {
    __1: string
    __2: string
    __3: number
    __4: string
    __5: string
    __6: string
    __7: string
    __8: string
  }
  export interface Event {
    name: string
    startTime: number
    endTime: number
    speakers: string
    speakersPhotos: string
    eventType: string
    lang: string
    theme: string
    isCurrent: boolean
  }
  export interface SpeakerList {
    name: string | undefined
    post: string | undefined
    photo: string | undefined
  }