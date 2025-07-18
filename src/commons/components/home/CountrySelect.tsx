import useCountryStore from '@/store/countryStore'

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  const { countries } = useCountryStore()
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">국가를 선택하세요</option>
      {countries?.map((country) => (
        <option key={country.id} value={country.id}>
          {country.nameKo}
        </option>
      ))}
    </select>
  )
}

export default CountrySelect
