<template>
  <sidebar-page :parallax-images="parallaxImages" :parallax-height="parallaxHeight">
    <template #sidebar>
      <div class="sidebar-header">
        <h2>{{ sidebarHeader }}</h2>
      </div>

      <sidebar-entries
        class="sidebar-components"
        href-prefix="location"
        :subgroups="locations"
        subgroup-children-name="sublocations"
      />
    </template>

    <template #parallax>
      <slot name="parallax"></slot>
    </template>

    <main>
      <slot></slot>

      <location
        v-for="(location, locationId) in locations"
        :key="locationId"
        :depth="0"
        :location-id="locationId"
        :location="location"
      />
    </main>
  </sidebar-page>
</template>

<script>
import SidebarPage from '../../layout/SidebarPage'
import SidebarEntries from '../../components/SidebarEntries'
import Location from './Location'

export default {
  components: {
    SidebarPage,
    SidebarEntries,
    Location,
  },
  props: {
    parallaxImages: [Object, Promise],
    parallaxHeight: Number,
    sidebarHeader: {
      type: String,
      required: true,
    },
    locations: {
      type: Object,
      required: true,
    },
  },
}
</script>
