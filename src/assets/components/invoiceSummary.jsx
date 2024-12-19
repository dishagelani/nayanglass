import React, { useEffect } from 'react'
import { Row, Col, Input } from 'antd'

function InvoiceSummary({setDiscount, invoiceSummary}) {
  return (
    <Row justify="end" style={{margin : '10px 0'}} className='billing-data'>
            <Col span={8}>
              <Row>
                <Col span={12} style={{textAlign : 'right'}}>Total Before Tax :</Col>
                <Col span={12} style={{textAlign : 'left'}}>{invoiceSummary?.totalBeforeTax}</Col>
              </Row>
              <Row>
                <Col span={12} style={{textAlign : 'right'}}>CGST (9%) :</Col>
                <Col span={12} style={{textAlign : 'left'}}>{invoiceSummary?.cgst}</Col>
              </Row>
              <Row>
                <Col span={12} style={{textAlign : 'right'}}>SGST (9%) :</Col>
                <Col span={12} style={{textAlign : 'left'}}>{invoiceSummary?.sgst}</Col>
              </Row>

              <Row>
                <Col span={12} style={{textAlign : 'right'}}>IGST (18%) :</Col>
                <Col span={12} style={{textAlign : 'left'}}>{invoiceSummary?.igst}</Col>
              </Row>
              <Row>
                <Col span={12} style={{textAlign : 'right'}}>Discount :</Col>
                <Col span={12} style={{textAlign : 'right'}}>
                    <Input
                      placeholder="Enter value"
                      type='Number'
                      style={{textAlign : 'center'}}
                      onChange={(e) => 
                        setDiscount(parseFloat(e.target.value) || 0)}
                    />
                 </Col>
              </Row>
              <Row style={{ fontWeight: 'bold' }}>
                <Col span={12} style={{textAlign : 'right'}}>Grand Total:</Col>
                <Col span={12} style={{textAlign : 'left'}}>{invoiceSummary?.totalWithGst}</Col>
              </Row>
            </Col>
          </Row>
  )
}

export default InvoiceSummary