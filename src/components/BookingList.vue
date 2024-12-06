<template>
    <template v-if="error">
        <ErrorCard :retry="refreshPage">
            Could not load bookings at the moment. Please Try Again
        </ErrorCard>
    </template>
    <template v-else>
        <section class="grid grid-cols-1 gap-4">
            <template v-if="!loading">
                <BookingItem v-for="booking in bookings" v-bind:key="booking.id" :title="booking.eventTitle" :status="booking.status" @cancelled="cancelBooking(booking.id)"/>
            </template>
            <template v-else>
                <LoadingBookingItem v-for="i in 4" v-bind:key="i"/>
            </template>
        </section>
    </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import useBookings from '@/composables/useBookings'

import BookingItem from '@/components/BookingItem.vue'
import LoadingBookingItem from '@/components/LoadingBookingItem.vue'
import ErrorCard from './ErrorCard.vue'

const { bookings, loading, error, fetchBookings, handleRegistration, cancelBooking } = useBookings

const router = useRouter()

const refreshPage = () => {
    router.go()
}

onMounted(() => {
    fetchBookings()
})
</script>

<style scoped>

</style>