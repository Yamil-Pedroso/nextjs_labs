import { jsPDF } from "jspdf";
import { Transaction } from "@/lib/transaction-types";

export function exportTransactionsCSV(transactions: Transaction[]) {
  const headers = ["User", "Email", "Amount", "Currency", "Status", "Date"];

  const rows = transactions.map((tx) => [
    tx.user,
    tx.email,
    tx.amount,
    tx.currency,
    tx.status,
    tx.date,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "transactions-report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportTransactionsPDF(transactions: Transaction[]) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Transactions Report", 14, 20);

  doc.setFontSize(10);

  let y = 30;

  transactions.forEach((tx) => {
    doc.text(
      `${tx.user} | ${tx.email} | ${tx.currency} ${tx.amount} | ${tx.status} | ${tx.date}`,
      14,
      y,
    );
    y += 8;

    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("transactions-report.pdf");
}
