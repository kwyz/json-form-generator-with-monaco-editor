import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CodeEditor from '../components/CodeEditor'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/editor',
            name: 'code-editor',
            component: CodeEditor

        }
    ]

})
