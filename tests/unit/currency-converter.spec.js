import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import CurrencyConverter from '../../src/components/CurrencyConverter'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(ElementUI)

const router = new VueRouter()

describe('CurrencyConverter', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      'converter/getCurrencies': () => 2,
      "converter/getCurrencyOptions": () => []
    }
    store = new Vuex.Store({
      getters
    })
  })

  const makeWrapper = (props = null) => {
   return mount(CurrencyConverter, {
       store, localVue,
       sync:false,
       propsData: {}
      })
  }

  it('CurrencyConverter is Vue instance', () => {
    let wrapper = makeWrapper();
    expect(wrapper.vm).toBeTruthy()
  })

  it('currency converter test', () => {
    let wrapper = makeWrapper();
    const btn = wrapper.find('.calculate-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toEqual("Calculate");
  })

  it('Renders "store.getters.getCurrencyOptions" in first p tag', () => {
    let wrapper = makeWrapper();
    const dropdown = wrapper.find('.el-scrollbar')
    expect(dropdown.element.innerHTML.length).toBe(500)
  })

  it('swapping on button click', () => {
    let wrapper = makeWrapper();
    wrapper.setData({
      converter: {
        valueToChange: 1,
        valueToGet: 2
      },
      buffer: {},
    });
   
    wrapper.vm.calculate = jest.fn();
    const btn = wrapper.find('.swap-button')
    btn.trigger('click');
    expect(wrapper.vm.$data.converter.valueToChange).toBe(2)
  })
})