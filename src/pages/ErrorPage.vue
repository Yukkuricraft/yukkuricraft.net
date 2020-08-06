<template>
  <normal-page :is-error="true">
    <h1>Something went wrong</h1>
    <h2>Something went wrong when we tried to load your page. Please try again, or submit a bug report.</h2>
  </normal-page>
</template>

<script>
import NormalPage from '../layout/NormalPage'
export default {
  components: { NormalPage },
}
</script>
