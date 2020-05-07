<template>
    <div class="float-right cart-summary">
        <small>
            Your cart:
            <span v-if="itemCount > 0">
                {{ itemCount }} item(s) {{ totalPrice | currency }}
            </span>
            <span v-else>
                (empty)
            </span>
        </small>
        <router-link to="/cart" class="btn btn-sm bg-dark text-primary cart-summary__icon" v-bind:disabled="!itemCount">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge badge-light amount-items">{{ itemCount }}</span>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "cart-summary",
    computed: {
        ...mapGetters({
            itemCount: "cart/itemCount",
            totalPrice: "cart/totalPrice"
        })
    },
}
</script>
<style lang="scss" scoped>
.cart-summary {
    height: 100%;
    display: flex;
    align-items: center;
    &__icon {
        position: relative;
    }
    .amount-items {
        position: absolute;
        top: 0;
        right: -5px;
    }
}
</style>