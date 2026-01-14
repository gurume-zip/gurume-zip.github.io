import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getAllCategories, getAllTags } from '@/utils/contentlayer' // 유틸 함수 위치 확인 필요

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // 1. 개별 레시피 포스트 주소
  const recipeRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path.replace(/^blog\//, 'recipe/')}`,
      lastModified: post.lastmod || post.date,
    }))

  // 2. 카테고리 페이지 주소 자동 생성
  // ['godsaeng', 'clean' ...] 등 모든 카테고리 추출
  const categories = Array.from(new Set(allBlogs.flatMap((p) => p.category || [])))
  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/recipe/category/${encodeURIComponent(category)}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // 3. 태그 페이지 주소 자동 생성
  // ['볶음밥', '계란' ...] 등 모든 태그 추출
  const tags = Array.from(new Set(allBlogs.flatMap((p) => p.tags || [])))
  const tagRoutes = tags.map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  // 4. 고정 페이지 (메인, 레시피 홈, 태그 홈)
  const routes = ['', 'recipe', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...recipeRoutes, ...categoryRoutes, ...tagRoutes]
}
