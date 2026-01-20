'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DollarSign, Wallet } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useLanguage } from "@/context/language-context";

const earningsData = [
  { day: "सोम", day_en: "Mon", earnings: 1250 },
  { day: "मंगल", day_en: "Tue", earnings: 980 },
  { day: "बुध", day_en: "Wed", earnings: 2100 },
  { day: "गुरु", day_en: "Thu", earnings: 1780 },
  { day: "शुक्र", day_en: "Fri", earnings: 1890 },
  { day: "शनि", day_en: "Sat", earnings: 2390 },
  { day: "रवि", day_en: "Sun", earnings: 0 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))",
  },
};

const recentTransactions = [
    {id: 'T01', customer: 'नेहा गुप्ता', service_hi: 'गीज़र की मरम्मत', service_en: 'Geyser Repair', amount: 450, date_hi: 'आज', date_en: 'Today'},
    {id: 'T02', customer: 'अमित कुमार', service_hi: 'AC सर्विस', service_en: 'AC Service', amount: 800, date_hi: 'कल', date_en: 'Yesterday'},
    {id: 'T03', customer: 'सुनीता सिंह', service_hi: 'वायरिंग की जाँच', service_en: 'Wiring Check', amount: 350, date_hi: 'कल', date_en: 'Yesterday'},
]

export default function ProviderEarningsPage() {
  const { t, locale } = useLanguage();
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/provider/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold font-headline">{t('my_earnings')}</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('earnings_weekly')}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹10,390</div>
              <p className="text-xs text-muted-foreground">{t('earnings_last_7_days')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('earnings_total_payout')}</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,25,430</div>
              <p className="text-xs text-muted-foreground">{t('earnings_lifetime')}</p>
            </CardContent>
          </Card>
        </section>

      <Card>
        <CardHeader>
            <CardTitle>{t('earnings_weekly_overview')}</CardTitle>
            <CardDescription>{t('earnings_this_week_summary')}</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <RechartsBarChart accessibilityLayer data={earningsData}>
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value, index) => locale === 'hi' ? earningsData[index].day : earningsData[index].day_en}
                    />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--muted))'}} 
                      content={<ChartTooltipContent 
                        formatter={(value) => `₹${value}`} 
                        labelFormatter={(label, payload) => {
                          const item = payload[0]?.payload;
                          if (!item) return null;
                          return <div className="font-bold">{locale === 'hi' ? item.day : item.day_en}</div>;
                        }}
                      />} 
                    />
                    <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
            <CardTitle>{t('earnings_recent_transactions')}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <ul className="divide-y">
                {recentTransactions.map(tx => (
                    <li key={tx.id} className="flex justify-between items-center p-4 hover:bg-muted/50">
                        <div>
                            <p className="font-medium">{locale === 'hi' ? tx.service_hi : tx.service_en}</p>
                            <p className="text-sm text-muted-foreground">{t('customer')}: {tx.customer} - {locale === 'hi' ? tx.date_hi : tx.date_en}</p>
                        </div>
                        <p className="font-bold text-green-600">+ ₹{tx.amount}</p>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
