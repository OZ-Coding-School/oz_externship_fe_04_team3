export interface Recruitment {
  id: number
  title: string
  author?: string
  createdAt?: string
  participants?: number
  maxParticipants: number
  thumbnail: string
  thumbnailType?: 'image' | 'emoji'
  tags: string[]
  description?: string
  views: number
  bookmarks: number
  deadline?: string
  lectureList?: string[]
}

export const CATEGORY_MAP: Record<string, string[]> = {
  '전체 카테고리': [],
  'AI/인공지능': ['AI', '딥러닝', '머신러닝', 'TensorFlow'],
  '응용 AI': ['머신러닝', 'Kaggle', 'python'],
  'IT/프로그래밍': [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'Backend',
    'Frontend',
    'API',
  ],
  '게임 개발': ['Unity', 'C#', '게임개발', '3D게임'],
  '데이터 사이언스': ['데이터분석', 'Tableau', 'Power BI'],
  IT: ['DevOps', 'Docker', 'Kubernetes'],
  하드웨어: ['IoT', '라즈베리파이', '하드웨어'],
  디자인: ['Figma', 'UI/UX', '디자인'],
}

export function filterByCategory(
  category: string,
  recruitments: Recruitment[]
) {
  if (category === '전체 카테고리') return recruitments

  const tagsToMatch = CATEGORY_MAP[category]
  if (!tagsToMatch) return []

  return recruitments.filter((recruitments) =>
    recruitments.tags.some((tag) => tagsToMatch.includes(tag))
  )
}

