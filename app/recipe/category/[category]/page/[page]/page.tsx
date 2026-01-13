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
    for (let i = 1; i <= totalPages; i++) {
      params.push({ category: encodeURI(category), page: i.toString() })
    }
  })

  return params
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string; page: string }>
}) {
  const params = await props.params
  const category = decodeURI(params.category)
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

  // 모든 포스트를 posts로 전달 (사이드바 카운트용)
  const allPosts = allCoreContent(sortPosts(allBlogs))

  // 필터링된 포스트만 표시용으로 사용
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.category === category))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

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
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={categoryName}
    />
  )
}
