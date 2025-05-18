'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FiClock,
  FiCreditCard,
  FiGift,
  FiHeart,
  FiList,
  FiPackage,
  FiSettings,
  FiStar,
} from 'react-icons/fi'
import OrderHistory from '@/app/mypage/components/OrderHistory'
import ProfileInfo from '@/app/mypage/components/ProfileInfo'
import Settings from '@/app/mypage/components/Settings'
import useRequireAuth from '@/hook/useRequireAuth'
import { useAuthStore } from '@/store/authStore'

const Page = () => {
  const router = useRouter()
  const { clearAuth } = useAuthStore()

  const { user } = useRequireAuth()
  if (!user) return null

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
    clearAuth()
    router.replace('/login')
  }

  const menuItems = [
    { icon: <FiStar />, label: '리뷰 관리', href: '/mypage/reviews' },
    { icon: <FiGift />, label: '선물함', href: '/mypage/gifts' },
    { icon: <FiCreditCard />, label: '결제수단', href: '/mypage/payments' },
    { icon: <FiSettings />, label: '설정', onClick: handleLogout },
  ]

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">마이페이지</h1>
      <ProfileInfo />
      <OrderHistory />
      <Settings />
      <div className="bg-white rounded-xl shadow p-4">
        <ul className="grid grid-cols-4 text-center gap-4">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex flex-col items-center space-y-1"
              >
                <div className="text-indigo-600">{link.icon}</div>
                <span className="text-xs text-gray-700">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow divide-y">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
            onClick={item.onClick}
          >
            {item.icon}
            {item.href ? (
              <Link href={item.href} className="flex-1 ml-3 text-gray-700">
                {item.label}
              </Link>
            ) : (
              <span className="flex-1 ml-3 text-gray-700">{item.label}</span>
            )}
            <span className="text-gray-400">&gt;</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <Link
          href="/faq"
          className="inline-block text-blue-600 hover:underline font-medium"
        >
          ❓ 자주 묻는 질문(FAQ) 보러가기
        </Link>
      </div>
    </div>
  )
}

export default Page
