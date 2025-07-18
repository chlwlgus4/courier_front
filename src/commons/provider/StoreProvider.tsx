'use client'

import { ReactNode, useEffect } from 'react'
import { getCountries } from '@/api/country'
import useCountryStore from '@/store/countryStore'

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { setCountries, isLoaded, setIsLoaded } = useCountryStore()

  useEffect(() => {
    const initialCountries = async () => {
      if (!isLoaded) {
        const { data, status } = await getCountries()
        if (status === 200 && data?.length) {
          setIsLoaded(true)
          setCountries(data)
        }
      }
    }

    initialCountries()
  }, [setCountries, isLoaded, setIsLoaded])

  return <>{children}</>
}

export default StoreProvider
