import Link from './Link'

interface Category {
  name: string
  icon: string
  category: string // category 필드 값
  bgColor: string
  textColor: string
}

const categories: Category[] = [
  {
    name: '시그니처 누들', // 메인 면요리 (파스타, 라멘, 국수 등)
    icon: '🍝',
    category: 'signature',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: '라이트 누들', // 두부면, 곤약면, 저칼로리 레시피 (살 안 찌는 면)
    icon: '🌿',
    category: 'light',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    name: '원팬 & 이지', // 3분 요리, 편의점, 10분 완성 초간단
    icon: '⚡',
    category: 'easy',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    textColor: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    name: '소울푸드.zip', // 기타 모든 요리 (고기, 안주, 맛의 추출물)
    icon: '🔓', // 해제 아이콘
    category: 'unzip',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
]

export default function CategoryNavigation() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            카테고리별 레시피
          </h2>
          <p className="text-gray-600 dark:text-gray-400">원하는 카테고리를 선택해보세요</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/recipe/category/${category.category}`}
              className={`${category.bgColor} ${category.textColor} rounded-xl p-6 text-center shadow-md transition-all hover:scale-105 hover:shadow-lg`}
            >
              <div className="mb-3 text-5xl">{category.icon}</div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
