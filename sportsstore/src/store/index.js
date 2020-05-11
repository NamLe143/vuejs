import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";


Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
    strict: true,
    state: {
        // products: [],
        categoriesData: [],
        // productsTotal: 0,
        currentPage: 1,
        pageSize: 8,
        currentCategory: "All",
        pages: [],
        serverPageCount: 0,
        searchTerm: "",
        showSearch: false,
    },
    getters: {
        // productsFilterCategory: state => state.products.filter(p => state.currentCategory === "All" || p.category === state.currentCategory),
        processedProducts: (state) => {
            // let index = (state.currentPage - 1) * state.pageSize;
            // return getters.productsFilterCategory.slice(index, index + state.pageSize);
            return state.pages[state.currentPage];
        },
        // pageCount: (state, getters) => Math.ceil(getters.productsFilterCategory.length / state.pageSize),
        pageCount: state => state.serverPageCount,
        categories: state => ["All", ...state.categoriesData]
    },
    mutations: {
        _setCurrentPage(state, page) {
            console.log(state, page);
            state.currentPage = page;
        },
        _setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        _setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1
        },
        // setData(state, data) {
        //     state.products = data.pdata;
        //     state.productsTotal = data.pdata.length;
        //     state.categoriesData = data.cdata.sort();
        // }
        addPage(state, page) {
            console.log(page, 'page');
            
            for (let i = 0; i < page.pageCount; i++) {
                Vue.set(state.pages, page.number + i,
                    page.data.slice(i * state.pageSize,
                        (i * state.pageSize) + state.pageSize));
            }
        },
        clearPages(state) {
            state.pages.splice(0, state.pages.length);
        },
        setCategories(state, categories) {
            state.categoriesData = categories;
        },
        setPageCount(state, count) {
            state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
        },
        setSearchTerm(state, term) {
            state.searchTerm = term;
            state.currentPage = 1;
        },
        setShowSearch(state, show) {
            state.showSearch = show;
        }
    },
    actions: {
        async getData(context) {
            await context.dispatch("getPage");
            const listCategories = (await Axios.get(categoriesUrl)).data;
            console.log(listCategories, 'listCategories')
            context.commit("setCategories", listCategories);
        },
        async getPage(context, getPageCount = 1) {
            let url = `${productsUrl}?_page=${context.state.currentPage}` +
                `&_limit=${context.state.pageSize * getPageCount}`;
            if (context.state.currentCategory != "All") {
                url += `&category=${context.state.currentCategory}`;
            }
            if (context.state.searchTerm) {
                console.log(context.state.searchTerm)
                url += `&q=${context.state.searchTerm.trim()}`;
            }
            let response = await Axios.get(url);
            console.log(response, 'response')
            context.commit("setPageCount", response.headers["x-total-count"]);
            context.commit("addPage", {
                number: context.state.currentPage,
                data: response.data,
                pageCount: getPageCount
            });
        },
        setCurrentPage(context, page) {
            context.commit("_setCurrentPage", page);
            if (!context.state.pages[page]) {
                context.dispatch("getPage");
            }
        },
        setPageSize(context, size) {
            context.commit("clearPages");
            context.commit("_setPageSize", size);
            context.dispatch("getPage");
        },
        setCurrentCategory(context, category) {
            context.commit("clearPages");
            context.commit("_setCurrentCategory", category);
            context.dispatch("getPage");
        },
        search(context, term) {
            context.commit("setSearchTerm", term);
            context.commit("clearPages");
            context.dispatch("getPage")
        },
        clearSearchTerm(context) {
            context.commit("setSearchTerm", "");
            context.commit("clearPages");
            context.dispatch("getPage");
        }
    },
    modules: {
        cart: CartModule,
        orders: OrdersModule,
        auth: AuthModule
    }
})