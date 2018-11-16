/**
 * @Author: Andree Ray <andreeray>
 * @Date:   2018-01-18T21:21:50+01:00
 * @Email:  andreeray@live.com
 * @Filename: router.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-18T21:26:42+01:00
 */
const Portal = () => import('../components/site/portal/Portal.vue')
const Overview = () => import('../components/admin/dashboards/overview/Overview.vue')
const Tasks = () => import('../components/admin/dashboards/tasks/Tasks.vue')
const Notes = () => import('../components/admin/dashboards/notes/Notes.vue')
const Posts = () => import('../components/admin/dashboards/blog/Posts.vue')
const Post = () => import('../components/admin/dashboards/blog/Post.vue')
const Images = () => import('../components/admin/dashboards/images/Images.vue')
const Image = () => import('../components/admin/dashboards/images/Image.vue')
const Data = () => import('../components/admin/administration/data/Data.vue')
const Users = () => import('../components/admin/administration/users/Users.vue')
const User = () => import('../components/admin/administration/users/User.vue')

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
    },{
        path: '/admin/image',
        component: Image,
        name: 'image',
        beforeEnter: authenticate
    }, {
      path: '*',
      component: Portal,
      name: 'portal'
    }
]
