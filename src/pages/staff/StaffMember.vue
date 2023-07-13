<template>
  <fake-media tag="li" class="mt-5">
    <template #aside>
      <staff-avatar :size="96" :staff-member="staffMember.name" :avatar-loc="staffMember.avatar"></staff-avatar>
    </template>
    <h4>{{ staffMember.name }}</h4>

    <p>{{ staffMember.description }}</p>

    <h5>Minecraft accounts</h5>
    <ul class="list-unstyled">
      <li v-for="mcAccount in staffMember.mcAccounts" :key="mcAccount.uuid">
        <minecraft-account :name="mcAccount.name" :uuid="mcAccount.uuid" fetch-username-from-uuid />
      </li>
    </ul>
  </fake-media>
</template>

<script setup lang="ts">
import FakeMedia from '@/components/FakeMedia.vue'
import StaffAvatar from '@/components/StaffAvatar.vue'
import { type PropType } from 'vue'
import { type StaffMember } from '@/pages/staff/StaffPage.vue'
import MinecraftAccount from '@/components/MinecraftAccount.vue'

defineProps({
  staffMember: {
    type: Object as PropType<StaffMember>,
    required: true,
  },
})
</script>
