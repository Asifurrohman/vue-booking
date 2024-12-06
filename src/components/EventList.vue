<template>
    <template v-if="error">
        <SectionCard>
            <div class="space-y-4 items-center flex flex-col">
                <div class="text-red-500">
                    Could not load events at the moment. Please Try Again
                </div>
                <div>
                    <RoundButton @click="refreshPage()">Retry now</RoundButton>
                </div>
            </div>
        </SectionCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <template v-if="!loading">
                <template v-if="events.length">
                    <EventCard v-for="event in events" v-bind:key="event.id" @register="$emit('register', event)" :title="event.title" :eventDate="event.date" :description="event.description"/>
                </template>
                <template v-else>
                    <div class="col-span-2 text-center text-gray-500">
                        No event yet...
                    </div>
                </template>
            </template>
            <template v-else>
                <LoadingEventCard v-for="i in 4" v-bind:key="i"/>
            </template>
        </section>
        
    </template>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import RoundButton from './RoundButton.vue'
import SectionCard from './SectionCard.vue'
// import { router } from 'json-server'

defineEmits([
'register'
])

const events = ref([])
const loading = ref(false)
const error = ref(null)

const router = useRouter()

const refreshPage = () => {
    router.go()
}

const fetchEvents = async () => {
    loading.value = true
    try{
        const response = await axios.get('http://localhost:3001/events')
        events.value = response.data
    } catch(e){
        error.value = e
    } finally {
        loading.value = false
    }
}

onMounted(() => fetchEvents())
</script>

<style scoped>

</style>