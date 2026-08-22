const CHAT_ID = 'career-twin-chat'
const BUTTON_ID = 'career-twin-btn'
const FORM_ID = 'career-twin-chat-form'
const INPUT_ID = 'career-twin-chat-input'
const MESSAGES_ID = 'career-twin-messages'
const CLOSE_ID = 'career-twin-chat-close'
const NEW_CHAT_ID = 'career-twin-new-chat'
const ADVERT_ID = 'career-twin-link'

const WELCOME_MESSAGE =
  "Hi! Curious about Ignacio? I am keen on his career path. Ask me anything!😁"

const BILERPLATE =
  "Sorry! Ignacio is currently working on this feature🛠️. You will have to wait!"

const OPEN_CLASSES = [
  'opacity-100',
  'pointer-events-auto',
  'translate-x-0',
  'scale-100'
]

const CLOSED_CLASSES = [
  'opacity-0',
  'pointer-events-none',
  'translate-x-3',
  'scale-95'
]

const initCareerTwin = () => {
  const chat = document.getElementById(CHAT_ID)
  const button = document.getElementById(BUTTON_ID)
  const closeBtn = document.getElementById(CLOSE_ID)
  const newChatBtn = document.getElementById(NEW_CHAT_ID)
  const form = document.getElementById(FORM_ID)
  const input = document.getElementById(INPUT_ID)
  const messages = document.getElementById(MESSAGES_ID)
  const advert = document.getElementById(ADVERT_ID)

  if (
    !chat ||
    !form ||
    !input ||
    !messages
  ) {
    return
  }

  if (chat.dataset.initialized === 'true') {
    return
  }

  chat.dataset.initialized = 'true'

  const createAssistantMessage = (text: string) => {
    const wrapper = document.createElement('div')

    wrapper.className =
      'career-twin-initial-message mb-3 flex'

    const bubble = document.createElement('div')

    bubble.className =
      'max-w-[85%] rounded-2xl rounded-tl-sm ' +
      'bg-teal-100/10 px-3 py-2 ' +
      'text-sm text-teal-50/85'

    bubble.textContent = text

    wrapper.appendChild(bubble)

    return wrapper
  }

  const createUserMessage = (text: string) => {
    const wrapper = document.createElement('div')

    wrapper.className =
      'mb-3 flex justify-end'

    const bubble = document.createElement('div')

    bubble.className =
      'max-w-[85%] rounded-2xl rounded-tr-sm ' +
      'bg-teal-300/10 px-3 py-2 ' +
      'text-sm text-teal-50'

    bubble.textContent = text

    wrapper.appendChild(bubble)

    return wrapper
  }

  const resetConversation = () => {
    messages.replaceChildren(
      createAssistantMessage(WELCOME_MESSAGE)
    )

    input.value = ''
    messages.scrollTop = 0
  }

  const setOpen = (open: boolean) => {
    if (open) {
      chat.classList.remove(...CLOSED_CLASSES)
      chat.classList.add(...OPEN_CLASSES)

      chat.setAttribute('aria-hidden', 'false')
      button?.setAttribute('aria-expanded', 'true')

      return
    }

    chat.classList.remove(...OPEN_CLASSES)
    chat.classList.add(...CLOSED_CLASSES)

    chat.setAttribute('aria-hidden', 'true')
    button?.setAttribute('aria-expanded', 'false')
  }

  const open = () => {
    setOpen(true)
  }

  const close = () => {
    resetConversation()
    setOpen(false)
  }

  const toggle = () => {
    const isOpen =
      chat.getAttribute('aria-hidden') === 'false'

    if (isOpen) {
      close()
    } else {
      open()
    }
  }

  /*
   * IA² button
   */
  button?.addEventListener('click', toggle)

  /*
   * Advert
   */
  advert?.addEventListener('click', open)

  /*
   * Close button inside chat
   */
  closeBtn?.addEventListener('click', close)

  /*
   * New conversation
   */
  newChatBtn?.addEventListener('click', () => {
    resetConversation()
    input.focus()
  })

  /*
   * Send message
   */
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const text = input.value.trim()

    if (!text) return

    messages.appendChild(
      createUserMessage(text)
    )

    input.value = ''

    messages.appendChild(
      createAssistantMessage(BILERPLATE)
    )

    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: 'smooth'
    })
  })

  /*
   * External API
   */
  window.addEventListener(
    'career-twin:open',
    open
  )

  window.addEventListener(
    'career-twin:close',
    close
  )

  window.addEventListener(
    'career-twin:toggle',
    toggle
  )

  /*
   * Initial state
   */
  resetConversation()
  setOpen(false)
}

document.addEventListener(
  'astro:page-load',
  initCareerTwin
)

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initCareerTwin,
    { once: true }
  )
} else {
  initCareerTwin()
}