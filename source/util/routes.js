/**
 * @Author: Andree Ray <andreeray>
 * @Date:   2018-01-18T21:21:50+01:00
 * @Email:  andreeray@live.com
 * @Filename: router.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-18T21:26:42+01:00
 */
const Portal    = () => import('../components/site/portal/Portal.vue')
const Overview  = () => import('../components/features/overview/Overview.vue')
const Settings  = () => import('../components/features/settings/Settings.vue')
const Tasks     = () => import('../components/features/productivity/tasks/Tasks.vue')
const Notes     = () => import('../components/features/productivity/notes/Notes.vue')
const Posts     = () => import('../components/features/posts/Posts.vue')
const Post      = () => import('../components/features/posts/Post.vue')
const Images    = () => import('../components/features/images/Images.vue')
const Image     = () => import('../components/features/images/Image.vue')
const Weights   = () => import('../components/features/weights/Weights.vue')
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
        path: '/overview',
        component: Overview,
        name: 'overview',
        beforeEnter: authenticate
    },{
        path: '/settings',
        component: Settings,
        name: 'settings',
        beforeEnter: authenticate
    },{
        path: '/tasks',
        component: Tasks,
        name: 'tasks',
        beforeEnter: authenticate
    },{
        path: '/notes',
        component: Notes,
        name: 'notes',
        beforeEnter: authenticate
    }, {
        path: '/posts',
        component: Posts,
        name: 'posts',
        beforeEnter: authenticate
    },{
        path: '/post',
        component: Post,
        name: 'post',
        beforeEnter: authenticate
    },{
        path: '/data',
        component: Data,
        name: 'data',
        beforeEnter: authenticate
    },{
        path: '/users',
        component: Users,
        name: 'users',
        beforeEnter: authenticate
    },{
        path: '/user',
        component: User,
        name: 'user',
        beforeEnter: authenticate
    },{
        path: '/images',
        component: Images,
        name: 'images',
        beforeEnter: authenticate
    }, {
        path: '/image',
        component: Image,
        name: 'image',
        beforeEnter: authenticate
    }, {
        path: '/weights',
        component: Weights,
        beforeEnter: authenticate
    }, {
        path: '/forum/general',
        component: General,
        name: 'general',
        beforeEnter: authenticate
    }, {
        path: '/support/tickets',
        component: Tickets,
        name: 'tickets',
        beforeEnter: authenticate
    }, {
        path: '/support/ticket',
        component: Ticket,
        name: 'ticket',
        beforeEnter: authenticate
    }, {
      path: '*',
      component: Portal,
      name: 'portal'
    }
]
