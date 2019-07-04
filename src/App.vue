<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    created () {
        throw new TypeError('sentry webpack upload Error')
    }
}
</script>
