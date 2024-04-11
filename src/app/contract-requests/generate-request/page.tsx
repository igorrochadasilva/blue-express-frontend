'use client'

import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Container from '../../../components/Global/Container/Container'
import Link from 'next/link'

export default function GenerateContracts(): JSX.Element {
  return (
    <Container
      title="Contract Requests"
      showBtnNavigate
      btnNavigateLink="/generate-request"
      btnNavigateText="Generate Contracts"
      btnBgColor="bg-white"
      btnTextColor="text-be_first_color"
      btnBorderColor="border-be_first_color"
      btnBgHover="bg-slate-300"
    >
      <div className="mx-10  my-4 p-4  rounded flex justify-between items-center">
        <Link
          href={'/contract-requests/generate-request/maintenance-contract'}
          className="bg-white p-5 flex rounded shadow-sm font-medium"
        >
          Maintenance Contract <ChevronRightIcon className="w-6 ml-3 text-be_first_color" />
        </Link>
        <Link
          href={'/contract-requests/generate-request/software-service-contract'}
          className="bg-white p-5 flex rounded shadow-sm font-medium"
        >
          Software Service Contract <ChevronRightIcon className="w-6 ml-3 text-be_first_color" />
        </Link>
        <Link
          href={'/contract-requests/generate-request/distributor-representatives-contract'}
          className="bg-white p-5 flex rounded shadow-sm font-medium"
        >
          Representative/Distributor Contract <ChevronRightIcon className="w-6 ml-3 text-be_first_color" />
        </Link>
      </div>
    </Container>
  )
}
