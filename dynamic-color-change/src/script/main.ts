import '../style/style.scss'
import { checkBackgroundColor } from './checkBgColor'

document.addEventListener('DOMContentLoaded', () => {
  // Monitor scroll events
  window.addEventListener('scroll', checkBackgroundColor)
  // Initial check
  checkBackgroundColor()
})
