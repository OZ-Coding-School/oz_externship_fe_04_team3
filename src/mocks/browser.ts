import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { lectureHandlers } from './handlers/lectures/lectureHandlers'

export const worker = setupWorker(...handlers, ...lectureHandlers)
