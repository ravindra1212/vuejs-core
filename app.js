/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('jquery-confirm');

window.Vue = require('vue');

import Vuelidate from 'vuelidate';
import Message from 'vue-m-message';
import HttpService from './http-service';
import NotificationService from './notification-service';
import Globals from './globals';
import DataService from './data-service';

import VueCookies from 'vue-cookies';

Vue.use(VueCookies)
Vue.use(Vuelidate);
Vue.use(Message);

Vue.$httpService = HttpService;
Vue.$notify = NotificationService;
Vue.$globals = Globals;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

// Before Login Components
Vue.component('login-component', require('./components/User/LoginComponent.vue').default);
Vue.component('register-component', require('./components/User/RegisterComponent.vue').default);
Vue.component('forgot-password-component', require('./components/User/ForgotPasswordComponent.vue').default);
Vue.component('reset-password-component', require('./components/User/ResetPasswordComponent.vue').default);
Vue.component('register-conform-component', require('./components/User/RegisterConformComponent.vue').default);

// After Login Components
Vue.component('profile-component', require('./components/User/ProfileComponent.vue').default);
Vue.component('address-component', require('./components/User/AddressComponent.vue').default);
Vue.component('change-password-component', require('./components/User/ChangePasswordComponent.vue').default);

// Store Manager Components
Vue.component('users-list-component', require('./components/User/UserListComponent.vue').default);
Vue.component('user-add-edit-component', require('./components/User/AddEditUserComponent.vue').default);
Vue.component('user-edit-component', require('./components/User/EditUserComponent.vue').default);

Vue.component('permission-component', require('./components/User/PermissionComponent.vue').default);

// Roles Components
Vue.component('roles-list-component', require('./components/Role/RoleListComponent.vue').default);
Vue.component('role-add-component', require('./components/Role/AddRoleComponent.vue').default);
Vue.component('role-edit-component', require('./components/Role/EditRoleComponent.vue').default);

// Collections Components
Vue.component('AddCollectionComponent', require('./components/Collection/AddCollectionComponent.vue').default);
Vue.component('EditCollectionComponent', require('./components/Collection/EditCollectionComponent.vue').default);
Vue.component('CollectionListComponent', require('./components/Collection/CollectionListComponent.vue').default);

// Products Components
Vue.component('AddProductComponent', require('./components/Inventory/AddProductComponent.vue').default);
Vue.component('EditProductComponent', require('./components/Inventory/EditProductComponent.vue').default);
Vue.component('ProductListComponent', require('./components/Inventory/ProductListComponent.vue').default);

// Size Charts Components
Vue.component('SizeChartListComponent', require('./components/SizeChart/SizeChartListComponent.vue').default);
Vue.component('AddSizeChartComponent', require('./components/SizeChart/AddSizeChartComponent.vue').default);
Vue.component('EditSizeChartComponent', require('./components/SizeChart/EditSizeChartComponent.vue').default);
Vue.component('SizechartModalComponent', require('./components/SizeChart/SizechartModalComponent.vue').default);

// Order Components
Vue.component('OrderListComponent', require('./components/Order/OrderListComponent.vue').default);
Vue.component('OrderDetailComponent', require('./components/Order/OrderDetailComponent.vue').default);
Vue.component('FulfillOrderComponent', require('./components/Order/FulfillOrderComponent.vue').default);
Vue.component('CantfulfillModalComponent', require('./components/Order/CantfulfillModalComponent.vue').default);
Vue.component('DialogComponent', require('./components/Order/DialogComponent.vue').default);

// Sales Rules Components
Vue.component('SalesRuleListComponent', require('./components/SalesRule/SalesRuleListComponent.vue').default);
Vue.component('AddSalesRuleComponent', require('./components/SalesRule/AddSalesRuleComponent.vue').default);
Vue.component('EditSalesRuleComponent', require('./components/SalesRule/EditSalesRuleComponent.vue').default);

