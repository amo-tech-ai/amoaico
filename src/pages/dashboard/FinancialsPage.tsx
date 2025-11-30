
import React, { useState, useEffect } from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { StatCard } from '../../components/dashboard/overview/StatCard';
import { getFinancialSummary, getInvoices } from '../../services/financialService';
import { FinancialSummary, Invoice } from '../../types';
import { DollarSignIcon, TrendingUpIcon, ClockIcon, XIcon } from '../../assets/icons';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const FinancialsPage = () => {
    const [summary, setSummary] = useState<FinancialSummary | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [summaryData, invoicesData] = await Promise.all([
                    getFinancialSummary(),
                    getInvoices(),
                ]);
                setSummary(summaryData);
                setInvoices(invoicesData);
            } catch (err) {
                setError("Could not load financial data. This is a demo page with mock data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const invoiceStatusStyles = {
        paid: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        overdue: 'bg-red-100 text-red-800',
    };

    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Financials Overview
                </h1>
                <p className="mt-1 text-lg text-sunai-slate/80">
                    A snapshot of your revenue and invoices. (Demo data)
                </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i} className="h-24 bg-white rounded-xl border border-gray-200 animate-pulse"></div>)
                ) : summary && (
                    <>
                        <StatCard icon={<DollarSignIcon />} title="Total Revenue" value={formatCurrency(summary.totalRevenue)} />
                        <StatCard icon={<TrendingUpIcon />} title="Net Profit" value={formatCurrency(summary.netProfit)} />
                        <StatCard icon={<ClockIcon />} title="Outstanding" value={formatCurrency(summary.outstandingInvoices)} />
                        <StatCard icon={<DollarSignIcon className="text-red-500" />} title="Expenses" value={formatCurrency(summary.expenses)} />
                    </>
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold font-poppins text-sunai-blue mb-4">Recent Invoices</h2>
                {loading ? (
                    <div className="h-64 bg-white rounded-xl border border-gray-200 animate-pulse"></div>
                ) : error ? (
                     <div className="bg-red-50 p-6 rounded-lg text-red-700 flex items-center gap-4">
                        <XIcon className="w-6 h-6" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.map(invoice => (
                                        <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.clientName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(invoice.amount)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoiceStatusStyles[invoice.status]}`}>
                                                    {invoice.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
};
