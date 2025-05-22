import {
  ref
} from 'vue'

export default function useModal() {
  const isOpen = ref(false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }
  watch(isOpen, (value) => {
    if (value) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  })

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}