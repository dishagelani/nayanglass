import React, {forwardRef} from 'react'
import { Row, Col, Table } from 'antd';
import "../assets/styles/printContent.css"
import moment from 'moment';

const PrintContent =  forwardRef(({ customer, invoiceDetails, invoiceSummary }, ref) => {
    const columns = [
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
            render: (value) => {
                return <p style={{ textAlign: 'left', margin: 0 }}>{value}</p>
            }
        },
        {
            title: 'HSN Code',
            dataIndex: 'hsnCode',
            key: 'hsnCode',
            width: '10%',
        },
        {
            title: 'Qty.',
            dataIndex: 'qty',
            key: 'qty',
            width: '10%',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            width: '10%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '30%',

        },

    ];

    return (
        <div className="print-section" ref={ref}>
            <div className='page-header'>
                <div className='first-row'>
                    <div>Tax invoice</div>
                    <div>GSTIN NO : 24ALRPK6022G1Z5</div>
                </div>
                <div className='title-row'>
                    <h1>Nayan Glass</h1>
                    <div className='subtitle-row'>All Type Of Glass</div>
                </div>
                <div>37, Udhyog Nagar, Navagam, Kamrej</div>
                <div>Mo. : 9825918737</div>
            </div>
            <div className='customer-details'>
                <div className='title-row'>Details of receiver (Billed to)</div>
                <div className='customer-data'>
                    <Row>
                        <Col span={4} > Name :
                        </Col>
                        <Col span={8}> {customer?.name}
                        </Col>
                        <Col span={4}> Invoice No:
                        </Col>
                        <Col span={8}> {customer?.invoiceNo}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}> Address :
                        </Col>
                        <Col span={8}> {customer?.address}
                        </Col>
                        <Col span={4}> Invoice Date:
                        </Col>
                        <Col span={8}>  {moment(customer?.invoiceDate).format('DD/MM/YYYY')}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}> GST No :
                        </Col>
                        <Col span={8}> {customer?.gstNo}
                        </Col>
                        <Col span={4}> Vehicle No:
                        </Col>
                        <Col span={8}> {customer?.vehicleNo}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}> PAN No :
                        </Col>
                        <Col span={8}> {customer?.panNo}
                        </Col>
                        <Col span={4}> Place of supply:
                        </Col>
                        <Col span={8}> {customer?.placeOfSupply}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}> State :
                        </Col>
                        <Col span={5}> {customer?.state}
                        </Col>
                        <Col span={3}> State code:
                        </Col>
                        <Col span={2}> {customer?.stateCode}
                        </Col>


                        <Col span={2}> State :
                        </Col>
                        <Col span={5}> {customer?.stateOfSupply}
                        </Col>
                        <Col span={3}> State code:
                        </Col>
                        <Col span={2}> {customer?.stateCodeOfSupply}
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='invoice-table'>
                <Table
                    columns={columns}
                    dataSource={invoiceDetails?.filter(details => details.amount>0)}
                    pagination={false}
                    bordered
                />
            </div>
            <div className='invoice-summary'>
                <Row justify={'space-between'}>
                    <Col span={12} style={{ alignSelf: "center" }}>
                        NOTE: YOU HAVE TO PAY BILL IN 30 DAYS
                    </Col>
                    <Col span={12} style={{ borderLeft: '1px solid' }}>
                        <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid' }}>Total before Tax :</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{invoiceSummary?.totalBeforeTax}</Col>
                        </Row>
                        {invoiceSummary?.cgst > 0 && 
                        <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid' }}>CGST 9% :</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{invoiceSummary?.cgst}</Col>
                        </Row>
                        }
                        {invoiceSummary?.sgst > 0 && 
                        <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid' }}>SGST 9% :</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{invoiceSummary?.sgst}</Col>
                        </Row>
                        }
                        {invoiceSummary?.igst > 0 && 
                        <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid' }}>IGST 18% :</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{invoiceSummary?.igst}</Col>
                        </Row>
                        }
                        {invoiceSummary?.discount > 0 && <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid' }}>Discount :</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{invoiceSummary?.discount}</Col>
                        </Row>}

                        <Row className='invoice-row'>
                            <Col span={12} style={{ textAlign: 'right', borderRight: '1px solid', fontSize: '16px !important' }}>Tax Amount : GST</Col>
                            <Col span={12} style={{ textAlign: 'center' }}>{Math.round(invoiceSummary?.totalWithGst)}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='additional-info'>
                <Row>
                    <Col span={8}>
                        <Row className='bank-details'>
                            <div style={{ fontWeight: '800' }}>Bank Details</div>
                            <div>KOTAK MAHIDRA BANK</div>
                            <div>A/C No. : 9825918737</div>
                            <div>IFSC Code : KKBK0002860</div>
                        </Row>
                        <Row className='terms-conditions'>
                            <div style={{ fontWeight: '800' }}>Terms And Condition  </div>
                            <div>Subject to surat jurisdiction	</div>
                            <div>E. & O.E.</div>
                        </Row>
                    </Col>
                    <Col span={6} className='seal'>
                        <div>
                            (common seal)
                        </div></Col>
                    <Col span={10} style={{position : 'relative'}}>
                        <Row className='declaration'>
                            <div>GST payable on Rreverse charge</div>
                            <div>Certified that the particulars given are true and correct</div>
                        </Row>
                        <Row className='stamp' >
                         
                                For Nayan Glass
                         
                        </Row>
                    </Col>
                </Row>

            </div>
        </div >

);
});

export default PrintContent