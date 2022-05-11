import { shallowMount } from '@vue/test-utils'
import SideBar from '@/components/inputs/BTextInputWithValidation.vue'


describe('BTextInputWithValidation.vue Test', () => {
  it('renders input when component is created', () => {
    // render the component
    const wrapper = shallowMount(SideBar, {
      propsData: {
        rules: "required",
        type: "text",
        label: "Origin address:",
        name: "originText",
        value: "Norwich, UK",
        placeholder: "e.g. Norwich, UK"
      }
    })
    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('BTextInputWithValidation')
  })
})