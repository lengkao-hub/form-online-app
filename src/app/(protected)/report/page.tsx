/* eslint-disable @typescript-eslint/naming-convention */
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlignJustify, FileSpreadsheet } from "lucide-react"
import useNumberAggregation from "./hook"
import { FilterNumberAggregation } from "./cardFilter"
import { exportToExcel } from "./excelCustom"

export default function FinancialSummary() {
  const { result, filter } = useNumberAggregation()
  const CardTotal = (result?.summary.currencyCounts?.CNY || 0) + (result?.summary.currencyCounts?.THB || 0) + (result?.summary.currencyCounts?.USD || 0)

  const formatCurrency = (amount: number, symbol: string) => {
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  const handleExport = () => {
    if (result) {
      exportToExcel(result)
    }
  }
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">ລາຍງານລາຍຮັບ</h1>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>
      <FilterNumberAggregation filter={filter} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-3 grid lg:grid-cols-3 gap-4">
          {result.summary?.sum.map((item, index) => (
            <Card key={index} className="bg-card">
              <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-lg font-medium flex items-center">
                  {/* {item.currency.symbol} {item.currency.code} Total */}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {/* <div className="text-3xl font-bold">{formatCurrency(item.policeTotal, item.currency.symbol)}</div> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="col-span-3 grid lg:grid-cols-3 gap-4">
          {result.summary?.sum.map((item, index) => (
            <Card key={index} className="bg-card">
              <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-lg font-medium flex items-center">
                  {/* {item.currency.symbol} {item.currency.code} Total (ມອບໂຕຈິງຕາມທະນາຄານ) */}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {/* <div className="text-3xl font-bold">{formatCurrency(item.total, item.currency.symbol)}</div> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="col-span-3 grid lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2 bg-primary/5">
              <CardTitle className="text-lg font-medium flex items-center">
                <AlignJustify className="mr-2 h-5 w-5"/>
                ຈໍານວນບັດທັງໝົດ
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{CardTotal}</div>
            </CardContent>
          </Card>
          { result?.summary.currencyCounts?.CNY && (
            <Card>
              <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-lg font-medium flex items-center">
                  {/* <AlignJustify className="mr-2 h-5 w-5"/> */}
                  ຈໍານວນບັດທີ່ຈ່າຍເປັນ CNY
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{result?.summary.currencyCounts?.CNY}</div>
              </CardContent>
            </Card>
          )}
          { result?.summary.currencyCounts?.THB && (
            <Card>
              <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-lg font-medium flex items-center">
                  {/* <AlignJustify className="mr-2 h-5 w-5"/> */}
                  ຈໍານວນບັດທີ່ຈ່າຍເປັນ THB
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{result?.summary.currencyCounts?.THB}</div>
              </CardContent>
            </Card>
          )}
          { result?.summary.currencyCounts?.USD && (
            <Card>
              <CardHeader className="pb-2 bg-primary/5">
                <CardTitle className="text-lg font-medium flex items-center">
                  {/* <AlignJustify className="mr-2 h-5 w-5"/> */}
                  ຈໍານວນບັດທີ່ຈ່າຍເປັນ USD
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-3xl font-bold">{result?.summary.currencyCounts?.USD}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ລາຍລະອຽດການອອກບັດ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >ລ/ດ</TableHead>
                  <TableHead>ເລກທີຟອມ</TableHead>
                  <TableHead>ວັນທີເດືອນປີ</TableHead>
                  <TableHead>ປະເພດບັດ</TableHead>
                  <TableHead>ຜູ້ຮັບເງິນ</TableHead>
                  <TableHead>Rate (LIT)</TableHead>
                  <TableHead>Rate (Police)</TableHead>
                  <TableHead>ສະກຸນເງິນ</TableHead>
                  <TableHead>ລາຄາ</TableHead>
                  <TableHead>ສາຂາ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.data?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.no}</TableCell>
                    <TableCell className="font-medium">{transaction.number}</TableCell>
                    <TableCell>{transaction.createdAt}</TableCell>
                    <TableCell>{transaction.priceCode}</TableCell>
                    <TableCell>{transaction.approvedByFirstName}</TableCell>
                    <TableCell>{transaction.rateBase}</TableCell>
                    <TableCell>{transaction.ratePolice}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.currencyCode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.price, transaction.currencySymbol)}
                    </TableCell>
                    <TableCell>{transaction.officeName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
