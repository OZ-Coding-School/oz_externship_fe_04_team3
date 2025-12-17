import mockLecture from '@/mocks/data/lectureList.json'
import { http, HttpResponse } from 'msw'

//북마크 강의 임시 배열
let bookmarkedLectureIds: number[] = [203, 569]

export const bookmarkHandlers = [
  /* ---북마크 조회 ---- */
  http.get('/api/v1/lecture-bookmarks', () => {
    const bookmarkLectures = mockLecture.results.filter((lecture) =>
      bookmarkedLectureIds.includes(lecture.id)
    )

    return HttpResponse.json({
      next: null,
      previous: null,
      results: bookmarkLectures,
    })
  }),
  /* ---북마크 추가(동적으로 id값 받아옴) ---- */
  http.post('/api/v1/lecture-bookmarks', async ({ request }) => {
    const body = (await request.json()) as { lecture_id: number }
    const lecture_id = body.lecture_id

    // 1순위: 인증 확인
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return HttpResponse.json(
        { error_detail: '자격 인증 데이터가 제공되지 않았습니다.' },
        { status: 401 }
      )
    }
    // 2순위: 필수 필드 검증
    if (!body.lecture_id) {
      return HttpResponse.json(
        {
          error_detail: {
            lecture_id: ['이 필드는 필수 항목입니다.'],
          },
        },
        { status: 400 }
      )
    }

    // 4순위: 비즈니스 로직 (중복 체크)
    if (bookmarkedLectureIds.includes(lecture_id)) {
      return HttpResponse.json(
        { error_detail: '이미 북마크된 강의입니다.' },
        { status: 400 }
      )
    }

    // 3순위: 리소스 존재 확인
    const lecture = mockLecture.results.find((i) => i.id === lecture_id)
    if (!lecture) {
      return HttpResponse.json(
        { error_detail: '북마크하려는 강의를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    //북마크한 id배열에 추가하기
    bookmarkedLectureIds.push(lecture_id)
    return HttpResponse.json(
      { detail: '북마크 추가에 성공하였습니다.' },
      { status: 201 }
    )
  }),

  /* ---북마크 삭제 ---- */

  http.delete('/api/v1/lecture-bookmarks/:lecture_id', async ({ params }) => {
    const lecture_id = Number(params.lecture_id)

    //북마크 존재 확인
    if (!bookmarkedLectureIds.includes(lecture_id)) {
      return HttpResponse.json(
        { error_detail: '북마크 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    //북마크 삭제
    bookmarkedLectureIds = bookmarkedLectureIds.filter(
      (id) => id !== lecture_id
    )
    return HttpResponse.json(
      { detail: '북마크를 취소하였습니다.' },
      { status: 200 }
    )
  }),
]
