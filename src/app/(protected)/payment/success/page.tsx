'use client'

const Page = () => {
  const params = useSearchParams()

  const requestData = {
    orderId: params.get('orderId') || '',
    amount: params.get('amount') || '',
    paymentKey: params.get('paymentKey') || '',
  }

  useEffect(() => {
    const confirm = async () => {
      const response = await fetch('/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      const json = await response.json()

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        // navigate(`/fail?message=${json.message}&code=${json.code}`)
        return
      }
    }
    confirm()
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <div className="box_section">
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get('amount'),
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  )
}

export default Page
