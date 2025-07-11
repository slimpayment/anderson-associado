// components/TopProgressBar.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default function TopProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    const timeout = setTimeout(() => {
      NProgress.done()
    }, 300) // ajuste conforme necessidade

    return () => {
      clearTimeout(timeout)
    }
  }, [pathname])

  return null
}
