import Vue from 'vue'
import Router from 'vue-router'
import CodeEditor from '../components/CodeEditor'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/editor',
            name: 'code-editor',
            component: CodeEditor

        }
    ]

})
