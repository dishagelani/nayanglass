    import React, { useState, useEffect } from 'react';
    import { Form, Button } from 'antd';
    import CustomerDetails from '../assets/components/customerDetails';
    import InvoiceTable from '../assets/components/invoiceTable';
    import InvoiceSummary from '../assets/components/invoiceSummary';
    import PrintContent from './printContent';
    import useInvoice from '../hooks/useInvoice';
    import customerData from '../assets/data/customerData.json';
    import "../assets/styles/invoiceForm.css"

    const InvoiceForm = () => {
        const [customer, setCustomer] = useState(customerData[0]);
        const [billingDetails, setBillingDetails] = useState({});
        const [isPrinting, setIsPrinting] = useState(false);
    
        const { invoiceDetails, invoiceSummary, discount, setDiscount, updateDetail } = useInvoice(
            customer,
            Array(5)
                .fill(null)
                .map((_, index) => ({
                    key: index,
                    srNo: index + 1,
                    description: '',
                    hsnCode: '',
                    qty: '',
                    rate: '',
                    amount: '',
                    customAmount: null,
                }))
        );
    
        const handlePrint = () => {
            console.log(billingDetails, customer, invoiceDetails, invoiceSummary, discount);
            setIsPrinting(true);
    
            setTimeout(() => {
                window.print();
                setIsPrinting(false);
            }, 100);
        };
    
        useEffect(() => {
            const handleKeyPress = (event) => {
                if (event.ctrlKey && event.key === 'p') {
                    event.preventDefault();
                    handlePrint();
                }
            };
    
            window.addEventListener('keydown', handleKeyPress);
    
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }, []);
    
        return (
            <div className='form-container'>
                {isPrinting && (
                    <div className='print-content'>
                        <PrintContent customer={{ ...customer, ...billingDetails }} invoiceDetails={invoiceDetails} invoiceSummary={{ ...invoiceSummary, discount }} />
                    </div>
                )}
                <Form layout="vertical" onFinish={() => handlePrint()} style={{
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #ddd',
                    padding: '20px',
                    position: 'relative'
                }}>
                    <CustomerDetails
                        customer={customer}
                        setCustomer={setCustomer}
                        customerData={customerData}
                        setBillingDetails={setBillingDetails}
                    />
                    <InvoiceTable details={invoiceDetails} updateDetail={updateDetail} />
                    <InvoiceSummary invoiceSummary={invoiceSummary} setDiscount={setDiscount} />
                    <Button type="primary" onClick={handlePrint} style={{
                        display: 'block',
                        margin: 'auto'
                    }}>
                        Print Invoice
                    </Button>
                </Form>
            </div>
        );
    };
    
    export default InvoiceForm;
