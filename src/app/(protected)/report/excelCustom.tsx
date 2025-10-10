/* eslint-disable max-nested-callbacks */
// Custom excel file here
import ExcelJS from "exceljs"
import { INumberAggregation } from "./type"

export const exportToExcel = async (result: INumberAggregation) => {
  const workbook = new ExcelJS.Workbook()
  const transactionSheet = workbook.addWorksheet("Transactions")
  const summarySheet = workbook.addWorksheet("Summary")

  transactionSheet.columns = [
    { header: "ລ/ດ", key: "no", width: 10 },
    { header: "ລະຫັດບັດ", key: "number", width: 20 },
    { header: "ວັນທີເດືອນປີ", key: "createdAt", width: 20 },
    { header: "ປະເພດບັດ", key: "priceCode", width: 15 },
    { header: "ຜູ້ຮັບເງິນ", key: "approvedByFirstName", width: 20 },
    { header: "Rate (LIT)", key: "rateBase", width: 15 },
    { header: "Rate (Police)", key: "ratePolice", width: 15 },
    { header: "ສະກຸນເງິນ", key: "currencyCode", width: 15 },
    { header: "ລາຄາ", key: "price", width: 15 },
    { header: "ສາຂາ", key: "officeName", width: 20 },
  ]

  result.data?.forEach((item: any) => {
    transactionSheet.addRow({
      no: item.no,
      number: item.number,
      createdAt: item.createdAt,
      priceCode: item.priceCode,
      approvedByFirstName: item.approvedByFirstName,
      rateBase: item.rateBase,
      ratePolice: item.ratePolice,
      currencyCode: item.currencyCode,
      price: item.price,
      officeName: item.officeName,
    })
  })
  //  Set font, alignment, etc for all
  transactionSheet.eachRow((row) => {
    row.eachCell((cell) => {
      const value = cell.value?.toString() || ""
      const isLao = /[\u0E80-\u0EFF]/.test(value)
      cell.font = {
        name: isLao ? "Phetsarath OT" : "Times New Roman",
        size: 12,
        bold: false,
        
      }
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      }
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      }
    })
  })

  // Merge Header column
  transactionSheet.mergeCells('A1:J1')
  transactionSheet.mergeCells('A2:A3')
  transactionSheet.getCell('A2').value = 'ລ/ດ'

  transactionSheet.mergeCells('B2:B3')
  transactionSheet.getCell('B2').value = 'ລະຫັດບັດ'

  transactionSheet.mergeCells('C2:C3')
  transactionSheet.getCell('C1').value = 'ວັນທີເດືອນປີ'

  transactionSheet.mergeCells('D2:E2')
  transactionSheet.mergeCells('F2:G2')
  transactionSheet.getCell('D2').value = 'ບັດ 6 ເດືອນຄົນມຽນມາ'

  summarySheet.columns = [
    { header: "Currency", key: "currency", width: 20 },
    { header: "Total", key: "total", width: 20 },
    { header: "Symbol", key: "symbol", width: 10 },
  ]

  result.summary?.sum.forEach((item: any) => {
    summarySheet.addRow({
      currency: item.currency.name,
      total: item.total,
      symbol: item.currency.symbol,
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${result.summary.name || "Report"}.xlsx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}