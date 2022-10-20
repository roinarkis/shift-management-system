import {createStore} from 'vuex';
import shiftsModule from './modules/shifts/index.js';
const store = createStore({
    modules:{
        shifts: shiftsModule
    }

});
export default store;