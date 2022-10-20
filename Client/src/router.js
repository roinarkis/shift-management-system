import {createRouter,createWebHistory} from 'vue-router';
import ShiftDetail from './pages/shifts/ShiftDetails.vue';
import ShiftList from './pages/shifts/ShiftsList.vue';
import NotFound from './pages/NotFound.vue';
import ExitOrEnterShift from './pages/ShiftRecorder.vue';
import Home from './pages/Home.vue';
import NewEmployee from './pages/NewEmployee.vue';



const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', component:Home},
        {path:'/shifts', component:ShiftList},
        {path:'/shifts/:id', component:ShiftDetail, props:true},
        {path:'/shifts/recorder', component:ExitOrEnterShift },
        {path:'/new/employee', component:NewEmployee},
        {path: '/:notFound(.*)',component:NotFound},


    ]
});

export default router;