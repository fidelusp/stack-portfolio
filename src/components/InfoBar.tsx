import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  height: 50px;
  border-bottom: solid 1px gray;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  font-weight: bold;
`

const InfoBar: React.FC = () => {
  return (
    <Bar>
      <span>SDH Frontend Homework</span>
    </Bar>
  )
}

export default InfoBar
