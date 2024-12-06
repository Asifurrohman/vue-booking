<template>
    <SectionCard>
        <div class="flex justify-between">
            <div class="flex space-x-2">
                <div>{{ title }}</div>
                <div><component :is="icon" :class="{ 'animate-spin': pending }"/></div>
            </div>
            <RoundButton variant="danger" @click="$emit('cancelled')">
                Cancel
            </RoundButton>
        </div>
    </SectionCard>
</template>

<script setup>
import { computed } from 'vue'
import { Loader, Check } from 'lucide-vue-next'

import SectionCard from '@/components/SectionCard.vue'
import RoundButton from './RoundButton.vue'

const props = defineProps({
    title: String,
    status: String

})

defineEmits([
    'cancelled'
])

const pending = computed(() => props.status === 'pending')
const icon = computed(() => pending.value ? Loader : Check)

</script>

<style scoped>

</style>