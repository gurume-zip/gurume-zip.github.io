import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  // 2026 트렌드: 꽉 찬 헤더가 아닌 상단에서 살짝 떨어진 캡슐형 플로팅 디자인
  let headerClass = 'mx-auto max-w-5xl mt-4 px-6 flex items-center w-full justify-between py-4 my-4'

  // 스티키 모드일 때 투명도와 블러(Blur) 효과 추가
  if (siteMetadata.stickyNav) {
    headerClass +=
      ' sticky top-4 z-50 rounded-3xl border border-white/20 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-lg shadow-black/5'
  }

  return (
    <header className={headerClass}>
      {/* 로고 영역: 폰트 강조 */}
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="font-title text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            면시피
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-2 leading-5">
        {/* 네비게이션 링크: 캡슐형 호버 효과 */}
        <div className="no-scrollbar hidden items-center gap-x-1 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-orange-50 hover:text-orange-600 dark:text-gray-400 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
              >
                {link.title}
              </Link>
            ))}
        </div>

        {/* 액션 아이콘 그룹: 구분선 추가 */}
        <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2 dark:border-gray-800">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
