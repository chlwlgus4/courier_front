'use client'

import { FiUser } from 'react-icons/fi'
import { useUserStore } from '@/store/userStore'

const ProfileInfo = () => {
  const { user } = useUserStore()

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        <FiUser className="w-5 h-5 mr-2 text-cyan-700" />
        프로필 정보
      </h2>
      <p className="text-gray-700">
        아이디: <span className="font-medium">{user?.username}</span>
      </p>
    </div>
  )
}

export default ProfileInfo
