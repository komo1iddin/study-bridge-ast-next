'use client'

import React, { useEffect, useRef } from 'react'

const DECAP_SCRIPT_ID = 'decap-cms-script'

function AdminPage() {
  const scriptAdded = useRef(false)

  useEffect(() => {
    let script: HTMLScriptElement | null = null

    if (!scriptAdded.current && !document.getElementById(DECAP_SCRIPT_ID)) {
      script = document.createElement('script')
      script.id = DECAP_SCRIPT_ID
      script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
      script.async = true
      document.body.appendChild(script)
      scriptAdded.current = true
    }

    // Cleanup function: Check if the script is still a child before removing
    return () => {
      const scriptElement = document.getElementById(DECAP_SCRIPT_ID)
      if (scriptElement && scriptElement.parentNode === document.body) {
        // This might still conflict, Decap might manage its root differently.
        // If errors persist, consider removing this cleanup entirely.
        // document.body.removeChild(scriptElement);
      }
      // Reset ref if component unmounts and might remount
      // scriptAdded.current = false;
    }
  }, [])

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Study Bridge Admin</title>
        {/* Tell Decap CMS where to load the config file */}
        <link href="/api/admin/config.yml" type="text/yaml" rel="cms-config-url" />
        {/* Netlify Identity Widget script is already in the root layout */}
      </head>
      <body>
        {/* The CMS will mount here */}
        <div id="nc-root"></div>
      </body>
    </>
  )
}

export default AdminPage 