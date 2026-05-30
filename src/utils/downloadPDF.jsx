// src/utils/downloadPDF.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadContributionPDF = (contribution, issue) => {
  const doc = new jsPDF();

  // ── Colors ──
  const green  = [15, 82, 56];   // #0f5238
  const light  = [248, 250, 246]; // #f8faf6
  const gray   = [100, 100, 100];
  const dark   = [25, 28, 26];

  // ── Header Banner ──
  doc.setFillColor(...green);
  doc.rect(0, 0, 210, 35, "F");

  // Logo / Site Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("CivicCare", 14, 15);

  // Subtitle
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Community Cleanliness & Issue Reporting Portal", 14, 23);

  // Receipt label
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("CONTRIBUTION RECEIPT", 14, 31);

  // ── Receipt Info ──
  doc.setTextColor(...dark);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Date top right
  doc.setTextColor(...gray);
  doc.text(
    `Date: ${new Date(contribution.date).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    })}`,
    150, 45
  );

  // Receipt ID
  doc.text(`Receipt ID: #${contribution._id?.slice(-8).toUpperCase()}`, 150, 52);

  // ── Contributor Info ──
  doc.setTextColor(...green);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Contributor Information", 14, 50);

  doc.setDrawColor(...green);
  doc.setLineWidth(0.5);
  doc.line(14, 53, 130, 53);

  const contributorData = [
    ["Name",    contribution.name],
    ["Email",   contribution.email],
    ["Phone",   contribution.phone],
    ["Address", contribution.address],
  ];

  doc.setTextColor(...dark);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  let y = 60;
  contributorData.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gray);
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...dark);
    doc.text(value || "—", 55, y);
    y += 8;
  });

  // ── Issue Info ──
  doc.setTextColor(...green);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Issue Information", 14, y + 8);

  doc.setDrawColor(...green);
  doc.line(14, y + 11, 130, y + 11);

  y += 18;

  const issueData = [
    ["Issue Title",  issue?.title    || contribution.issueId],
    ["Category",     issue?.category || "—"],
    ["Location",     issue?.location || "—"],
    ["Issue Status", issue?.status   || "—"],
  ];

  issueData.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gray);
    doc.text(`${label}:`, 14, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...dark);
    doc.text(value, 60, y);
    y += 8;
  });

  // ── Payment Summary Table ──
  doc.setTextColor(...green);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Summary", 14, y + 8);

  doc.setDrawColor(...green);
  doc.line(14, y + 11, 196, y + 11);

  autoTable(doc, {
    startY: y + 15,
    head: [["Description", "Amount"]],
    body: [
      ["Clean-Up Contribution", `$${contribution.amount}`],
      ["Platform Fee", "$0.00"],
      ["Total Paid", `$${contribution.amount}`],
    ],
    headStyles: {
      fillColor: green,
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
    },
    bodyStyles: {
      textColor: dark,
      fontSize: 10,
    },
    alternateRowStyles: {
      fillColor: light,
    },
    columnStyles: {
      0: { cellWidth: 140 },
      1: { cellWidth: 46, halign: "right", fontStyle: "bold" },
    },
    margin: { left: 14, right: 14 },
  });

  // ── Additional Info ──
  if (contribution.additionalInfo) {
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setTextColor(...green);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Additional Note:", 14, finalY);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...gray);
    doc.text(`"${contribution.additionalInfo}"`, 14, finalY + 7);
  }

  // ── Footer ──
  const pageH = doc.internal.pageSize.height;

  doc.setFillColor(...green);
  doc.rect(0, pageH - 20, 210, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Thank you for contributing to a cleaner community! — CivicCare Portal",
    105, pageH - 12,
    { align: "center" }
  );
  doc.text(
    "© 2024 CivicCare Portal. All rights reserved.",
    105, pageH - 6,
    { align: "center" }
  );

  // ── Save ──
  doc.save(`CivicCare-Receipt-${contribution._id?.slice(-8)}.pdf`);
};