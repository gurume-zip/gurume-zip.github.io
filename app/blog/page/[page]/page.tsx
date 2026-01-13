import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5
const categories = ['godsaeng', 'clean', 'dopamine', 'convenience', 'mood', 'fridge-raid']

export async function generateMetadata(props: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const params = await props.params
  return genPageMetadata({
    title: `레시피 목록 - ${params.page}페이지`,
    description: `맛있는 레시피 모음집의 ${params.page}번째 페이지입니다.`,
  })
}

// [핵심 수정] 경로가 [page]이므로 반드시 'page'라는 키값을 반환해야 합니다.
export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)

  // 1페이지부터 마지막 페이지까지 숫자를 문자열로 생성
  return Array.from({ length: totalPages || 1 }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function CategoryPage(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const pageNumber = parseInt(params.page)

  // 전체 포스트 준비
  const allPosts = allCoreContent(sortPosts(allBlogs))

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // 현재 페이지 번호에 맞는 포스트만 슬라이싱
  const initialDisplayPosts = allPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages === 0 ? 1 : totalPages,
  }

  // 기존 카테고리 이름을 제목으로 쓰고 싶으시면 아래 title을 수정하세요.
  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="모든 레시피"
    />
  )
}
