'use client'

import Container from '../../../../components/Global/Container/Container'
import GenerateRequest from '../../../../components/Pages/GenerateRequest'

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
      <GenerateRequest.Root>
        <GenerateRequest.Button
          text="Maintenance Contract"
          link={'/contract-requests/generate-request/maintenance-contract'}
        />
        <GenerateRequest.Button
          text="Maintenance Contract"
          link={'/contract-requests/generate-request/software-service-contract'}
        />
        <GenerateRequest.Button
          text="Maintenance Contract"
          link={'/contract-requests/generate-request/distributor-representatives-contract'}
        />
      </GenerateRequest.Root>
    </Container>
  )
}
