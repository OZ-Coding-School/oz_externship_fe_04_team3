const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'build', 'test', 'refactor', 'hotfix'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'], // 제목 필수
    'subject-case': [0],
    'body-empty': [2, 'never'], // 본문 필수 (최소 한 줄)
    'body-min-length': [2, 'always', 5], // 본문 최소 길이
  },
}

export default config
