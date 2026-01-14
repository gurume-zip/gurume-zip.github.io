import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { StarFull, StarHalf, StarEmpty } from './social-icons/icons' // 기존에 만든 별 아이콘

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags: string[]
  difficulty: number
  time: string
  thumbnail?: string
}

export default function LatestRecipes({ posts }: { posts: Post[] }) {
  // 별점 렌더링 로직 (공통 사용)
  const renderStars = (difficulty: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= Math.floor(difficulty)
          const isHalf = star === Math.ceil(difficulty) && difficulty % 1 !== 0
          if (isFull) return <StarFull key={star} className="h-3.5 w-3.5 text-yellow-400" />
          if (isHalf) return <StarHalf key={star} className="h-3.5 w-3.5 text-yellow-400" />
          return <StarEmpty key={star} className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
        })}
      </div>
    )
  }

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            최신 레시피 🍳
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            오늘 뭐 먹을지 고민이라면? 방금 올라온 레시피를 확인하세요.
          </p>
        </div>

        {!posts.length ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xl text-gray-500 dark:text-gray-400">레시피가 아직 준비 중입니다.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => {
              const { slug, date, title, summary, tags, difficulty, time, thumbnail } = post
              return (
                <Link
                  key={slug}
                  href={`/recipe/${slug}`}
                  className="group block rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-orange-200 hover:shadow-xl sm:p-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-orange-900/30"
                >
                  <article className="flex flex-col gap-6 md:flex-row">
                    {/* 썸네일 (최신 목록에서도 작게 보여주면 훨씬 예쁩니다) */}
                    {thumbnail && (
                      <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-40">
                        <img
                          src={thumbnail}
                          alt={title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <time className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        <div className="flex items-center gap-3 rounded-full bg-gray-50 px-3 py-1 dark:bg-gray-900/50">
                          <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                            {time}
                          </span>
                          <div className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
                          {renderStars(difficulty)}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                          {title}
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tags.slice(0, 3).map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>

                      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
