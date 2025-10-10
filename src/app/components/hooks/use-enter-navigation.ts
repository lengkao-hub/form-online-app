"use client"

import type React from "react"

import { useCallback } from "react"

export function useEnterNavigation() {
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()

      // Find all focusable input elements
      const inputs = Array.from(
        document.querySelectorAll("input:not([disabled]), textarea:not([disabled]), select:not([disabled])"),
      ) as HTMLElement[]

      const currentIndex = inputs.indexOf(event.currentTarget as HTMLElement)
      const nextIndex = (currentIndex + 1) % inputs.length

      // Focus the next input
      if (inputs[nextIndex]) {
        inputs[nextIndex].focus()
      }
    }
  }, [])

  return { handleKeyDown }
}
