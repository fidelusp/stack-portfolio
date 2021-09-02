import React from 'react'
import { Table } from 'antd'

import { Link } from 'react-router-dom'

type TableProps = {
  companyList: { companyName: string; symbol: string }[]
  removeCompany: (symbol: string) => void
}
const TableComponent: React.FC<TableProps> = ({
  companyList,
  removeCompany,
}) => {
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (
        text: string,
        record: { companyName: string; symbol: string }
      ) => (
        <Link to={`/details/${record.symbol.toLowerCase()}`}>{text}</Link>
      ),
      width: 350,
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => removeCompany(action)}
        >
          Delete
        </span>
      ),
    },
  ]
  const data = companyList.map((item, index) => {
    return {
      key: index + 1,
      ...item,
      action: item.symbol,
    }
  })

  return <Table pagination={false} columns={columns} dataSource={data} />
}

export default React.memo(TableComponent)
