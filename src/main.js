import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI';
import directives from '@/directives'
import router from '@/router/router';
import store from '@/store'

const app = createApp(App);

//Глобальная регистрация компонентов, для того чтобы не импортить их каждый раз ?? Похоже не работает
components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

//!!!Это должно быть в самом конце, иначе будут проблемы с компонентами!!!
app
    .use(router)
    .use(store)
    .mount('#app')