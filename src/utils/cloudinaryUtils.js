export async function getBase64ImageUrl(imageId) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}w_100/e_blur:300,q_auto,f_webp/${imageId}`
  )
  const buffer = await response.arrayBuffer()
  const data = Buffer.from(buffer).toString('base64')
  return `data:image/webp;base64,${data}`
}

export function getImageUrl(imageId) {
  return `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${imageId}`
}
