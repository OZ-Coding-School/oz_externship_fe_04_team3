import { http, HttpResponse } from 'msw'

// Presigned URL 발급 및 업로드 모킹
export const uploadsHandlers = [
  // presigned URL 발급
  http.get('/api/v1/s3-presigned-url', ({ request }) => {
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
    // 개발 중에는 로컬호스트를 사용해 네트워크 에러를 피함
    const uploadUrl = `http://localhost:5173/${key}`
    const fileUrl = `http://localhost:5173/${key}`

    return HttpResponse.json({
      upload_url: uploadUrl,
      file_url: fileUrl,
      key,
      headers: {
        'Content-Type': contentType,
      },
    })
  }),

  http.put('http://localhost:5173/:key', async ({ params }) => {
    // 파일 업로드는 그냥 OK 반환
    return HttpResponse.json({ ok: true, key: params.key })
  }),

  // 이미지/파일 프리뷰용 GET도 OK 반환 (빈 응답)
  http.get('http://localhost:5173/:key', async () => {
    return new HttpResponse('', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }),
]
