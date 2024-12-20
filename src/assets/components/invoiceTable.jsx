import React, { useMemo } from 'react';
import { Table, Input, InputNumber, Grid, Row, Col } from 'antd';

const InvoiceTable = ({ details, updateDetail }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

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
      width: '30%',
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
      width: '1 0%',
      render: (_, record) => <div>{record.amount}</div>,
    },
    {
      title: 'Custom Rate',
      dataIndex: 'customAmount',
      key: 'customAmount',
      width: '10%',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.customAmount}
          onChange={(value) => updateDetail(record.key, 'customAmount', value)}
        />
      ),
    },
  ], [updateDetail])

  const mobileColumns = [
    {
      title: 'Sr No.',
      dataIndex: 'srNo',
      key: 'srNo',
      width: '5%',
    },
    {
      title: "Product details",
      dataIndex: "details",
      key: "details",
      render: (_, record) => (
        <div >
          <Row gutter={6} style={{ marginBottom: '6px' }}>
            <Col span={16}>
              <div>
                {/* <span>Description: </span>  */}
                <Input
                  value={record.description}
                  placeholder='Description'
                  onChange={(e) => updateDetail(record.key, "description", e.target.value)}
                />
              </div>
            </Col>
            <Col span={8}>
              <div>
                {/* <span>HSN Code: </span> */}
                <Input
                  value={record.hsnCode}
                  placeholder='HSN Code'
                  onChange={(e) => updateDetail(record.key, "hsnCode", e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={6} style={{ marginBottom: '6px' }}>
            <Col span={6}>
              <div>
                {/* <span>Qty: </span> */}
                <InputNumber
                  placeholder='Qty'
                  min={0}
                  value={record.qty}
                  onChange={(value) => updateDetail(record.key, "qty", value)}
                />
              </div>
            </Col>
            <Col span={6}>
              <div>
                {/* <span>Rate: </span> */}
                <InputNumber
                  placeholder='Rate'
                  min={0}
                  value={record.rate}
                  onChange={(value) => updateDetail(record.key, "rate", value)}
                />
              </div>
            </Col>

            <Col span={6}>
              <div>
                {/* <span>Amount: </span> */}
                <InputNumber
                  placeholder='Amount'
                  min={0}
                  value={record.amount}
                  disabled
                />
                { }
              </div>
            </Col>
            <Col span={6}>
              <div>
                {/* <span>Custom Rate: </span> */}
                <InputNumber
                  placeholder='custom rate'
                  min={0}
                  value={record.customAmount}
                  onChange={(value) => updateDetail(record.key, "customAmount", value)}
                />
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return <Table
          columns={screens.md ? columns : mobileColumns}
          dataSource={details}
          pagination={false}
          style={{ tableLayout: 'auto' }}
          bordered />;
      };

export default InvoiceTable;
