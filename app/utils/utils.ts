import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to detect mobile devices by screen width or user agent
export function isMobileDevice(): boolean {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return false
  }

  // Method 1: Check screen width (most reliable for responsive design)
  const isMobileByWidth = window.innerWidth <= 768 // Standard breakpoint for mobile

  // Method 2: Check user agent (less reliable but good as a secondary check)
  const isMobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )

  // Return true if either method indicates a mobile device
  return isMobileByWidth || isMobileByAgent
}
