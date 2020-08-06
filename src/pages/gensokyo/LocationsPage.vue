<template>
  <sidebar-page :parallax-images="images">
    <vue-headful
      title="YukkuriCraft - Gensokyo"
      description="Look at all the different places in our Gensokyo."
      :image="require('../../favicon_upscaled.png')"
      url="https://yukkuricraft.net/gensokyo/"
    />

    <template #sidebar>
      <div class="sidebar-header">
        <h2>Locations</h2>
      </div>

      <sidebar-entries
        class="sidebar-components"
        href-prefix="location"
        :subgroups="locations"
        subgroup-children-name="sublocations"
      />
    </template>

    <template #parallax>
      <h1>Locations in Gensokyo</h1>
      <p>Explore our builds in Gensokyo.</p>
    </template>

    <location
      v-for="(location, locationId) in locations"
      :key="locationId"
      :depth="0"
      :location-id="locationId"
      :location="location"
    />
  </sidebar-page>
</template>

<script>
import merge from 'lodash/merge'
import SidebarEntries from '../../components/SidebarEntries'
import SidebarPage from '../../layout/SidebarPage'

import { autoImage } from '../../images'
import { removeExtension } from '../../files'

import locationList from '../../../content/locations/locationList.yaml'
import Location from './Location'

export default {
  components: {
    SidebarPage,
    SidebarEntries,
    Location,
  },
  data() {
    return {
      allLocations: [],
    }
  },
  computed: {
    images() {
      return autoImage('greenhouse')
    },
    locations() {
      // We throw out all the getters and such
      return JSON.parse(JSON.stringify(merge({}, ...this.allLocations)))
    },
  },
  created() {
    const allLocations = locationList.locations.map((entry, idx) => {
      const name = removeExtension(entry, '.yaml')
      return import(/* webpackMode: "eager" */ `../../../content/locations/${name}.yaml`).then((commands) => ({
        commands,
        idx,
      }))
    })

    // We get them all together to hopefully only update the DOM once
    Promise.all(allLocations).then((all) => {
      all.forEach(({ commands, idx }) => {
        this.$set(this.allLocations, idx, commands.default)
      })
    })
  },
}
</script>
