import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Grid } from 'antd';
import CustomerDetails from '../assets/components/customerDetails';
import InvoiceTable from '../assets/components/invoiceTable';
import InvoiceSummary from '../assets/components/invoiceSummary';
import PrintContent from './printContent';
import useInvoice from '../hooks/useInvoice';
import customerData from '../assets/data/customerData.json';
import "../assets/styles/invoiceForm.css"
import html2pdf from 'html2pdf.js';
import moment from 'moment';


const InvoiceForm = () => {
    const [customer, setCustomer] = useState(customerData[0]);
    const [billingDetails, setBillingDetails] = useState({});
    const [isPrinting, setIsPrinting] = useState(false);
    const printContentRef = useRef(null);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

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

    const handleDownloadPDF = () => {
        setIsPrinting(true);

        setTimeout(() => {
            const element = printContentRef.current;

            if (element) {
                const options = {
                    margin: 1,
                    filename: billingDetails?.invoiceNo ? `Invoice${billingDetails?.invoiceNo}.pdf` : `${moment().format('DDMMYYYY')}${moment().hour()}${moment().minute()}${moment().seconds()}.pdf`,
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
                };

                html2pdf().from(element).set(options).save();
            } else {
                console.error("Print content not found!");
            }

            setIsPrinting(false);
        }, 200);
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
                <div className='print-content' >
                    <PrintContent ref={printContentRef} customer={{ ...customer, ...billingDetails }} invoiceDetails={invoiceDetails} invoiceSummary={{ ...invoiceSummary, discount }} />
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
                { screens.md?
                    <Button type="primary" onClick={handlePrint} style={{
                        display: 'block',
                        margin: 'auto'
                    }}>
                        Print Invoice
                    </Button>
                    :
                    <Button type="primary" onClick={handleDownloadPDF} style={{
                        display: 'block',
                        margin: 'auto'
                    }}>
                        Download Invoice
                    </Button>
                   }
            </Form>
        </div>
    );
};

export default InvoiceForm;
