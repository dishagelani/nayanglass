import React, {useMemo} from 'react';
import { Table, Input, InputNumber } from 'antd';

const InvoiceTable = ({ details, updateDetail }) => {
  const columns = useMemo(() => [
    {
        title: 'Sr No.',
        dataIndex: 'srNo',
        key: 'srNo',
        width: '5%',
      },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
        width: '50%',
      render: (_, record) => (
        <Input
          value={record.description}
          onChange={(e) => updateDetail(record.key, 'description', e.target.value)}
        />
      ),
    },
    {
        title: 'HSN Code',
        dataIndex: 'hsnCode',
        key: 'hsnCode',
        width: '10%',
        render: (_, record) => (
            <Input
            value={record.hsnCode}
            onChange={(e) => updateDetail(record.key, 'hsnCode', e.target.value)}
          />
        ),
      },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
        width: '10%',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.qty}
          onChange={(value) => updateDetail(record.key, 'qty', value)}
        />
      ),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'qty',
        width: '10%',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.rate}
          onChange={(value) => updateDetail(record.key, 'rate', value)}
        />
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%',
      render: (_, record) => <div>{record.amount}</div>,
    },
    {
        title: 'Custom Amount',
        dataIndex: 'customAmount',
        key: 'customAmount',
        width: '20%',
        render: (_, record) => (
          <InputNumber
            min={0}
            value={record.customAmount}
            onChange={(value) => updateDetail( record.key, 'customAmount', value)}
          />
        ),
      },
  ],[updateDetail])
 
  
  return <Table columns={columns} dataSource={details} pagination={false} bordered />;
};

export default InvoiceTable;
