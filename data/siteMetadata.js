/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '고메.zip | gourmetzip',
  author: '고메.zip',
  headerTitle: '고메.zip',
  description:
    '고메집(gourmetzip)에 오신 것을 환영합니다! 미슐랭급 맛을 압축한 비밀 레시피 파일 📂 아는 맛의 하이엔드화, 도파민 폭발 레시피를 고메.zip에서 확인하세요.',
  language: 'ko-kr',
  theme: 'system', // system, dark or light
  siteUrl: 'https://gourmetzip.github.io/', // 나중에 실제 도메인으로 변경하세요
  siteRepo: 'https://gourmetzip.github.io/',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'cyd9911@gmail.com',
  // github: 'https://github.com', // 깃허브 주소
  // x: 'https://twitter.com/x',
  youtube: 'https://www.youtube.com/channel/UCVgAAVNMJk3Z4mHR6iEsYfw',
  // linkedin: 'https://www.linkedin.com',
  // threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com/gourmetzip',
  // medium: 'https://medium.com',
  // bluesky: 'https://bsky.app/',
  tiktok: 'https://www.tiktok.com/@gourmetzip',
  locale: 'ko-KR',
  stickyNav: true, // 트렌디한 사이트는 헤더가 고정된 경우가 많아 true 추천
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      lang: 'ko', // 댓글창 언어도 한국어로 변경
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
