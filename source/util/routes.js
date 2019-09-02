/**
 * @Author: Andree Ray <andreeray>
 * @Date:   2018-01-18T21:21:50+01:00
 * @Email:  andreeray@live.com
 * @Filename: router.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-18T21:26:42+01:00
 */
const Portal    = () => import('../components/site/portal/Portal.vue')
const Overview  = () => import('../components/dashboards/overview/Overview.vue')
const Tasks     = () => import('../components/dashboards/productivity/tasks/Tasks.vue')
const Notes     = () => import('../components/dashboards/productivity/notes/Notes.vue')
const Posts     = () => import('../components/dashboards/posts/Posts.vue')
const Post      = () => import('../components/dashboards/posts/Post.vue')
const Images    = () => import('../components/dashboards/images/Images.vue')
const Image     = () => import('../components/dashboards/images/Image.vue')
const Weights   = () => import('../components/dashboards/weights/Weights.vue')
const Data      = () => import('../components/administration/data/Data.vue')
const Users     = () => import('../components/administration/users/Users.vue')
const User      = () => import('../components/administration/users/User.vue')
const General   = () => import('../components/forum/General.vue')
const Tickets   = () => import('../components/support/tickets/Tickets.vue')
const Ticket    = () => import('../components/support/tickets/Ticket.vue')

import store from '../store/store'

function authenticate( to, from, next ) {
    // We can se if a user is refreshing a page when there is no page he is navigating from
    if( !from.name ) {
        store.dispatch( 'setLocation', to.name )
    }

    if( store.getters.token ) {
        next()
    } else {
        next('/')
    }
}

export default [{
        path: '/admin/overview',
        component: Overview,
        name: 'overview',
        beforeEnter: authenticate
    },{
        path: '/admin/tasks',
        component: Tasks,
        name: 'tasks',
        beforeEnter: authenticate
    },{
        path: '/admin/notes',
        component: Notes,
        name: 'notes',
        beforeEnter: authenticate
    }, {
        path: '/admin/posts',
        component: Posts,
        name: 'posts',
        beforeEnter: authenticate
    },{
        path: '/admin/post',
        component: Post,
        name: 'post',
        beforeEnter: authenticate
    },{
        path: '/admin/data',
        component: Data,
        name: 'data',
        beforeEnter: authenticate
    },{
        path: '/admin/users',
        component: Users,
        name: 'users',
        beforeEnter: authenticate
    },{
        path: '/admin/user',
        component: User,
        name: 'user',
        beforeEnter: authenticate
    },{
        path: '/admin/images',
        component: Images,
        name: 'images',
        beforeEnter: authenticate
    }, {
        path: '/admin/image',
        component: Image,
        name: 'image',
        beforeEnter: authenticate
    }, {
        path: '/weights',
        component: Weights,
        beforeEnter: authenticate
    }, {
        path: '/admin/forum/general',
        component: General,
        name: 'general',
        beforeEnter: authenticate
    }, {
        path: '/admin/support/tickets',
        component: Tickets,
        name: 'tickets',
        beforeEnter: authenticate
    }, {
        path: '/admin/support/ticket',
        component: Ticket,
        name: 'ticket',
        beforeEnter: authenticate
    }, {
      path: '*',
      component: Portal,
      name: 'portal'
    }
]
