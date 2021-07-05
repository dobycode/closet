<template>
    <div>
        <div class="manage" v-if="this.$store.state.token != null">
            <h1>관리</h1>
        </div>

        <div v-if="this.$store.state.token == null">
          토큰 없음 
        </div>
    </div>
</template>

<script>

export default {
    name: 'Manage'
}
</script>