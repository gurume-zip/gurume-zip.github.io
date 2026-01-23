'use client'

import Link from './Link'

interface HeroSectionProps {
  channelName?: string
  heroImage?: string
  heroVideo?: string
}

export default function HeroSection({
  channelName = '면시피 MyeonCipe',
  heroImage,
  heroVideo,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#fafafa] py-20 md:min-h-[70vh] dark:bg-gray-950">
      {/* 1. 백그라운드 효과: 은은한 그라데이션 메시 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-orange-200/30 blur-[100px] dark:bg-orange-900/10" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-yellow-200/30 blur-[100px] dark:bg-yellow-900/10" />
      </div>

      {/* 2. 배경 비디오/이미지: 오버레이와 함께 배치 */}
      {heroVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-10"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        heroImage && (
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-20 dark:opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )
      )}

      {/* 3. 메인 콘텐츠 */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        {/* 배지 디자인: 컨셉 반영 */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-1.5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          <span className="text-xs font-black tracking-tight text-gray-600 sm:text-sm dark:text-gray-400">
            UNZIPPING NEW RECIPE.zip
          </span>
        </div>

        {/* 메인 타이틀: 면시피 브랜딩 반영 */}
        <div className="mb-10 text-center">
          <h1 className="mb-6 text-5xl leading-[1.1] font-[900] tracking-tighter text-gray-900 sm:text-7xl md:text-8xl dark:text-white">
            미식을{' '}
            <span className="block text-orange-600 italic drop-shadow-sm dark:text-orange-500">
              압축하다
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-tight font-bold text-gray-500 sm:text-2xl dark:text-gray-400">
            가장 직관적인 1분 요리 문법 <br className="hidden sm:block" />
            <span className="border-b-4 border-orange-200 text-gray-900 dark:border-orange-900/50 dark:text-gray-200">
              {channelName} 아카이브 해제 중.
            </span>
          </p>
        </div>

        {/* 버튼 그룹: 텍스트 및 링크 수정 */}
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/blog"
            className="group relative flex items-center justify-center overflow-hidden rounded-3xl bg-gray-900 px-10 py-5 text-lg font-black text-white shadow-2xl transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-gray-900"
          >
            <span className="relative z-10 flex items-center gap-2">
              레시피 압축해제 <span className="text-xl">🍝</span>
            </span>
            <div className="absolute inset-0 translate-y-[101%] bg-orange-600 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          <Link
            href="https://youtube.com/@myeoncipe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-3xl border-2 border-gray-100 bg-white px-10 py-5 text-lg font-black text-gray-900 shadow-sm transition-all hover:border-gray-200 hover:bg-gray-50 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            YouTube 구독
          </Link>
        </div>

        {/* 4. 플로팅 이모지 장식: 면 요리 컨셉으로 변경 */}
        <div className="absolute top-1/2 left-10 hidden -translate-y-1/2 -rotate-12 animate-bounce transition-all duration-1000 lg:block">
          <span className="text-7xl drop-shadow-xl">🍝</span>
        </div>
        <div className="absolute top-[40%] right-10 hidden translate-y-1/2 rotate-12 animate-bounce [animation-delay:0.5s] lg:block">
          <span className="text-8xl drop-shadow-xl">🍜</span>
        </div>
      </div>

      {/* 하단 스크롤 유도 아이콘 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
