import React, {useMemo} from 'react';
import { Form, Select, Input, Row, Col, DatePicker } from 'antd';
import moment from 'moment';

const CustomerDetails = ({ customer, setCustomer, customerData, setBillingDetails }) => {
    const customerOptions = useMemo(() =>
        customerData.map(({ name }) => ({ value: name, label: name })), [customerData]);

    return (
        <Row gutter={12}>
            <Col span={6}>
                <Form.Item label="Name">
                    <Select
                        onChange={(value) => setCustomer(customerData.find(cust => cust.name == value))}
                        defaultValue={customer?.name}
                        options={customerOptions}
                    />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="GST No.">
                            <Input
                                placeholder="Enter GST number"
                                value={customer?.gstNo}
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
            <Col span={6} className="textarea-col">
                <Form.Item label="Address">
                    <Input.TextArea
                        placeholder="Enter address"
                        value={customer?.address}
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="State">
                            <Input
                                placeholder="Enter state"
                                value={customer?.state}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="State Code">
                            <Input
                                placeholder="Enter state code"
                                value={customer?.stateCode}
                                type='Number'
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={8} className="textarea-col">
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Place of Supply">
                            <Input.TextArea placeholder="Enter place of supply" onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, placeOfSupply: e.target.value }))} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item label="Vehicle Number">
                            <Input placeholder="Enter vehicle number" onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, vehicleNo: e.target.value }))} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="State">
                            <Input
                                placeholder="Enter state"
                                onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, stateOfSupply: e.target.value }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="State Code">
                            <Input
                                placeholder="Enter state code"
                                type='Number'
                                onChange={(e) => setBillingDetails(prevDetails => ({ ...prevDetails, stateCodeOfSupply: e.target.value }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={4} className='textfield-col'>
                <Form.Item label="Invoice No.">
                    <Input placeholder="Enter invoice number" type='Number' onChange={(e) => {
                        console.log(e.target.value); setBillingDetails(prevDetails => ({
                            ...prevDetails,
                            invoiceNo: e.target.value,
                        }))
                    }} />
                </Form.Item>
                <Form.Item label="Invoice Date">
                    <DatePicker defaultValue={moment()} onChange={(value) => setBillingDetails(prevDetails => ({ ...prevDetails, invoiceDate: value }))} />
                </Form.Item>

            </Col>
        </Row>
    )
}


export default CustomerDetails;
