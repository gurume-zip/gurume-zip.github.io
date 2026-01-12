'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Category from '@/components/Category'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const categoriesData = [
  {
    name: '갓생 한끼',
    icon: '🚀',
    category: 'godsaeng',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600',
  },
  {
    name: '다이어트 식단',
    icon: '🧼',
    category: 'clean',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600',
  },
  {
    name: '도파민 폭발',
    icon: '😈',
    category: 'dopamine',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    textColor: 'text-red-600',
  },
  {
    name: '편의점 털기',
    icon: '🍱',
    category: 'convenience',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-600',
  },
  {
    name: '무드 메이커',
    icon: '🍷',
    category: 'mood',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    textColor: 'text-purple-600',
  },
  {
    name: '냉털 챌린지',
    icon: '📦',
    category: 'fridge-raid',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600',
  },
]

const formatToKoreanDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex items-center justify-between pt-10 pb-8">
      {!prevPage ? (
        <button className="cursor-auto text-sm font-bold disabled:opacity-30" disabled>
          이전
        </button>
      ) : (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          className="hover:text-primary-500 text-sm font-bold transition-colors"
        >
          이전
        </Link>
      )}
      <span className="text-sm font-medium text-gray-400">
        {currentPage} / {totalPages}
      </span>
      {!nextPage ? (
        <button className="cursor-auto text-sm font-bold disabled:opacity-30" disabled>
          다음
        </button>
      ) : (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          className="hover:text-primary-500 text-sm font-bold transition-colors"
        >
          다음
        </Link>
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const isTagPage = pathname.startsWith('/tags')
  const isRecipePage = pathname.startsWith('/recipe')

  const categoryFromPath =
    isRecipePage && pathname.startsWith('/recipe/category/')
      ? decodeURI(pathname.split('/recipe/category/')[1]?.split('/')[0] || '')
      : ''

  // 1. 사이드바 숫자는 전체 posts(allBlogs)를 기준으로 계산 (정상 노출됨)
  const categoryCounts: Record<string, number> = {}
  categoriesData.forEach((c) => (categoryCounts[c.category] = 0))
  posts.forEach((post) => {
    if (post.category && Object.prototype.hasOwnProperty.call(categoryCounts, post.category)) {
      categoryCounts[post.category] += 1
    }
  })

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const currentTag = isTagPage ? decodeURI(pathname.split('/tags/')[1]) : ''

  // ⭐⭐⭐ 수정된 로직 ⭐⭐⭐
  // 카테고리나 태그 페이지일 때는 initialDisplayPosts가 0개여도 posts 전체를 보여주지 않습니다.
  const isFilteredPage = pathname.includes('/category/') || pathname.includes('/tags/')
  const displayPosts = isFilteredPage
    ? initialDisplayPosts
    : initialDisplayPosts.length > 0
      ? initialDisplayPosts
      : posts

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* 상단 타이틀 구역 */}
      <div className="mb-10 border-b border-gray-100 py-12 dark:border-gray-800">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row xl:space-x-16">
        {/* 사이드바 */}
        <aside className="mb-12 w-full xl:mb-0 xl:w-64">
          <div className="space-y-10 xl:sticky xl:top-24">
            {isRecipePage && (
              <div className="space-y-4">
                <h3 className="px-2 text-xs font-black tracking-widest text-gray-400 uppercase">
                  Categories
                </h3>
                <nav className="flex flex-wrap gap-2 xl:flex-col xl:gap-1">
                  <Link
                    href="/recipe"
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${pathname === '/recipe' ? 'bg-gray-900 text-white shadow-md' : 'border text-gray-500 hover:bg-gray-100 xl:border-0 dark:hover:bg-gray-800'}`}
                  >
                    전체보기
                  </Link>
                  {categoriesData.map((cat) => (
                    <Link
                      key={cat.category}
                      href={`/recipe/category/${cat.category}`}
                      className={`flex items-center justify-between rounded-xl px-4 py-2 text-sm font-bold transition-all ${categoryFromPath === cat.category ? 'bg-primary-50 text-primary-600 ring-primary-200 shadow-sm ring-1' : 'border text-gray-500 hover:bg-gray-50 xl:border-0'}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.name}
                      </span>
                      <span className="hidden text-[10px] opacity-50 xl:inline">
                        {categoryCounts[cat.category] || 0}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
            {isTagPage && (
              <div className="space-y-4">
                <h3 className="px-2 text-xs font-black tracking-widest text-gray-400 uppercase">
                  Hot Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sortedTags.slice(0, 20).map((t) => (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${currentTag === slug(t) ? 'bg-primary-500 border-primary-500 text-white' : 'hover:border-primary-300 border-gray-100 bg-white text-gray-500'}`}
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 메인 리스트 영역 */}
        <main className="flex-1">
          {displayPosts.length > 0 ? (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, category, thumbnail, difficulty, time } =
                  post
                const recipeUrl = `/${path.replace(/^blog\//, 'recipe/')}`

                return (
                  <li key={path} className="group py-10 first:pt-0">
                    <article className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
                      <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-50 sm:h-64 sm:w-64 dark:border-gray-800 dark:bg-gray-900">
                        <Link href={recipeUrl}>
                          <Image
                            src={thumbnail || '/static/images/twitter-card.png'}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </Link>
                      </div>

                      <div className="min-w-0 flex-1 py-2">
                        <div className="flex flex-col">
                          <div className="mb-2 flex items-center gap-3">
                            <time dateTime={date} className="text-[11px] font-bold text-gray-400">
                              {formatToKoreanDate(date)}
                            </time>
                            {category && (
                              <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-black text-gray-500 uppercase dark:bg-gray-800">
                                {category}
                              </span>
                            )}
                          </div>

                          <h2 className="mb-4 text-2xl leading-tight font-black sm:text-3xl">
                            <Link
                              href={recipeUrl}
                              className="hover:text-primary-500 text-gray-900 transition-colors dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>

                          <div className="mb-5 flex items-center gap-4 text-[12px] font-bold text-gray-500">
                            {time && (
                              <span className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-2 py-1 dark:border-gray-800 dark:bg-gray-900">
                                ⏱️ {time}
                              </span>
                            )}
                            {difficulty !== undefined && (
                              <span className="flex items-center gap-1 text-yellow-500">
                                {'★'.repeat(Math.floor(difficulty))}
                                <span className="text-gray-200">
                                  {'★'.repeat(5 - Math.floor(difficulty))}
                                </span>
                              </span>
                            )}
                          </div>

                          <p className="mb-6 line-clamp-2 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {summary}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {tags?.slice(0, 5).map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-bold text-gray-400">아직 등록된 레시피가 없습니다. 🥘</p>
            </div>
          )}
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </main>
      </div>
    </div>
  )
}
