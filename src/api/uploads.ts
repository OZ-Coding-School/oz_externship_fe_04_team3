import { axiosInstance } from './axios'

export type PresignedParams = {
  type:
    | 'USER_PROFILE_IMAGE'
    | 'STUDY_GROUP_IMAGE'
    | 'RECRUITMENT_IMAGE'
    | 'NOTE_IMAGE'
    | 'NOTE_ATTACHMENT'
    | 'RECRUITMENT_ATTACHMENT'
  content_type: string
  file_name: string
  file_ext: string
}

export type PresignedResponse = {
  upload_url: string
  file_url: string
  key: string
  headers: Record<string, string>
}

export async function getPresignedUrl(params: PresignedParams) {
  const { data } = await axiosInstance.get<PresignedResponse>(
    '/v1/s3-presigned-url',
    { params }
  )
  return data
}

export async function uploadToPresigned(
  uploadUrl: string,
  file: File,
  headers: Record<string, string>
) {
  await fetch(uploadUrl, {
    method: 'PUT',
    headers,
    body: file,
  })
}
