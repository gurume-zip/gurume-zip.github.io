import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

// 페이지당 게시글 수 설정
const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURIComponent(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} 태그 레시피`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

/**
 * 2026년 Vercel 빌드 최적화:
 * 외부 json 파일을 읽지 않고 Contentlayer 데이터에서 직접 태그 목록을 추출하여
 * 정적 페이지(SSG) 경로를 생성합니다.
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

  return Object.keys(tagCounts).map((tag) => ({
    tag: tag, // 이미 slug화 된 태그 목록이 반환됨
  }))
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURIComponent(params.tag)

  // 제목에 # 추가 및 가독성 유지
  const title = tag.startsWith('#') ? tag : `#${tag}`

  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        if (!post.tags) return false
        return post.tags.some((t) => {
          const s = slug(t)
          // URL 파라미터(slug)와 데이터상의 태그(원본/slug)를 모두 대조
          return (
            s === tag || t === tag || s === decodeURIComponent(tag) || t === decodeURIComponent(tag)
          )
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
