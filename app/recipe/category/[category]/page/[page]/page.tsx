import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const categories = ['godsaeng', 'clean', 'dopamine', 'convenience', 'mood', 'fridge-raid']
  const params: Array<{ category: string; page: string }> = []

  categories.forEach((category) => {
    const filteredPosts = allBlogs.filter((post) => post.category === category)
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

    // 핵심 수정: 글이 없어도 최소 1페이지는 생성하도록 보장 (빌드 에러 방지)
    const pagesToGenerate = totalPages > 0 ? totalPages : 1

    for (let i = 1; i <= pagesToGenerate; i++) {
      params.push({
        category: category, // encodeURI 없이 직접 전달 (Next.js가 자동 처리)
        page: i.toString(),
      })
    }
  })

  return params
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string; page: string }>
}) {
  const params = await props.params
  // Next.js 15+ 에서는 params가 이미 디코딩되어 들어오는 경우가 많으므로 안전하게 처리
  const category = params.category
  const pageNumber = parseInt(params.page)

  const categoryNames: Record<string, string> = {
    godsaeng: '갓생 한끼',
    clean: '클린 식단',
    dopamine: '도파민 폭발',
    convenience: '편의점 털기',
    mood: '무드 메이커',
    'fridge-raid': '냉털 챌린지',
  }
  const categoryName = categoryNames[category] || category

  const allPosts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category === category))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // 글이 하나도 없는 카테고리의 1페이지는 404가 아닌 '글 없음'으로 보여주는 것이 빌드에 안전합니다.
  if (pageNumber < 1 || (totalPages > 0 && pageNumber > totalPages) || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages === 0 ? 1 : totalPages,
  }

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={categoryName}
    />
  )
}
