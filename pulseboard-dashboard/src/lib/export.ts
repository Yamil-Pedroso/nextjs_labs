import { jsPDF } from "jspdf";
import { Transaction } from "@/lib/transaction-types";
import { RevenueMetric } from "@/lib/revenue-types";
import { UsersMetric } from "@/lib/users-types";
import { ActivityMetric } from "@/lib/activity-types";

// Transactions
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

// Revenue
export function exportRevenuePDF(revenue: RevenueMetric) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Revenue Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Period: ${revenue.period}`, 14, 30);
  doc.text(
    `Total Revenue: ${revenue.currency} ${revenue.totalRevenue}`,
    14,
    40,
  );
  doc.text(`Growth Rate: ${revenue.growthRate}%`, 14, 50);
  doc.text(`Failed Payments: ${revenue.failedPayments}`, 14, 60);

  doc.save("revenue-report.pdf");
}

export function exportRevenueCSV(revenue: RevenueMetric) {
  const headers = [
    "Period",
    "Total Revenue",
    "Growth Rate",
    "Failed Payments",
    "Currency",
  ];

  const row = [
    revenue.period,
    revenue.totalRevenue,
    `${revenue.growthRate}%`,
    revenue.failedPayments,
    revenue.currency,
  ];

  const csvContent = [headers, row].map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "revenue-report.csv";
  link.click();
}

// Users
export function exportUsersPDF(users: UsersMetric) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Users Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Period: ${users.period}`, 14, 30);
  doc.text(`Total Users: ${users.totalUsers}`, 14, 40);
  doc.text(`New Users: ${users.newUsers}`, 14, 50);
  doc.text(`Active Users: ${users.activeUsers}`, 14, 60);

  doc.save("users-report.pdf");
}

export function exportUsersCSV(users: UsersMetric) {
  const headers = ["Period", "Total Users", "New Users", "Active Users"];

  const row = [
    users.period,
    users.totalUsers,
    users.newUsers,
    users.activeUsers,
  ];

  const csvContent = [headers, row].map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "users-report.csv";
  link.click();
}

// Activity
export function exportActivityPDF(activity: ActivityMetric) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Activity Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Period: ${activity.period}`, 14, 30);
  doc.text(`Sessions: ${activity.sessions}`, 14, 40);
  doc.text(`Avg Sessions/User: ${activity.avgSessionsPerUser}`, 14, 50);
  doc.text(`Active Rate: ${activity.activeRate}%`, 14, 60);

  doc.save("activity-report.pdf");
}

export function exportActivityCSV(activity: ActivityMetric) {
  const headers = ["Period", "Sessions", "Avg Sessions/User", "Active Rate"];

  const row = [
    activity.period,
    activity.sessions,
    activity.avgSessionsPerUser,
    `${activity.activeRate}%`,
  ];

  const csvContent = [headers, row].map((r) => r.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "activity-report.csv";
  link.click();
}
