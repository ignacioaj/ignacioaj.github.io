const initScrollTop = () => {
  const button = document.getElementById('scroll-top-btn')

  if (!button) return

  if (button.dataset.initialized === 'true') {
    return
  }

  button.dataset.initialized = 'true'

  const SHOW_AFTER = 300

  const updateVisibility = () => {
    const visible = window.scrollY > SHOW_AFTER

    if (visible) {
      button.classList.remove(
        'opacity-0',
        'pointer-events-none',
        'translate-y-5'
      )

      button.classList.add(
        'opacity-100',
        'pointer-events-auto',
        'translate-y-0'
      )
    } else {
      button.classList.add(
        'opacity-0',
        'pointer-events-none',
        'translate-y-5'
      )

      button.classList.remove(
        'opacity-100',
        'pointer-events-auto',
        'translate-y-0'
      )
    }
  }

  updateVisibility()

  window.addEventListener(
    'scroll',
    updateVisibility,
    { passive: true }
  )

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    if (window.location.hash) {
      history.replaceState(
        null,
        '',
        window.location.pathname +
          window.location.search
      )
    }

    window.dispatchEvent(
      new CustomEvent('career-twin:close')
    )
  })
}

document.addEventListener(
  'astro:page-load',
  initScrollTop
)

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initScrollTop,
    { once: true }
  )
} else {
  initScrollTop()
}