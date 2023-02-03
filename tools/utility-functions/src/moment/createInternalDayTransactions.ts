import moment from 'moment';

export const createInternalDayTransactions = (transactions) => {
  const result = [];

  for (let i = 0; i < transactions.length; i++) {
    const currentTransaction = transactions[i];
    let currentTransactionDate = moment(currentTransaction.date);

    if (i < transactions.length - 1) {
      const nextTransaction = transactions[i + 1];
      const nextTransactionDate = moment(nextTransaction.date);

      while (currentTransactionDate < nextTransactionDate) {
        result.push({
          date: currentTransactionDate.format('YYYY-MM-DD'),
          balance: currentTransaction.balance,
        });

        currentTransactionDate = currentTransactionDate.add(1, 'days');
      }
    } else {
      result.push({
        date: currentTransactionDate.format('YYYY-MM-DD'),
        balance: currentTransaction.balance,
      });
    }
  }

  return result;
};
