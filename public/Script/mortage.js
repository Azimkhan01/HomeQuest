function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12; // Convert years to months
    const startDate = new Date(document.getElementById('startDate').value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || !startDate) {
        alert('Please enter valid numbers in all fields.');
        return;
    }

    const monthlyPaymentUSD = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / 
        (Math.pow(1 + interestRate, loanTerm) - 1);
    
    const totalPaymentUSD = monthlyPaymentUSD * loanTerm;
    const totalInterestUSD = totalPaymentUSD - loanAmount;

    // Conversion rate from USD to INR (Rupees)
    const exchangeRate = 82; // Adjust this rate as needed
    const monthlyPaymentINR = monthlyPaymentUSD * exchangeRate;
    const totalPaymentINR = totalPaymentUSD * exchangeRate;
    const totalInterestINR = totalInterestUSD * exchangeRate;

    // Format the current date in MM/DD/YYYY format
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Calculate payment dates for each month and total invested & pending
    let totalInvestedINR = 0;
    let totalPendingINR = totalPaymentINR;
    const paymentSchedule = [];

    for (let i = 0; i < loanTerm; i++) {
        totalInvestedINR += monthlyPaymentINR;
        totalPendingINR -= monthlyPaymentINR;

        const paymentDate = new Date(startDate);
        paymentDate.setMonth(startDate.getMonth() + i);

        paymentSchedule.push({
            date: paymentDate.toLocaleDateString(),
            amount: monthlyPaymentINR.toFixed(2),
            totalInvested: totalInvestedINR.toFixed(2),
            totalPending: totalPendingINR.toFixed(2)
        });
    }

    // Update UI with calculated mortgage details
    document.getElementById('reportDate').textContent = `Report Date: ${formattedDate}`;
    document.getElementById('monthlyPayment').textContent = `Monthly Payment: ₹${monthlyPaymentINR.toFixed(2)}`;
    document.getElementById('totalPayment').textContent = `Total Payment: ₹${totalPaymentINR.toFixed(2)}`;
    document.getElementById('totalInterest').textContent = `Total Interest: ₹${totalInterestINR.toFixed(2)}`;
    document.getElementById('totalMonths').textContent = `Total Months: ${loanTerm}`;
    document.getElementById('paymentPerPeriod').textContent = `Amount Paid Per Period (Month): ₹${monthlyPaymentINR.toFixed(2)}`;

    // Display payment schedule in a table format
    const paymentList = document.getElementById('paymentSchedule');
    paymentList.innerHTML = '';  // Clear previous table data

    // Create table headers
    const headerRow = document.createElement('tr');
    const headers = ['Payment Date', 'Amount Paid (₹)', 'Total Invested (₹)', 'Total Pending (₹)'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    paymentList.appendChild(headerRow);

    // Add data rows to the table
    paymentSchedule.forEach((payment) => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = payment.date;
        const amountCell = document.createElement('td');
        amountCell.textContent = payment.amount;
        const investedCell = document.createElement('td');
        investedCell.textContent = payment.totalInvested;
        const pendingCell = document.createElement('td');
        pendingCell.textContent = payment.totalPending;

        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(investedCell);
        row.appendChild(pendingCell);
        paymentList.appendChild(row);
    });

    // Show the report
    document.getElementById('report').style.display = 'flex';
    document.getElementById('report').style.flexDirection = 'column';
    document.getElementById('report').style.gap = '10px';
}

// Function to print the report
function printReport() {
    try {
        const printContent = document.getElementById('report').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    } catch (error) {
        alert('Printing is not supported or failed in this browser. Please try again or use a different browser.');
    }
}
