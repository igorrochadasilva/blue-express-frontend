import { useEffect, useState } from 'react'
import { TRequestBody } from '../../../../types/global/types'

interface IRequestsChart {
  requests: TRequestBody[]
}

export type requestsList = {
  type: string
  status: string
  requester: string
  id_request: string
}[]

export type barData = {
  text: string
  color: string
  barSize: number
  qtd: number
}

const RequestsChart = ({ requests }: IRequestsChart) => {
  const [barsData, setBarsData] = useState<any>()

  useEffect(() => {
    const statusWaitingApprovalAmount = requests.filter((request) => request.status === 'waiting for approval').length

    const statusApprovedAmount = requests.filter((request) => request.status === 'approved').length

    const statusDisapprovedAmount = requests.filter((request) => request.status === 'disapproved').length

    const statusWaitingInformationAmount = requests.filter(
      (request) => request.status === 'waiting for information'
    ).length

    const statusSketchAmount = requests.filter((request) => request.status === 'sketch').length

    const statusAmounts = [
      statusWaitingApprovalAmount,
      statusApprovedAmount,
      statusDisapprovedAmount,
      statusWaitingInformationAmount,
      statusSketchAmount,
    ]

    const biggerAmount = Math.max(...statusAmounts)

    const data = [
      {
        text: 'waiting approval',
        color: '#F3AF25',
        barSize: (statusWaitingApprovalAmount * 240) / biggerAmount,
        qtd: statusWaitingApprovalAmount,
      },
      {
        text: 'waiting information',
        color: '#F3AF25',
        barSize: (statusWaitingInformationAmount * 240) / biggerAmount,
        qtd: statusWaitingInformationAmount,
      },
      {
        text: 'approved',
        color: '#00D134',
        barSize: (statusApprovedAmount * 240) / biggerAmount,
        qtd: statusApprovedAmount,
      },
      {
        text: 'disapproved',
        color: '#EB1400',
        barSize: (statusDisapprovedAmount * 240) / biggerAmount,
        qtd: statusDisapprovedAmount,
      },
      {
        text: 'sketch',
        color: '#98A4AE',
        barSize: (statusSketchAmount * 240) / biggerAmount,
        qtd: statusSketchAmount,
      },
    ]

    setBarsData(data)
  }, [])

  return (
    <div className="flex flex-col ">
      <div className="mb-8">
        <span className="text-sm font-medium">Total status of requests</span>
      </div>
      <div className="flex flex-row align-self justify-around h-[288px]  text-center">
        {barsData ? (
          barsData?.map((bar: barData, i: number) => (
            <div className="flex flex-col items-center w-[148px] self-end" key={i}>
              <span className="text-sm h-6">{bar.qtd}</span>
              <div className="rounded w-[132px]" style={{ height: bar.barSize, background: bar.color }}></div>
              <span className="text-sm h-6 mt-1">{bar.text}</span>
            </div>
          ))
        ) : (
          <span className="flex items-center">loading bars...</span>
        )}
      </div>
    </div>
  )
}
export default RequestsChart
