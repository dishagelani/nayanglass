import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Form, Select, Input, Row, Col, DatePicker, InputNumber, Grid } from 'antd';
import moment from 'moment';

const CustomerDetails = ({ customer, setCustomer, customerData, billingDetails, setBillingDetails }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  
  const [customData, setCustomData] = useState(false)
    const customerOptions = useMemo(() =>
        customerData.map(({ name }) => ({ value: name, label: name })), [customerData]);

    useEffect(() => {
        if (customer) {
            setBillingDetails(prevDetails => ({
                ...prevDetails,
                placeOfSupply: customer.address,
                stateOfSupply: customer.state,
                stateCodeOfSupply: customer.stateCode,
            }));
        }
    }, [customer])

    const handleDropdownVisibleChange = useCallback((open) => {
        console.log(screens,"Screen")
        if(screens.xs){
            if (open) {
                document.body.classList.add('scroll-lock');
              } else {
                document.body.classList.remove('scroll-lock');
              }
        }
      }, [screens]);

    return (
        <Row gutter={[12, 12]}>
            <Col xs={{ span: 24, order: 1 }} sm={12} md={8} lg={{ span: 6, order: 0 }} className='textfield-col'>
                <Form.Item label="Name" style={{ marginBottom: 0 }}>
                    {customData ?
                        <>
                            <Input placeholder="Enter name" onChange={(e) => setCustomer(prevDetails => ({ ...prevDetails, name: e.target.value }))} />
                        </>
                        :
                        <>
                            <Select
                                onChange={(value) => setCustomer.find(cust => cust.name == value)}
                                defaultValue={customer?.name}
                                options={customerOptions}
                                onDropdownVisibleChange={handleDropdownVisibleChange}
                            />
                        </>
                    }
                </Form.Item>
                <div style={{ fontWeight: 'bold', fontSize: '12px', textAlign: 'right', cursor: 'pointer' }} onClick={() => { setCustomData(!customData); setCustomer({});  setBillingDetails(prevDetails => ({ ...prevDetails, placeOfSupply: null, stateOfSupply: null , stateCodeOfSupply:null}))}
                }>{customData ? 'View customer list' : 'Set manually'}</div>

                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item label="GST No.">
                            <Input
                                placeholder="Enter GST number"
                                value={customer?.gstNo || ''}
                                onChange={(e) => setCustomer(prevDetails => ({ ...prevDetails, gstNo: e.target.value }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="PAN No.">
                            <Input placeholder="Enter PAN number" onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, panNo: e.target.value }))} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col xs={{ span: 24, order: 2 }} sm={12} md={8} lg={{ span: 6, order: 1 }} className="textarea-col">
                <Form.Item label="Address">
                    <Input.TextArea
                        placeholder="Enter address"
                        value={customer?.address || ''}
                        onChange={(e) => setCustomer(prevDetails => ({ ...prevDetails, address: e.target.value }))}
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="State">
                            <Input
                                placeholder="Enter state"
                                value={customer?.state || ''}
                                onChange={(e) => setCustomer(prevDetails => ({ ...prevDetails, state: e.target.value }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="State Code">
                            <InputNumber
                                placeholder="Enter state code"
                                value={customer?.stateCode || ''}
                                onChange={(value) => setCustomer(prevDetails => ({ ...prevDetails, stateCode: value }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col xs={{ span: 24, order: 3 }} sm={12} md={8} lg={{ span: 8, order: 2 }} className="textarea-col">
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item label="Place of Supply">
                            <Input.TextArea placeholder="Enter place of supply" value={billingDetails?.placeOfSupply || customer?.address || ''} onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, placeOfSupply: e.target.value }))} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Vehicle Number">
                            <Input placeholder="Enter vehicle number" onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, vehicleNo: e.target.value }))} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <Form.Item label="State">
                            <Input
                                placeholder="Enter state"
                                value={billingDetails?.stateOfSupply || customer?.state || ''}
                                onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, stateOfSupply: e.target.value }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="State Code">
                            <InputNumber
                                placeholder="Enter state code"
                                value={billingDetails?.stateCodeOfSupply || customer?.stateCode || ''}
                                onChange={(value) => setBillingDetails(prevDetails => ({ ...prevDetails, stateCodeOfSupply: value }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col xs={{ span: 24, order: 0 }} sm={12} md={8} lg={{ span: 4, order: 3 }} className='textfield-col'>
                <Row gutter={[8, 0]}>
                    <Col xs={12} lg={24}>
                        <Form.Item label="Invoice No.">
                            <InputNumber placeholder="Enter invoice number" onChange={(value) => {
                                setBillingDetails(prevDetails => ({
                                    ...prevDetails,
                                    invoiceNo: value,
                                }))
                            }} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} lg={24}>
                        <Form.Item label="Invoice Date">
                            <DatePicker defaultValue={moment()} onChange={(value) => setBillingDetails(prevDetails => ({ ...prevDetails, invoiceDate: value }))} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CustomerDetails;
