"use client";

import { ActivityFieldDiaryProp } from "@/lib/definitions";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { ArrowDownCircle } from "lucide-react";

export default function ExportPDFButton(treatProp: ActivityFieldDiaryProp) {
  const treatments = treatProp.treatments;

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title and metadata
    doc.setFontSize(20);
    doc.text("Registro dei Trattamenti", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generato il ${format(new Date(), "dd/MM/yyyy")}`, 14, 25);

    // Convert treatments to table format
    const tableData = treatments.map((t) => [
      format(new Date(t.activity_date), "dd/MM/yyyy"),
      t.field_name,
      t.product_name,
      t.active_ingredient,
      t.product_quantity,
      t.compliance_status === "compliant"
        ? "conforme"
        : t.compliance_status === "warning"
          ? "attenzione"
          : "non conforme",
    ]);

    autoTable(doc, {
      head: [
        ["Data", "Campo", "Prodotto", "Principio Attivo", "Quantità", "Stato"],
      ],
      body: tableData,
      startY: 35,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 101, 52] },
    });

    doc.save("registro-trattamenti.pdf");
  };

  return (
    <>
      {treatments ? (
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-agroke-green/65 text-agroke-black-light hover:bg-agroke-green-dark/90 hover:text-white font-bold rounded-lg transition"
        >
          <ArrowDownCircle size={18} />
          Esporta PDF
        </button>
      ) : (
        <button
          className="flex items-center gap-2 px-4 py-2 bg-agroke-green/30 text-agroke-black-light/50 rounded-lg cursor-not-allowed font-bold"
          disabled
        >
          <ArrowDownCircle size={18} />
          Esporta PDF
        </button>
      )}
    </>
  );
}
