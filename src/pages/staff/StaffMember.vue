<template>
  <li class="media"> <!-- class="mt-5" -->
    <div class="media-left">
      <staff-avatar :size="96" :staff-member="staffMember.name" :avatar-loc="staffMember.avatar"></staff-avatar>
    </div>
    <div class="media-content">
      <h4 class="title is-size-4">{{ staffMember.name }}</h4>

      <p class="block">{{ staffMember.description }}</p>

      <div class="block">
        <h5 class="is-size-5">{{accountsHeader}}</h5>
        <ul>
          <li v-for="mcAccount in staffMember.mcAccounts" :key="mcAccount.uuid">
            <minecraft-account :name="mcAccount.name" :uuid="mcAccount.uuid" fetch-username-from-uuid />
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue'
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
