import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()
import App from '../../src/App.vue'

const wrapper = shallowMount(App, {
  localVue,
  router
})

describe('App', () => {
  it('app component general test', () => {
    expect(typeof App.name).toBe('string')
    expect(App.name).toEqual("App")

    const div = wrapper.find('div') 
    expect(div.exists()).toBe(true)

    const byId = wrapper.find('#app')
    expect(byId.element.id).toBe('app')
  })
})