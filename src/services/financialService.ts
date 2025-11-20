
import { FinancialSummary, Invoice } from '@/types';

// Mock data for the financial summary
const mockFinancialSummary: FinancialSummary = {
    totalRevenue: 275300,
    netProfit: 190540,
    outstandingInvoices: 35000,
    expenses: 84760,
};

// Mock data for recent invoices
const mockInvoices: Invoice[] = [
    { id: 'INV-001', clientName: 'FashionOS', amount: 15000, status: 'paid', dueDate: '2024-08-01' },
    { id: 'INV-002', clientName: 'AutoMax AI', amount: 25000, status: 'pending', dueDate: '2024-09-15' },
    { id: 'INV-003', clientName: 'I Love Medellin', amount: 10000, status: 'overdue', dueDate: '2024-08-20' },
    { id: 'INV-004', clientName: 'TechStart Inc.', amount: 12000, status: 'paid', dueDate: '2024-07-25' },
];

/**
 * Fetches mock financial summary data.
 * @returns A promise that resolves to the financial summary object.
 */
export const getFinancialSummary = async (): Promise<FinancialSummary> => {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFinancialSummary;
};

/**
 * Fetches a list of mock recent invoices.
 * @returns A promise that resolves to an array of invoice objects.
 */
export const getInvoices = async (): Promise<Invoice[]> => {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockInvoices;
};
