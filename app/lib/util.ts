export const cloudinaryFetch = async (image: File) => {
    const formDataImage = new FormData()
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    formDataImage.append('file', image)
    formDataImage.append('upload_preset', preset as string)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formDataImage
    })
    const result = await res.json()
    return result
}

