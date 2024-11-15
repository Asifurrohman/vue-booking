<template>
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EventCard v-for="i in 8" v-bind:key="i" @register="console.log('registered')" title="Vue Conference 2024" eventDate="2024-11-30" description="Conference about Vue JS and Javascript, in addition we will be talking about animals."/>
    </section>
    <h2 class="text-2xl font-medium">Your Bookings</h2>
</template>

<script setup>
import EventCard from '@/components/EventCard.vue'


</script>

<style scoped>

</style>