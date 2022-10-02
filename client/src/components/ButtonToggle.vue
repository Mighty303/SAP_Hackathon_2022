<template>
    <div>
        <button @click="toggle()">HELLO</button>
        <div v-if="active">TOGGLED</div>
    </div>
</template>

<script>
    export default {
        name:"ButtonToggle",
        data() {
            return {
                active: false,
            };
        },

        methods: {
            toggle() {
                this.active = !this.active;
            }
        }
    };
</script>