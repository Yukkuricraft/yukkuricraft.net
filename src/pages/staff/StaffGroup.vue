<template>
  <h3 :id="staffGroup.id" class="title is-size-3">{{ staffGroup.displayName }}</h3>

  <ul>
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
