// tests/unit/HelloWorld.spec.js

import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HomePage.vue';

describe('HelloWorld.vue', () => {
  it('should return "Hello World"', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});