<template>
    <div class="container">
        <div v-if="showSearch" class="row my-2">
            <label class="col-1 col-form-label text-left">Search:</label>
            <input class="col form-control" v-bind:value="searchTerm" v-on:input="doSearch"
                placeholder="Enter search term..." />
            <button class="col-1 btn btn-sm btn-secondary mx-4" v-on:click="handleClose">
                Close
            </button>
        </div>
        <div v-if="!pageCount" class="row my-2">
            <label class="col col-form-label text-center">No data</label>  
        </div>
    </div>
</template>
<script>
    import {
        mapMutations,
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        name: "search",
        computed: {
            ...mapState(["showSearch", "searchTerm"]),
            ...mapGetters(["pageCount"])
        },
        methods: {
            ...mapMutations(["setShowSearch"]),
            ...mapActions(["clearSearchTerm", "search"]),
            handleClose() {
                this.clearSearchTerm();
                this.setShowSearch(false);
            },
            doSearch($event) {
                this.search($event.target.value);
            }
        }
    }
</script>