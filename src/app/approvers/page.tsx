'use client'

import Container from '../../components/Global/Container/Container'
import Content from '../../components/Global/Content/Content'

export default function Approvers() {
  return (
    <Container
      title="Approver"
      btnNavigateLink="/approver/new-approver"
      btnNavigateText="New Approver"
      showBtnNavigate
    >
      <Content>
        <div>approver</div>
      </Content>
    </Container>
  )
}
