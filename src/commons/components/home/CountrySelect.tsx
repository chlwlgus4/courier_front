const CountrySelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full border border-gray-300 rounded-xl px-5 py-3 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">국가를 선택하세요</option>
    <option value="미국">미국</option>
    <option value="일본">일본</option>
    <option value="독일">독일</option>
  </select>
)

export default CountrySelect
