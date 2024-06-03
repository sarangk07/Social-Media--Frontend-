'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'


function Provider({children})  {
  return  <ThemeProvider
  attribute='class'
  defaultTheme='system'
  enableSystem
  >
    {children}
    
</ThemeProvider>

  
}

export default Provider
