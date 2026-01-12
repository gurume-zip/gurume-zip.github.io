import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  // URL 인코딩된 태그를 다시 한글로 복구
  const tag = decodeURIComponent(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} 태그 관련 레시피`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  // Vercel 빌드 시 한글 경로 문제를 방지하기 위해 encodeURI를 제거하고
  // github-slugger의 slug 형식을 따르도록 합니다.
  return tagKeys.map((tag) => ({
    tag: slug(tag),
  }))
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  // 1. 주소창의 %EA... 값을 "혼밥" 같은 한글로 변환
  const tag = decodeURIComponent(params.tag)

  // 2. 제목 처리 (한글 태그가 깨지지 않게 처리)
  const title = tag.startsWith('#') ? tag : `#${tag}`

  // 3. 필터링 로직 강화: 슬러그화된 태그와 원본 태그를 모두 비교
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        if (!post.tags) return false
        return post.tags.some((t) => {
          const s = slug(t)
          // 슬러그 형태(예: hon-bab) 또는 원본 한글(혼밥)이 URL 태그와 일치하는지 확인
          return s === tag || t === tag || s === decodeURIComponent(tag)
        })
      })
    )
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
