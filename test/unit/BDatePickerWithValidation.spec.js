import { shallowMount } from '@vue/test-utils'
import SideBar from '@/components/inputs/BDatePickerWithValidation.vue'


describe('BDatePickerWithValidation.vue Test', () => {
  it('renders datepicker when component is created', () => {
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
    expect(wrapper.vm.$options.name).toMatch('BDatePickerWithValidation')
  })
})