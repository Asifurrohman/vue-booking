<template>
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <template v-if="!eventsLoading">
            <EventCard v-for="event in events" v-bind:key="event.id" @register="console.log('registered')" :title="event.title" :eventDate="event.date" :description="event.description"/>
        </template>
        <template v-else>
            <LoadingEventCard v-for="i in 4" v-bind:key="i"/>
        </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
        <BookingItem v-for="i in 3" v-bind:key="i" />
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import LoadingEventCard from '@/components/LoadingEventCard.vue'
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'

const events = ref([])
const eventsLoading = ref(false)

const fetchEvents = async () =>{
    eventsLoading.value = true
    try{
        const response = await axios.get('http://localhost:3001/events')
        events.value = response.data
    } finally {
        eventsLoading.value = false
    }
}

onMounted(fetchEvents)
</script>

<style scoped>

</style>