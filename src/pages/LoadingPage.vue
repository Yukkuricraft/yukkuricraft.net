<template>
  <normal-page :is-error="true">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="6x"></font-awesome-icon>
  </normal-page>
</template>
<script>
import NormalPage from '../layout/NormalPage'

export default {
  components: { NormalPage },
}
</script>
