import Link from './Link'
import Image from './Image'
import { StarEmpty, StarFull, StarHalf } from './social-icons/icons'

interface Recipe {
  title: string
  slug: string
  time: string
  difficulty: number
  summary?: string
  thumbnail?: string
}

interface FeaturedRecipesProps {
  recipes?: Recipe[]
}

export default function FeaturedRecipes({ recipes }: FeaturedRecipesProps) {
  // 별점 렌더링 함수 (SVG 사용 버전)
  const renderStars = (difficulty: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= Math.floor(difficulty)
          const isHalf = star === Math.ceil(difficulty) && difficulty % 1 !== 0

          if (isFull) {
            return <StarFull key={star} className="h-4 w-4 text-yellow-400" />
          }
          if (isHalf) {
            return <StarHalf key={star} className="h-4 w-4 text-yellow-400" />
          }
          return <StarEmpty key={star} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
        })}
        <span className="ml-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">
          {difficulty.toFixed(1)}
        </span>
      </div>
    )
  }

  const displayRecipes = recipes && recipes.length > 0 ? recipes : []
  if (displayRecipes.length === 0) return null

  return (
    <section className="bg-white py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            추천 레시피 ✨
          </h2>
          <p className="font-medium text-gray-600 dark:text-gray-400">
            실패 없는 '갓생' 보장 인기 메뉴
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipe/${recipe.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-gray-50 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                {recipe.thumbnail ? (
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={500}
                    height={312}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-orange-50 text-5xl dark:bg-orange-900/20">
                    🍳
                  </div>
                )}
                <div className="absolute right-3 bottom-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
                  {recipe.time}
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  {recipe.title}
                </h3>

                {recipe.summary && (
                  <p className="mb-4 line-clamp-2 h-10 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {recipe.summary}
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      Difficulty
                    </span>
                    {renderStars(recipe.difficulty)}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 shadow-sm transition-all group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-900/30 dark:text-orange-400">
                    <span className="text-lg font-bold">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
