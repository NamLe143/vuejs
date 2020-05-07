<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col bg-dark text-white">
                    <a class="navbar-brand">SPORTS STORE</a>
                </div>
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>Name</label>
                <input v-model="$v.order.name.$model" class="form-control " />
                <validation-error v-bind:validation="$v.order.name" />
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>Email</label>
                <input v-model="$v.order.email.$model" class="form-control " />
                <validation-error v-bind:validation="$v.order.email" />
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>Address</label>
                <input v-model="$v.order.address.$model" class="form-control " />
                <validation-error v-bind:validation="$v.order.address" />
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>City</label>
                <input v-model="$v.order.city.$model" class="form-control " />
                <validation-error v-bind:validation="$v.order.city" />
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>Zip</label>
                <input v-model="$v.order.zip.$model" class="form-control " />
                <validation-error v-bind:validation="$v.order.zip" />
            </div>
        </div>
        <div class="text-center">
            <router-link to="/cart" class="btn btn-secondary m-1">
                Back
            </router-link>
            <button class="btn btn-primary m-1" v-on:click="submitOrder">
                Place Order
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: null
            }
        },
        methods: {
            submitOrder() {

            }
        },
    }
</script>