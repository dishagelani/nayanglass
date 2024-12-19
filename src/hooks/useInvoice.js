import { useState, useEffect, useCallback } from 'react';
import { calculateInvoiceSummary,roundToTwoDecimal } from '../utils/invoiceUtils';

const useInvoice = (customer, initialDetails) => {
  const [invoiceDetails, setInvoiceDetails] = useState(initialDetails);
  const [invoiceSummary, setInvoiceSummary] = useState({});
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setInvoiceSummary(calculateInvoiceSummary(invoiceDetails, customer?.state,discount));
  }, [invoiceDetails, discount, customer]);

  const updateDetail = useCallback((key, field, value) => {
    setInvoiceDetails((prev) =>
      prev.map((item) => {
        if (item.key !== key) {
          return item; 
        }
  
        const updatedItem = { ...item, [field]: value };
  
        if (field === "qty") {
          updatedItem.amount = roundToTwoDecimal(
            item.customAmount ? item.customAmount / 1.18 : updatedItem.rate
          ) * value;
        } else if (field === "rate") {
          updatedItem.rate = roundToTwoDecimal(value);
          updatedItem.customAmount = null;
          updatedItem.amount = roundToTwoDecimal(value * item.qty);
        } else if (field === "customAmount") {
          updatedItem.customAmount = roundToTwoDecimal(value);
          updatedItem.rate = roundToTwoDecimal(value / 1.18);
          updatedItem.amount = roundToTwoDecimal((value / 1.18) * item.qty);
        }
  
        return updatedItem;
      })
    );
  }, [setInvoiceDetails]);

  return { invoiceDetails, invoiceSummary, discount, setDiscount, setInvoiceDetails, updateDetail };
};

export default useInvoice;
