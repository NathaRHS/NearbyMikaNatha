import { useSyncExternalStore } from 'react'

const legacyPathMap = {
  '/admin.html': '/admin',
  '/aboutus.html': '/about-us',
  '/conditionsgenerales..html': '/terms',
  '/faq.html': '/faq',
  '/legalnotice.html': '/legal-notice',
  '/privacypolicy.html': '/privacy-policy',
  '/productdetail.html': '/product-detail',
}

function normalizePathname(pathname) {
  const trimmed = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')
  const lowercased = trimmed.toLowerCase()

  return legacyPathMap[lowercased] ?? trimmed
}

function getPathname() {
  if (typeof window === 'undefined') {
    return '/'
  }

  return normalizePathname(window.location.pathname || '/')
}

function subscribe(callback) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  window.addEventListener('popstate', callback)

  return () => {
    window.removeEventListener('popstate', callback)
  }
}

export function navigateTo(pathname) {
  if (typeof window === 'undefined') {
    return
  }

  const targetPath = normalizePathname(pathname)

  if (targetPath === getPathname()) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return
  }

  window.history.pushState({}, '', targetPath)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

export function usePathname() {
  return useSyncExternalStore(subscribe, getPathname, () => '/')
}

export function RouterLink({ to, onClick, target, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      target === '_blank' ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    if (typeof to !== 'string' || !to.startsWith('/')) {
      return
    }

    event.preventDefault()
    navigateTo(to)
  }

  return (
    <a href={to} onClick={handleClick} target={target} {...props}>
      {children}
    </a>
  )
}
