import React from 'react'
import styled from 'styled-components'
import Table from './Table'
const Wrapper = styled.div`
  @media (min-width: 1100px) {
    width: 800px;
    display: flex;
    justify-content: center;
  }
`

type PortfolioSectionProps = {
  companyList: { companyName: string; symbol: string }[]
  removeCompany: (symbol: string) => void
}
const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  companyList,
  removeCompany,
}) => {
  return (
    <Wrapper>
      <div style={{ marginTop: '20px' }}>
        <div>Your Portfolio</div>
        <Table companyList={companyList} removeCompany={removeCompany} />
      </div>
    </Wrapper>
  )
}

export default PortfolioSection
