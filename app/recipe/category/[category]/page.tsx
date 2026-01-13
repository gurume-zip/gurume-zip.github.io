import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const params = await props.params
  const category = decodeURI(params.category)
  const categoryNames: Record<string, string> = {
    godsaeng: '갓생 한끼',
    clean: '클린 식단',
    dopamine: '도파민 폭발',
    convenience: '편의점 털기',
    mood: '무드 메이커',
    'fridge-raid': '냉털 챌린지',
  }
  const categoryName = categoryNames[category] || category
  return genPageMetadata({
    title: categoryName,
    description: `${categoryName} 레시피 모음`,
  })
}

export const generateStaticParams = async () => {
  const categories = ['godsaeng', 'clean', 'dopamine', 'convenience', 'mood', 'fridge-raid']
  return categories.map((category) => ({
    category: encodeURI(category),
  }))
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params
  const category = decodeURI(params.category)
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
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
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
