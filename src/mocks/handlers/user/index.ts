import { http, HttpResponse } from 'msw'
import { userInformation } from './mockData'

export const userInformationHandler = [
  http.get('/api/v1/accounts/me', () => {
    return HttpResponse.json(userInformation)
  }),
]
