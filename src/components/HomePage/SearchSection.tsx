import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
const { Search } = Input
import axios from 'axios'
import { Button } from 'antd'

const Wrapper = styled.div`
  padding-top: 20px;

  @media (min-width: 1100px) {
    width: 35%;
    padding-top: 20px;
    margin-right: 100px;
  }
`

const InputElement = styled(Search)`
  && {
    max-width: 300px;

    @media (min-width: 1100px) {
      width: 400px;
    }
  }
`

const ResultsSection = styled.div`
  margin: 20px 0;
`

const Results = styled.div``

const CompanyItem = styled.div`
  padding: 8px 0;
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: solid 1px #efefef;
`

const Content = styled.div`
  width: 100%;
`

const CustomButton = styled(Button)`
  position: relative;
  right: 0;
  top: 50%;
  margin-left: 10px;
`

type SearchSectionProps = {
  addCompany: (companyName: string, symbol: string) => void
  companyList: { companyName: string; symbol: string }[]
}

const SearchSection: React.FC<SearchSectionProps> = ({
  addCompany,
  companyList,
}) => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{ bestMatches: [] }>({
    bestMatches: [],
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    if (value) {
      setIsLoading(true)
      axios(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=Z9G6QC01TR4WZ6C8`
      )
        .then((response) => {
          if (response.data.bestMatches) {
            setResults(response.data)
            setIsLoading(false)
          } else {
            setError(true)
          }
        })
        .catch((err) => console.log('Error:', err))
    } else {
      setResults({ bestMatches: [] })
    }
  }, [value])

  const onSearch = (value: string) => {
    setValue(value)
  }

  const resultsElements = error ? (
    <div>Something went wrong</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : results.bestMatches?.length !== 0 ? (
    <Results>
      {results.bestMatches?.map((item, key) => {
        const isDisabled = !companyList.some(
          (company) => company.symbol === item['1. symbol']
        )

        return (
          <CompanyItem key={key}>
            <Content>{` ${item['1. symbol']} - ${item['2. name']}`}</Content>

            <CustomButton
              disabled={!isDisabled}
              type="primary"
              onClick={() =>
                addCompany(item['2. name'], item['1. symbol'])
              }
            >
              +
            </CustomButton>
          </CompanyItem>
        )
      })}
    </Results>
  ) : (
    <div style={{ textAlign: 'center' }}>Nothing to show</div>
  )

  return (
    <Wrapper>
      <div>
        <div>Company Name</div>
        <InputElement placeholder="Example: Apple" onSearch={onSearch} />
      </div>

      <ResultsSection>
        <span style={{ fontSize: '20px' }}>Search Results</span>
        {resultsElements}
      </ResultsSection>
    </Wrapper>
  )
}

export default SearchSection
