import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // siteUrl 끝에 슬래시가 있다면 제거하여 중복 슬래시(//) 방지
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, '')

  // 1. 개별 레시피 포스트 주소
  const recipeRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => {
      // post.path가 /로 시작할 경우를 대비해 시작 슬래시 제거 후 경로 교체
      const path = post.path.replace(/^\//, '').replace(/^blog\//, 'recipe/')
      return {
        url: `${siteUrl}/${path}`,
        lastModified: post.lastmod || post.date,
      }
    })

  // 2. 카테고리 페이지 주소 (allBlogs에서 직접 추출)
  const categories = Array.from(new Set(allBlogs.flatMap((p) => p.category || [])))
  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/recipe/category/${encodeURIComponent(category)}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // 3. 태그 페이지 주소 (allBlogs에서 직접 추출)
  const tags = Array.from(new Set(allBlogs.flatMap((p) => p.tags || [])))
  const tagRoutes = tags.map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // 4. 고정 페이지 (메인, 레시피 홈, 태그 홈)
  const routes = ['', 'recipe', 'tags'].map((route) => ({
    // route가 빈 문자열일 때 끝에 슬래시가 남지 않도록 처리
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...recipeRoutes, ...categoryRoutes, ...tagRoutes]
}
