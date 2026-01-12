import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

/**
 * 2026년 Vercel 빌드 최적화:
 * 외부 json 파일 대신 allBlogs에서 직접 태그와 페이지 수를 계산합니다.
 */
export const generateStaticParams = async () => {
  const tagCounts: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1
      })
    }
  })

  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: tag, // 이미 slug화 된 태그 (generateStaticParams 내부에서 slug 처리됨)
      page: (i + 1).toString(),
    }))
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  // URL 인코딩된 태그를 다시 한글로 안전하게 변환
  const tag = decodeURIComponent(params.tag)
  const pageNumber = parseInt(params.page)

  // 제목 처리: 한글 가독성을 위해 # 접두사 사용
  const title = tag.startsWith('#') ? tag : `#${tag}`

  // 필터링 로직: 기본 페이지와 100% 동일하게 맞춰서 데이터 유실 방지
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        if (!post.tags) return false
        return post.tags.some((t) => {
          const s = slug(t)
          return (
            s === tag || t === tag || s === decodeURIComponent(tag) || t === decodeURIComponent(tag)
          )
        })
      })
    )
  )

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // 잘못된 페이지 번호 요청 시 404 처리
  if (pageNumber <= 0 || (totalPages > 0 && pageNumber > totalPages) || isNaN(pageNumber)) {
    return notFound()
  }

  // 현재 페이지에 해당하는 포스트 슬라이싱
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
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
