import React from 'react';
import { Row, Col, InputNumber } from 'antd';

function InvoiceSummary({ setDiscount, invoiceSummary }) {
  return (
    <Row justify="end" gutter={[8,8]} style={{ margin: '10px 0' }} className="billing-data">
      <Col xs={16} sm={16} md={12} lg={8}>
        <Row gutter={[8, 8]}>
          <Col xs={16} style={{ textAlign: 'right' }}>Total Before Tax:</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>{invoiceSummary?.totalBeforeTax}</Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={16} style={{ textAlign: 'right' }}>CGST (9%):</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>{invoiceSummary?.cgst}</Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={16} style={{ textAlign: 'right' }}>SGST (9%):</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>{invoiceSummary?.sgst}</Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={16} style={{ textAlign: 'right' }}>IGST (18%):</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>{invoiceSummary?.igst}</Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={16} style={{ textAlign: 'right' }}>Discount:</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>
            <InputNumber
              placeholder="Discount"
              style={{ textAlign: 'center' }}
              onChange={(value) => setDiscount(parseFloat(value) || 0)}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]} style={{ fontWeight: 'bold' }}>
          <Col xs={16} style={{ textAlign: 'right' }}>Grand Total:</Col>
          <Col xs={8} style={{ textAlign: 'center' }}>{Math.round(invoiceSummary?.totalWithGst)}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default InvoiceSummary;
