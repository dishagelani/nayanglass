export const roundToTwoDecimal = (value) => Math.round(value * 100) / 100;

export const calculateInvoiceSummary = (details, customerState, discount = 0) => {

  const subtotal = details.reduce((sum, item) => sum + (item.amount || 0), 0);
  const isGujarat = customerState === 'Gujarat';
  const cgst = isGujarat ? subtotal * 0.09 : 0;
  const sgst = isGujarat ? subtotal * 0.09 : 0;
  const igst = isGujarat ? 0 : subtotal * 0.18;

  return {
    totalBeforeTax: roundToTwoDecimal(subtotal),
    cgst: roundToTwoDecimal(cgst),
    sgst: roundToTwoDecimal(sgst),
    igst: roundToTwoDecimal(igst),
    totalWithGst: roundToTwoDecimal(subtotal * 1.18) - discount,
  };
};
