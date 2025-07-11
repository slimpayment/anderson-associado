'use client'

import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false, trickleSpeed: 100 })

export function startLoading() {
  NProgress.start()
}

export function stopLoading() {
  NProgress.done()
}