// Shared Filters
Vue.component('PriceSliderComponent', require('./shared/components/PriceSliderComponent.vue').default);
Vue.component('IdealForCategoryFilterComponent', require('./shared/components/IdealForCategoryFilterComponent.vue').default);
Vue.component('CategoryFilterComponent', require('./shared/components/CategoryFilterComponent.vue').default);
Vue.component('ColorsFilterComponent', require('./shared/components/ColorsFilterComponent.vue').default);
Vue.component('SizesFilterComponent', require('./shared/components/SizesFilterComponent.vue').default);
Vue.component('CollectionsFilterComponent', require('./shared/components/CollectionsFilterComponent.vue').default);
Vue.component('SalesRulesDiscountFilterComponent', require('./shared/components/SalesRulesDiscountFilterComponent.vue').default);

// finance Components
Vue.component('FinanceComponent', require('./components/Finance/FinanceComponent.vue').default);
Vue.component('DialogFinanceComponent', require('./components/Finance/DialogFinanceComponent.vue').default);
Vue.component('SummaryFinanceComponent', require('./components/Finance/SummaryFinanceComponent.vue').default);
Vue.component('RecentTransactionFinanceComponent', require('./components/Finance/RecentTransactionFinanceComponent.vue').default);

let CryptoJSAesJson = {
    stringify: (cipherParams) => {

        console.log(CryptoJS);
        let j = {
            ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse: (jsonStr) => {
        let j = JSON.parse(jsonStr);
        let cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(j.ct)
        });
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    }
}

window.session = (window.CryptoJS) ? JSON.parse(CryptoJS.AES.decrypt($('meta[name="session"]').attr('content'), "korsall@2017", {
    format: CryptoJSAesJson
}).toString(CryptoJS.enc.Utf8)) : '';


/**
 * This event bus property
 * This is global event bus, We can acces in any where in VueJs App
 * 
 * Fire Event Syntax - this.$eventBus.$emit('event-name', data);
 * Recived Event Syntax - this.$eventBus.$on('event-name', (eventTypeId) => {});
 */
const EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get: () => {
            return EventBus;
        }
    },
    $httpService : {

        get () {
            return new HttpService(this);
        }
    },
    $notify : {

        get () {
            return new NotificationService(this);
        }
    },
    $globals : {

        get () {
            return new Globals(this);
        }
    },
    $dataService : {

        get () {
            return new DataService(this);
        }
    }
    
});

// Add a request interceptor
axios.interceptors.request.use( (config) => {
    $('.pageLoaderWrap1').removeClass('hide');
    let authInfo = VueCookies.get('authInfo');

    // auth info
    if (_.has(authInfo, 'authInfo')) {
       config.headers.common['Authorization'] =  authInfo.token;
    }

    let token = document.head.querySelector('meta[name="csrf-token"]');

    // config.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
    
    // Do something before request is sent
    return config;

},  (error) => {
    $('.ageLoaderWrap1').addClass('hide');
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use( (response)  => {

    // console.log(response.data.data);

    if (response.data && response.data.data) {

        let requestData = response.data.data;

        // authInfo 
        if (_.has(requestData, 'authInfo')) {
            VueCookies.set('authInfo', requestData.authInfo);
        }

        // authInfo 
        if (_.has(requestData, 'authInfo') && _.isEmpty(requestData.authInfo)) {
            VueCookies.remove('authInfo');
            window.location = '/login';
        }
    }
    $('.pageLoaderWrap1').addClass('hide');
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;

},  (error) => {

   // this.$httpService.onFail(error);
   $('.pageLoaderWrap1').addClass('hide');
    return Promise.reject(error);

});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#merchant-app',
    mounted() {},
    methods : {

        /**
         * Process Logout
         * @return void
         */
        logout() {

            this.$httpService.post(this.$globals.appUrl('/logout'), (response) => {
                
                console.log(response);

                this.$cookies.remove('authInfo');

                window.location = '/login';

            });
        }
    }
});
