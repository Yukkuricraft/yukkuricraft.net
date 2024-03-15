<template>
  <fake-media tag="li" class="mt-5">
    <template #aside>
      <staff-avatar :size="96" :staff-member="staffMember.name" :avatar-loc="staffMember.avatar"></staff-avatar>
    </template>
    <h4>{{ staffMember.name }}</h4>

    <p>{{ staffMember.description }}</p>

    <h5>{{ accountsHeader }}</h5>
    <ul class="list-unstyled">
      <li v-for="mcAccount in staffMember.mcAccounts" :key="mcAccount.uuid">
        <minecraft-account :name="mcAccount.name" :uuid="mcAccount.uuid" fetch-username-from-uuid />
      </li>
    </ul>
  </fake-media>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue'
import FakeMedia from '@/components/FakeMedia.vue'
import StaffAvatar from '@/components/StaffAvatar.vue'
import { type StaffMemberTpe } from '@/pages/staff/StaffPage.vue'
import MinecraftAccount from '@/components/MinecraftAccount.vue'

 const props = defineProps({
  staffMember: {
    type: Object as PropType<StaffMemberTpe>,
    required: true,
  },
})

const accountsHeader = computed(() => {
  let header: string = 'Minecraft Account'
  if (props.staffMember.mcAccounts.length > 1) {
    header += 's'
  }
  return header
})
</script>