export const mockRecruitments: Recruitment[] = [
  {
    id: 1,
    title: 'Unity 게임 개발 프로젝트 팀원 모집',
    author: '모집 인원명',
    createdAt: '2025.11.28',
    participants: 4,
    maxParticipants: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Unity', 'C#', '게임개발', '3D게임'],
    description:
      '• Unity 게임 개발 마스터클래스 - 박유니티\n• C# 게임 프로그래밍 - 김씨샵',
    lectureList: [
      'Unity 게임 개발 마스터클래스 - 박유니티',
      'C# 게임 프로그래밍 - 김씨샵',
    ],
    views: 412,
    bookmarks: 105,
    deadline: '2025.12.28',
  },
  {
    id: 2,
    title: '블록체인 & Web3 개발자 팀원 모집',
    author: '박코딩',
    createdAt: '2025.11.27',
    participants: 2,
    maxParticipants: 4,
    thumbnail:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Blockchain', 'Web3', 'Solidity'],
    description:
      '• 블록체인 개발 프로젝트 - 디파이앱\n• Solidity, 스마트 컨트랙트 - 개발경험',
    lectureList: [
      '블록체인 개발 프로젝트 - 디파이앱',
      'Solidity, 스마트 컨트랙트 - 개발경험',
    ],
    views: 980,
    bookmarks: 32,
    deadline: '2025.12.27',
  },
  {
    id: 3,
    title: 'Spring Boot 백엔드 마스터 스터디',
    author: '이자바',
    createdAt: '2025.11.26',
    participants: 3,
    maxParticipants: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Spring', 'Java', 'Backend'],
    description:
      '• Spring Boot 중급 이상 - 심화학습\n• JPA & Hibernate 실무 - 프로젝트 병행',
    lectureList: [
      'Spring Boot 중급 이상 - 심화학습',
      'JPA & Hibernate 실무 - 프로젝트 병행',
    ],
    views: 2100,
    bookmarks: 67,
    deadline: '2025.12.26',
  },
  {
    id: 4,
    title: 'React 프론트엔드 스터디',
    author: '최리액트',
    createdAt: '2025.12.01',
    participants: 5,
    maxParticipants: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['React', 'TypeScript', '프론트엔드'],
    description: '• React 18 최신 기능 학습\n• 실전 프로젝트 진행',
    lectureList: ['React 18 최신 기능 학습', '실전 프로젝트 진행'],
    views: 1750,
    bookmarks: 55,
    deadline: '2026.01.01',
  },
  {
    id: 5,
    title: '실전 AI 프로젝트 스터디 모집',
    author: '강인공지능',
    createdAt: '2025.11.30',
    participants: 4,
    maxParticipants: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['AI', '딥러닝', 'TensorFlow'],
    description:
      '• 딥러닝 프로젝트 학습 - 심화연구\n• TensorFlow 기초 - 필수사항',
    lectureList: [
      '딥러닝 프로젝트 학습 - 심화연구',
      'TensorFlow 기초 - 필수사항',
    ],
    views: 2450,
    bookmarks: 89,
    deadline: '2025.12.30',
  },
  {
    id: 6,
    title: '알고리즘 코딩테스트 대비 스터디',
    author: '조알고리즘',
    createdAt: '2025.12.02',
    participants: 6,
    maxParticipants: 8,
    thumbnail:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['알고리즘', '코딩테스트', 'Python'],
    description: '• 알고리즘 문제 풀이 - 백준\n• 자료구조 기초 - 필수',
    lectureList: ['알고리즘 문제 풀이 - 백준', '자료구조 기초 - 필수'],
    views: 3200,
    bookmarks: 120,
    deadline: '2026.01.02',
  },
  {
    id: 7,
    title: 'UI/UX 디자인 스터디',
    author: '디자이너김',
    createdAt: '2025.11.30',
    participants: 2,
    maxParticipants: 4,
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Figma', 'UI/UX', '디자인'],
    description:
      '• Figma를 활용한 UI/UX 디자인\n• 실제 프로젝트 포트폴리오 제작',
    lectureList: [
      'Figma를 활용한 UI/UX 디자인',
      '실제 프로젝트 포트폴리오 제작',
    ],
    views: 1450,
    bookmarks: 48,
    deadline: '2026.12.30',
  },
  {
    id: 8,
    title: '데이터 분석 & 시각화 스터디',
    author: '데이터박',
    createdAt: '2025.12.03',
    participants: 5,
    maxParticipants: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Python', '데이터분석', 'Tableau'],
    description: '• Python 데이터 분석\n• Tableau, Power BI 시각화',
    lectureList: ['Python 데이터 분석', 'Tableau, Power BI 시각화'],
    views: 1890,
    bookmarks: 61,
    deadline: '2026.01.03',
  },
  {
    id: 9,
    title: '라즈베리파이 IoT 프로젝트',
    author: '하드웨어이',
    createdAt: '2025.11.29',
    participants: 3,
    maxParticipants: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['IoT', '라즈베리파이', '하드웨어'],
    description: '• 라즈베리파이 활용 IoT 프로젝트\n• 센서 연동 및 자동화',
    lectureList: ['라즈베리파이 활용 IoT 프로젝트', '센서 연동 및 자동화'],
    views: 920,
    bookmarks: 34,
    deadline: '2025.12.29',
  },
  {
    id: 10,
    title: '머신러닝 응용 프로젝트',
    author: 'ML최',
    createdAt: '2025.11.22',
    participants: 4,
    maxParticipants: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['머신러닝', 'Python', 'Kaggle'],
    description: '• 실전 머신러닝 프로젝트\n• Kaggle 대회 참여',
    lectureList: ['실전 머신러닝 프로젝트', 'Kaggle 대회 참여'],
    views: 2280,
    bookmarks: 78,
    deadline: '2025.12.22',
  },
  {
    id: 11,
    title: 'Vue.js 프론트엔드 마스터',
    author: '뷰개발자',
    createdAt: '2025.11.28',
    participants: 3,
    maxParticipants: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
    description: '• Vue 3 Composition API\n• Pinia 상태 관리',
    lectureList: ['Vue 3 Composition API', 'Pinia 상태 관리'],
    views: 1650,
    bookmarks: 52,
    deadline: '2025.12.28',
  },
  {
    id: 12,
    title: 'Docker & Kubernetes 실전',
    author: '데브옵스김',
    createdAt: '2025.12.02',
    participants: 5,
    maxParticipants: 7,
    thumbnail:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Docker', 'Kubernetes', 'DevOps'],
    description: '• 컨테이너 오케스트레이션\n• CI/CD 파이프라인 구축',
    lectureList: ['컨테이너 오케스트레이션', 'CI/CD 파이프라인 구축'],
    views: 2890,
    bookmarks: 95,
    deadline: '2026.01.02',
  },
  {
    id: 13,
    title: 'GraphQL API 개발',
    author: 'API전문가',
    createdAt: '2025.11.26',
    participants: 2,
    maxParticipants: 4,
    thumbnail:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['GraphQL', 'API', 'Backend'],
    description: '• GraphQL 스키마 설계\n• Apollo Server 구축',
    lectureList: ['GraphQL 스키마 설계', 'Apollo Server 구축'],
    views: 1420,
    bookmarks: 46,
    deadline: '2025.12.26',
  },
  {
    id: 14,
    title: 'Next.js SSR/SSG 마스터',
    author: '넥스트고수',
    createdAt: '2025.12.02',
    participants: 4,
    maxParticipants: 6,
    thumbnail:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['Next.js', 'React', 'SSR'],
    description: '• Next.js 14 App Router\n• 서버 컴포넌트 활용',
    lectureList: ['Next.js 14 App Router', '서버 컴포넌트 활용'],
    views: 3150,
    bookmarks: 108,
    deadline: '2026.01.02',
  },
  {
    id: 15,
    title: 'MongoDB & NoSQL DB',
    author: '디비마스터',
    createdAt: '2025.11.24',
    participants: 3,
    maxParticipants: 5,
    thumbnail:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=400&fit=crop',
    thumbnailType: 'image',
    tags: ['MongoDB', 'NoSQL', 'Database'],
    description: '• MongoDB 스키마 설계\n• Aggregation Pipeline',
    lectureList: ['MongoDB 스키마 설계', 'Aggregation Pipeline'],
    views: 1780,
    bookmarks: 63,
    deadline: '2025.12.24',
  },
]
