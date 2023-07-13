<template>
  <h3 :id="staffGroup.id" class="mt-5">{{ staffGroup.displayName }}</h3>

  <ul class="list-unstyled">
    <staff-member
      v-for="member in staffGroup.members"
      :key="staffGroup.id + member.name"
      :staff-member="member"
    ></staff-member>
  </ul>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import { type StaffGroupTpe } from '@/pages/staff/StaffPage.vue'
import StaffMember from '@/pages/staff/StaffMember.vue'

defineProps({
  staffGroup: {
    type: Object as PropType<StaffGroupTpe>,
    required: true,
  },
})
</script>
