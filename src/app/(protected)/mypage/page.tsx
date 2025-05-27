'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import {
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiGift,
  FiHeart,
  FiList,
  FiPackage,
  FiSettings,
  FiStar,
  FiUser,
} from 'react-icons/fi'
import { logout } from '@/api/auth'
import { getUser } from '@/api/user'
import { useUserStore } from '@/store/userStore'

const Page = () => {
  const router = useRouter()
  const { user, setUser } = useUserStore()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getUser()
        if (data?.user) setUser(data.user)
        else router.replace('/login')
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  if (!user) {
    return null
  }

  const quickLinks = [
    {
      icon: <FiList className="text-2xl" />,
      label: '주문목록',
      href: '/mypage/orders',
    },
    {
      icon: <FiHeart className="text-2xl" />,
      label: '찜한상품',
      href: '/mypage/wishlist',
    },
    {
      icon: <FiClock className="text-2xl" />,
      label: '최근본상품',
      href: '/mypage/recent',
    },
    {
      icon: <FiPackage className="text-2xl" />,
      label: '자주산상품',
      href: '/mypage/frequent',
    },
  ]

  const handleLogout = () => {
    logout().then(() => router.push('/'))
  }

  const menuItems = [
    { icon: <FiStar />, label: '리뷰 관리', href: '/mypage/reviews' },
    { icon: <FiGift />, label: '선물함', href: '/mypage/gifts' },
    { icon: <FiCreditCard />, label: '결제수단', href: '/mypage/payments' },
    {
      icon: <FaRegQuestionCircle />,
      label: '고객센터',
      href: '/support',
    },
    { icon: <FiSettings />, label: '설정', onClick: handleLogout },
  ]

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <FiUser className="text-3xl text-gray-400" />
        </div>
        <div>
          <p className="text-lg font-semibold">{user.name} 님</p>
          <Link href="/mypage/settings" className="text-sm text-gray-500">
            프로필 관리 &gt;
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <span className="font-medium">
          총 <span className="text-indigo-600 font-bold">151,580원</span>{' '}
          절약했어요!
        </span>
        <Link href="/promo" className="text-indigo-600 font-medium">
          자세히 보기 &gt;
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow grid grid-cols-2">
        <div className="p-4 text-center relative">
          <p className="text-sm text-gray-500">쿠폰 캐시</p>
          <p className="text-lg font-semibold">0원</p>
          <div
            className="
            absolute
            top-1/2 -translate-y-1/2
            right-0
            h-11/12
            w-px
            bg-gray-200"
          />
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">머니</p>
          <p className="text-lg font-semibold">0원</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <ul className="grid grid-cols-4 text-center gap-4">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex flex-col items-center space-y-1"
              >
                <div className="text-stone-600">{link.icon}</div>
                <span className="text-xs text-gray-700">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow">
        <ul>
          {menuItems?.map((item) => (
            <li
              key={item.label}
              className="
                relative
                py-4
                last:before:hidden
                before:content-['']
                before:absolute
                before:left-1/2
                before:-translate-x-1/2
                before:bottom-0
                before:w-11/12
                before:h-[1px]
                before:bg-gray-200
              "
            >
              {item.href ? (
                <Link href={item.href} className="flex items-center px-4">
                  {item.icon}
                  <span className="flex-1 ml-3 text-gray-700">
                    {item.label}
                  </span>
                  <FiChevronRight className="text-gray-400" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center w-full px-4 text-left"
                >
                  {item.icon}
                  <span className="flex-1 ml-3 text-gray-700">
                    {item.label}
                  </span>
                  <FiChevronRight className="text-gray-400" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-4 border-t border-gray-300 text-center text-sm">
        <button
          className="inline-block text-white hover:underline font-normal"
          onClick={() => handleLogout()}
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default Page
