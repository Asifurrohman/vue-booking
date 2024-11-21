<template>
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <template v-if="!eventsLoading">
            <EventCard v-for="event in events" v-bind:key="event.id" @register="handleRegistration(event)" :title="event.title" :eventDate="event.date" :description="event.description"/>
        </template>
        <template v-else>
            <LoadingEventCard v-for="i in 4" v-bind:key="i"/>
        </template>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
        <template v-if="!bookingsLoading">
            <BookingItem v-for="booking in bookings" v-bind:key="booking.id" :title="booking.eventTitle" :status="booking.status" @cancelled="cancelBooking(booking.id)"/>
        </template>
        <template v-else>
            <LoadingBookingItem v-for="i in 4" v-bind:key="i"/>
        </template>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import LoadingEventCard from '@/components/LoadingEventCard.vue'
import LoadingBookingItem from '@/components/LoadingBookingItem.vue'
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'

const events = ref([])
const eventsLoading = ref(false)

const bookings = ref([])
const bookingsLoading = ref(false)

const fetchEvents = async () => {
    eventsLoading.value = true
    try{
        const response = await axios.get('http://localhost:3001/events')
        events.value = response.data
    } finally {
        eventsLoading.value = false
    }
}

const fetchBookings = async () => {
    bookingsLoading.value = true
    try{
        const response = await axios.get('http://localhost:3001/bookings')
        bookings.value = response.data
    } finally {
        bookingsLoading.value = false
    }
}

const findBookingById = (id) => bookings.value.findIndex((b) => b.id === id)

const handleRegistration = async (event) => {
    if(bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)){
        alert('You are already registered for this event')
        return
    }
    
    const newBooking = {
        id: Date.now().toString(),
        userId: 1,
        eventId: event.id,
        eventTitle: event.title,
        status: 'pending'
    }
    
    bookings.value.push(newBooking)
    
    try{
        const response = await axios.post('http://localhost:3001/bookings', {
            ...newBooking,
            status: 'confirmed'
        })
        
        if(response.status === 201){
            const index = findBookingById(newBooking.id)
            bookings.value[index] = await response.data
        } else {
            throw new Error('Failed to confirm booking')
        }
    } catch(e) {
        console.log('Failed to register to event', e)
        bookings.value = bookings.value.filter((b) => b.id !== newBooking.id)
    }
}

const cancelBooking = async (bookingId) => {
    const index = findBookingById(bookingId)
    const originalBooking = bookings.value[index]
    bookings.value.splice(index, 1)

    try{
        const response = await axios.delete(`http://localhost:3001/bookings/${bookingId}`)
        if(!response.status === 201){
            throw new Error('Booking cannot be cancelled')
        }
    } catch(e) {
        console.error('Failed to cancel booking', e)
        bookings.value.splice(index, 0, originalBooking)
    }
}

onMounted(() => {
    fetchEvents(),
    fetchBookings()
})
</script>

<style scoped>

</style>