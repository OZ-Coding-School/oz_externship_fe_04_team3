import { http, HttpResponse } from 'msw'

// Presigned URL 발급 및 업로드 모킹
export const uploadsHandlers = [
  http.get('/v1/s3-presigned-url', ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const contentType = url.searchParams.get('content_type')
    const fileName = url.searchParams.get('file_name')
    const fileExt = url.searchParams.get('file_ext')

    if (!type || !contentType || !fileName || !fileExt) {
      return HttpResponse.json(
        { message: 'missing query params' },
        { status: 400 }
      )
    }

    const key = `mock/${type.toLowerCase()}/${fileName}.${fileExt}`
    const uploadUrl = `https://mock-s3-upload.local/${key}`
    const fileUrl = `https://mock-cdn.local/${key}`

    return HttpResponse.json({
      upload_url: uploadUrl,
      file_url: fileUrl,
      key,
      headers: {
        'Content-Type': contentType,
      },
    })
  }),

  http.put('https://mock-s3-upload.local/:key', async () => {
    return HttpResponse.json({ ok: true })
  }),
]
