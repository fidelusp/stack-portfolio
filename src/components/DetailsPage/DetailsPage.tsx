import React, { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { abbreviateNumber } from '../../utils/abbreviateNumber'
import API_KEY from '../../utils/API'

const Wrapper = styled.div`
  margin-inline: 20px;
  padding: 20px 0;

  @media (min-width: 1100px) {
    margin-inline: 50px;
  }
`
const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`
const CompanyName = styled.div`
  margin-top: 40px;
  font-size: 30px;
  font-weight: bold;
`
const Address = styled.div`
  margin-top: 10px;
  span {
    font-weight: bold;
  }
`
const Capitalization = styled.div`
  margin-top: 10px;

  span {
    font-weight: bold;
  }
`
const Description = styled.div`
  margin-top: 30px;
`

const DetailsPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>()
  const history = useHistory()

  const [companyData, setCompanyData] = useState<{
    companyName: string
    address: string
    capitalization: string
    description: string
  }>()
  const [error, setError] = useState(false)

  useEffect(() => {
    axios(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    )
      .then((response) => {
        if (response.data.Name) {
          setCompanyData({
            companyName: response.data.Name,
            address: response.data.Address,
            capitalization: abbreviateNumber(
              response.data.MarketCapitalization
            ),
            description: response.data.Description,
          })
        } else {
          setError(true)
        }
      })
      .catch((err) => console.log('Error:', err))
  }, [])

  const onBack = (e: SyntheticEvent) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <Wrapper>
      <Button onClick={onBack}>Go Back</Button>
      {error ? (
        <div style={{ marginTop: '50px' }}>Something went wrong</div>
      ) : !companyData ? (
        <div style={{ marginTop: '50px' }}>Loading...</div>
      ) : (
        <>
          <CompanyName>{companyData.companyName}</CompanyName>
          <Address>
            <span>Address: </span>
            {companyData.address}
          </Address>
          <Capitalization>
            <span>Market Capitalization: </span>
            {companyData.capitalization}
          </Capitalization>
          <Description>{companyData.description}</Description>
        </>
      )}
    </Wrapper>
  )
}

export default DetailsPage
