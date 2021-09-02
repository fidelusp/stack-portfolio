import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchSection from './SearchSection'
import PortfolioSection from './PortfolioSection'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  @media (min-width: 1100px) {
    flex-direction: row;
    padding: 20px 50px;
    justify-content: center;
    margin: auto;
  }
`
const LineBetween = styled.div`
  height: 800px;
  width: 2px;
  background-color: #d9d9d9;
  display: none;

  @media (min-width: 1100px) {
    display: flex;
  }
`

const HomePage: React.FC = () => {
  const [companyList, setCompanyList] = useState<
    { companyName: string; symbol: string }[]
  >(JSON.parse(localStorage.getItem('listOfCompanies') as string))

  useEffect(() => {
    localStorage.setItem('listOfCompanies', JSON.stringify(companyList))
  }, [companyList])

  const removeCompany = (symbol: string) => {
    setCompanyList(companyList?.filter((value) => value.symbol !== symbol))
  }

  const addCompany = (companyName: string, symbol: string) => {
    setCompanyList((companies) => [...companies, { companyName, symbol }])
  }

  return (
    <Wrapper>
      <SearchSection companyList={companyList} addCompany={addCompany} />
      <LineBetween />
      <PortfolioSection
        companyList={companyList}
        removeCompany={removeCompany}
      />
    </Wrapper>
  )
}

export default HomePage
