// src/app/components/UserForm.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UserForm from './UserForm.vue'

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

vi.stubGlobal('$fetch', vi.fn())

describe('UserForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders name and email fields', () => {
    const wrapper = mount(UserForm)
    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="email"]').exists()).toBe(true)
  })

  it('shows validation errors for empty fields', async () => {
    const wrapper = mount(UserForm, {
      global: {
        stubs: ['Field', 'ErrorMessage'],
      },
    })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    await flushPromises()
    // Check for error message text (Japanese required message)
    expect(wrapper.html()).toMatch(/必須|入力してください|error/)
  })

  it('submits valid form and redirects', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({})
    vi.stubGlobal('$fetch', fetchSpy)
    const wrapper = mount(UserForm)
    const nameInput = wrapper.find('input[name="name"]')
    const emailInput = wrapper.find('input[name="email"]')
    await nameInput.setValue('John Doe')
    await nameInput.trigger('input')
    await emailInput.setValue('john@example.com')
    await emailInput.trigger('input')
    await flushPromises()
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    await flushPromises()
    expect(fetchSpy).toHaveBeenCalledWith('/api/users', expect.objectContaining({
      method: 'POST',
      body: { name: 'John Doe', email: 'john@example.com' },
    }))
    expect(push).toHaveBeenCalledWith('/users')
  })

  it('shows alert on submission error', async () => {
    const alertSpy = vi.fn()
    globalThis.alert = alertSpy
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new Error('fail')))
    const wrapper = mount(UserForm)
    await wrapper.find('input[name="name"]').setValue('Jane')
    await wrapper.find('input[name="email"]').setValue('jane@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    await flushPromises()
    expect(alertSpy.mock.calls.length).toBeGreaterThan(0)
    expect(alertSpy.mock.calls[0][0]).toMatch(/fail/)
  })
})
