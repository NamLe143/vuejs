<template>
    <div class="container-fluid store">
        <div class="row">
            <div class="col bg-dark text-white">
                <a class="navbar-brand">SPORTS STORE</a>
                <cart-summary />
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p-2">
                <category-controls  class="mb-5" />
                <button class="btn btn-block btn-warning mt-5" v-on:click="setShowSearch(true)">
                    Search
                </button>
            </div>
            <div class="col-9 p-2">
                <search />
                <product-list />
            </div>
        </div>
    </div>
</template>
<script>
import ProductList from "./ProductList";
import CategoryControls from "./CategoryControls"
import CartSummary from "./CartSummary";
import { mapMutations } from "vuex";
import Search from "./Search";

export default {
    name: "store",
    components: {
        ProductList,
        CategoryControls,
        CartSummary,
        Search
    },
    methods: {
        ...mapMutations(["setShowSearch"])
    }
}
</script>