import React, { useState } from 'react';
import { Plus, Trash2, Calculator, DollarSign, Users, CalendarDays, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- Constants & Types ---
const TAX_RATE = 0.12; // 12% GST + PST

interface BudgetRow {
  id: string;
  people: number | ''; // Allow empty string for better UX while typing
  price: number | '';
  days: number | '';
}

// --- Pure Helper Functions ---

/**
 * Generates a unique ID for rows
 */
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * Calculates the base total for a single row.
 * Returns 0 if inputs are invalid.
 */
const calculateRowBase = (row: BudgetRow): number => {
  const people = Number(row.people) || 0;
  const price = Number(row.price) || 0;
  const days = Number(row.days) || 0;
  
  if (people < 0 || price < 0 || days < 0) return 0;
  return people * price * days;
};

/**
 * Formats a number as Canadian Currency
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const PriceEstimator: React.FC = () => {
  // Initial State: One row with days empty by default
  const [rows, setRows] = useState<BudgetRow[]>([
    { id: 'init-1', people: 1, price: 8, days: '' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Handlers ---

  const addRow = () => {
    setRows([...rows, { id: generateId(), people: 1, price: 0, days: '' }]);
  };

  const removeRow = (id: string) => {
    if (rows.length === 1) {
        // Reset the last row instead of deleting it
        setRows([{ id: generateId(), people: 0, price: 0, days: '' }]);
        return;
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: keyof BudgetRow, value: string) => {
    // Prevent non-numeric input (allow empty string)
    if (value !== '' && isNaN(Number(value))) return;

    setRows(rows.map(row => {
      if (row.id === id) {
        // Prevent negative numbers specifically
        const numVal = Number(value);
        if (numVal < 0) return row;
        
        return { ...row, [field]: value === '' ? '' : numVal };
      }
      return row;
    }));
  };

  // --- Derived Calculations ---
  
  const subTotal = rows.reduce((acc, row) => acc + calculateRowBase(row), 0);
  const taxAmount = subTotal * TAX_RATE;
  const grandTotal = subTotal + taxAmount;

  // Validation: Check if days are valid (>0) for all rows
  const hasInvalidDays = rows.some(row => !row.days || Number(row.days) <= 0);

  // --- PDF Generation ---
  const handleDownloadPDF = () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Brand Header
      doc.setTextColor(245, 124, 0); // Saffron-600 approx
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Tiffin Tales", 14, 20);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Pure Veg Tiffin Service", 14, 26);
      doc.text("Fleetwood, Surrey, BC", 14, 30);
      doc.text("Tel: +1-604-618-7770", 14, 34);

      // Title & Date
      doc.setFontSize(16);
      doc.setTextColor(33, 33, 33);
      doc.text("Budget Estimate", pageWidth - 14, 20, { align: "right" });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 14, 26, { align: "right" });

      // Table Data Preparation
      const tableBody = rows.map((row, index) => [
        (index + 1).toString(),
        `${Number(row.people) || 0}`,
        formatCurrency(Number(row.price) || 0),
        `${Number(row.days) || 0}`,
        formatCurrency(calculateRowBase(row))
      ]);

      // Add Summary Rows
      tableBody.push(
        ['', '', '', 'Subtotal', formatCurrency(subTotal)],
        ['', '', '', 'Tax (12%)', formatCurrency(taxAmount)],
        ['', '', '', 'Total Estimate', formatCurrency(grandTotal)]
      );

      // Generate Table
      autoTable(doc, {
        startY: 45,
        head: [['#', 'People', 'Price/Tiffin', 'Days', 'Total']],
        body: tableBody,
        theme: 'grid',
        headStyles: { 
          fillColor: [245, 124, 0], // Saffron color
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 15 },
          4: { fontStyle: 'bold', halign: 'right' }, // Total column
          3: { halign: 'center' },
          2: { halign: 'right' },
          1: { halign: 'center' }
        },
        // Styling for summary rows (last 3 rows)
        didParseCell: function(data: any) {
          const rowCount = tableBody.length;
          if (data.row.index >= rowCount - 3) {
             data.cell.styles.fontStyle = 'bold';
             // Make the label cells align right
             if (data.column.index === 3) {
                 data.cell.styles.halign = 'right';
             }
             // Total Value Styling
             if (data.column.index === 4) {
                 data.cell.styles.halign = 'right';
                 if (data.row.index === rowCount - 1) { // Grand Total Row
                    data.cell.styles.textColor = [245, 124, 0];
                    data.cell.styles.fontSize = 12;
                 }
             }
             // Remove grid lines for empty cells in summary
             if (data.column.index < 3) {
                 data.cell.styles.lineWidth = 0;
             }
          }
        }
      });

      // Footer
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("* This document is an estimate only and does not represent a final invoice.", 14, finalY);
      doc.text("Prices and availability are subject to change without notice.", 14, finalY + 5);
      doc.text("Generated via tiffintales.ca", 14, finalY + 10);

      // Save
      doc.save("tiffin-tales-budget.pdf");
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="price-estimator" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-saffron-100 text-saffron-600 rounded-full mb-4">
            <Calculator size={24} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Plan Your Budget</h2>
          <p className="text-gray-600">
            Estimate your monthly tiffin costs instantly. Add multiple orders for family or friends.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Column Headers (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-100 border-b border-gray-200 text-sm font-bold text-gray-600 uppercase tracking-wide">
            <div className="col-span-3">People</div>
            <div className="col-span-3">Price / Tiffin</div>
            <div className="col-span-3">Days Served</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-0">
            {rows.map((row) => (
              <div 
                key={row.id} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none shadow-sm md:shadow-none border md:border-0 border-gray-200"
              >
                {/* Mobile Label Wrapper */}
                
                {/* Field: People */}
                <div className="col-span-3">
                    <label className="block md:hidden text-xs font-bold text-gray-500 uppercase mb-1">People</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Users size={16} />
                        </div>
                        <input
                            type="number"
                            min="0"
                            value={row.people}
                            onChange={(e) => updateRow(row.id, 'people', e.target.value)}
                            placeholder="1"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-saffron-500 focus:border-saffron-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Field: Price */}
                <div className="col-span-3">
                    <label className="block md:hidden text-xs font-bold text-gray-500 uppercase mb-1">Price per Meal</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <DollarSign size={16} />
                        </div>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={row.price}
                            onChange={(e) => updateRow(row.id, 'price', e.target.value)}
                            placeholder="0.00"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-saffron-500 focus:border-saffron-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Field: Days */}
                <div className="col-span-3">
                    <label className="block md:hidden text-xs font-bold text-gray-500 uppercase mb-1">Days</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <CalendarDays size={16} />
                        </div>
                        <input
                            type="number"
                            min="0"
                            value={row.days}
                            onChange={(e) => updateRow(row.id, 'days', e.target.value)}
                            placeholder="20"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-saffron-500 focus:border-saffron-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Row Total */}
                <div className="col-span-2 flex justify-between md:justify-end items-center md:items-center mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-0 border-gray-100">
                    <span className="md:hidden text-sm font-bold text-gray-600">Subtotal:</span>
                    <span className="font-mono font-medium text-gray-900">
                        {formatCurrency(calculateRowBase(row))}
                    </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 text-right flex justify-end">
                    <button
                        onClick={() => removeRow(row.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                        title="Remove row"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <div className="px-6 pb-6 pt-2">
            <button
                onClick={addRow}
                disabled={hasInvalidDays}
                title={hasInvalidDays ? "Please enter valid days (>0) to add another item" : "Add another order"}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  hasInvalidDays 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-saffron-600 hover:text-saffron-700'
                }`}
            >
                <Plus size={18} />
                Add Another Order
            </button>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-900 p-6 md:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                
                {/* Left side of footer: Totals */}
                <div className="flex-1 w-full space-y-3">
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                        <span>Tax (12% GST/PST)</span>
                        <span>{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="h-px bg-gray-700 my-2"></div>
                    <div className="flex justify-between items-center text-xl md:text-2xl font-bold text-saffron-400">
                        <span>Total Estimate</span>
                        <span>{formatCurrency(grandTotal)}</span>
                    </div>
                </div>

                {/* Right side of footer: Actions */}
                <div className="w-full md:w-auto flex flex-col items-end gap-2">
                     <button
                        onClick={handleDownloadPDF}
                        disabled={isGenerating || grandTotal === 0}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                            grandTotal === 0 
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-gray-900 hover:bg-saffron-50 hover:text-saffron-700 hover:scale-105'
                        }`}
                     >
                        <Download size={18} />
                        {isGenerating ? 'Generating...' : 'Download PDF Quote'}
                     </button>
                     <p className="text-[10px] text-gray-500">
                        *Prices are estimates based on your inputs.
                     </p>
                </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PriceEstimator;