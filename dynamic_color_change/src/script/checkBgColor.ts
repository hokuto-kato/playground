// Function to get the average color of an image
const getAverageColor = (imgElement: HTMLImageElement): string => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return 'rgba(0, 0, 0, 0)'

  canvas.width = imgElement.width
  canvas.height = imgElement.height
  context.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height)

  const imageData = context.getImageData(
    0,
    0,
    imgElement.width,
    imgElement.height
  )
  const data = imageData.data
  let r = 0,
    g = 0,
    b = 0

  // Sum up all the color values
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  // Calculate the average color
  r = Math.floor(r / (data.length / 4))
  g = Math.floor(g / (data.length / 4))
  b = Math.floor(b / (data.length / 4))

  return `rgb(${r}, ${g}, ${b})`
}

// Function to get the background color
const getBackgroundColor = (element: HTMLElement): string => {
  return window.getComputedStyle(element).backgroundColor
}

// Get the .icon_home element
const iconHomeElement = document.querySelector('.icon_home') as HTMLElement
const boxes = document.querySelectorAll('.box')

export const checkBackgroundColor = () => {
  if (!iconHomeElement) return

  const iconRect = iconHomeElement.getBoundingClientRect()

  boxes.forEach((box) => {
    const boxElement = box as HTMLElement
    const boxRect = boxElement.getBoundingClientRect()

    // Check if .icon_home overlaps with the box
    if (
      iconRect.top < boxRect.bottom &&
      iconRect.bottom > boxRect.top &&
      iconRect.left < boxRect.right &&
      iconRect.right > boxRect.left
    ) {
      let backgroundColor = getBackgroundColor(boxElement)
      // Check if the box contains an image
      const imgElement = boxElement.querySelector('img') as HTMLImageElement
      if (imgElement) {
        backgroundColor = getAverageColor(imgElement)
      }
      document.documentElement.style.setProperty('--bg-color', backgroundColor)
      const caption = document.querySelector('.caption') as HTMLElement
      caption.textContent = `background color is: ${backgroundColor}`
    }
  })
}
