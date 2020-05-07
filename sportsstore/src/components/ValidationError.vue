<template>
    <div v-if="show" class="text-danger">
        <div v-for="m in messages" v-bind:key="m">{{ m }}</div>
    </div>
</template>
<script>
export default {
    name: 'validation-error',
    props: {
        validation: null 
    },
}
</script>