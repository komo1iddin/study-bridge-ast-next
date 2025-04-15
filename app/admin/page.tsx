'use client'

import React, { useEffect, useRef } from 'react'

const DECAP_SCRIPT_ID = 'decap-cms-script'

function AdminPage() {
  const scriptAdded = useRef(false)

  useEffect(() => {
    let script: HTMLScriptElement | null = null
    let configLink: HTMLLinkElement | null = null

    if (!scriptAdded.current && !document.getElementById(DECAP_SCRIPT_ID)) {
      script = document.createElement('script')
      script.id = DECAP_SCRIPT_ID
      script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
      script.async = true
      document.body.appendChild(script)
      scriptAdded.current = true
    }

    // Inject config link for Decap CMS
    if (!document.querySelector('link[rel="cms-config-url"]')) {
      configLink = document.createElement('link')
      configLink.rel = 'cms-config-url'
      configLink.href = '/admin/config.yml'
      configLink.type = 'text/yaml'
      document.head.appendChild(configLink)
    }

    // Cleanup function: Check if the script is still a child before removing
    return () => {
      const scriptElement = document.getElementById(DECAP_SCRIPT_ID)
      if (scriptElement && scriptElement.parentNode === document.body) {
        // This might still conflict, Decap might manage its root differently.
        // If errors persist, consider removing this cleanup entirely.
        // document.body.removeChild(scriptElement);
      }
      // Remove config link if it was added
      if (configLink && configLink.parentNode === document.head) {
        document.head.removeChild(configLink)
      }
      // Reset ref if component unmounts and might remount
      // scriptAdded.current = false;
    }
  }, [])

  return (
    <div id='nc-root' />
  )
}

export default AdminPage 