import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import refuse from './views/nav1/refuse.vue'
import deadline from './views/nav1/deadline.vue'
import Repayment from './views/nav1/Repayment.vue'
import userList from './views/nav2/userList.vue'
import whiteList from './views/nav2/whiteList.vue'
import blackList from './views/nav2/blackList.vue'
import work from './views/nav4/work.vue'
import paidOff from './views/nav1/paidOff.vue'
import checkPass from './views/nav2/checkPass.vue'
import financed from './views/nav3/financed.vue'
import statisticsTimes from './views/nav3/statisticsTimes.vue'
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '客服系统',
        iconCls: 'fa fa-address-book-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/work', component: work, name: '客服系统' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '贷后管理',
        iconCls: 'fa fa-cc-mastercard',//图标样式class
        children: [
            { path: '/main', component:Main, name: '待审核'},
            { path: '/refuse', component:refuse, name: '已拒绝' },
            { path: '/deadline', component: deadline, name: '已逾期' },
            { path: '/Repayment', component: Repayment, name: '还款中' },
            { path: '/paidOff', component: paidOff, name: '已还清' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'fa fa-graduation-cap',
        children: [
            { path: '/userList', component: userList, name: '用户列表' },
            { path: 'checkPass', component: checkPass, name: '修改密码' },
            { path: '/whiteList', component: whiteList, name: '白名单' },
            { path: 'blackList', component: blackList, name: '黑名单' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-money',
        children: [
            { path: '/financed', component: financed, name: '资金转账' },
            { path: '/statisticsTimes', component: statisticsTimes, name: '下载统计' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/Main'},
    }
];
export default routes;