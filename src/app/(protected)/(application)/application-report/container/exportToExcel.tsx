/* eslint-disable max-nested-callbacks */
import ExcelJS from "exceljs"

interface IReportResponse {
  total: {
    male: number
    female: number
  }
  nationalityCount: number
  rows: {
    nationality: string
    visaType: string
    cardType: {
      expirationTerm: string
      male: number
      female: number
    }[]
  }[]
}

export const exportToExcel = async (result: IReportResponse) => {
  const workbook = new ExcelJS.Workbook()
  const transactionSheet = workbook.addWorksheet("Transactions")
  const summarySheet = workbook.addWorksheet("Summary")

  transactionSheet.columns = [
    { header: "ລ/ດ", key: "no", width: 10 },
    { header: "ສັນຊາດ", key: "nationality", width: 20 },
    { header: "ຊາຍ (1 ປີ)", key: "male1", width: 15 },
    { header: "ຍິງ (1 ປີ)", key: "female1", width: 15 },
    { header: "ຊາຍ (6 ເດືອນ)", key: "male2", width: 15 },
    { header: "ຍິງ (6 ເດືອນ)", key: "female2", width: 15 },
  ]
  // Merge Header column
  transactionSheet.mergeCells("A1:A3")
  transactionSheet.getCell("A1").value = "ລ/ດ"

  transactionSheet.mergeCells("B1:B3")
  transactionSheet.getCell("B1").value = "ສັນຊາດ"

  transactionSheet.mergeCells("C1:D1")
  transactionSheet.getCell("C1").value = "1 ປີ"

  transactionSheet.mergeCells("E1:F1")
  transactionSheet.getCell("E1").value = "6 ເດືອນ"

  transactionSheet.mergeCells("C2:D2")
  transactionSheet.getCell("C2").value = "ຄ່າທໍານຽມ"

  transactionSheet.mergeCells("E2:F2")
  transactionSheet.getCell("E2").value = "ຄ່າທໍານຽມ"

  transactionSheet.getCell("C3").value = "ຊາຍ"
  transactionSheet.getCell("D3").value = "ຍິງ"
  transactionSheet.getCell("E3").value = "ຊາຍ"
  transactionSheet.getCell("F3").value = "ຍິງ"

  result.rows.forEach((item, index) => {
    const oneYear = item.cardType.find((c) => c.expirationTerm === "ONE_YEAR")
    const sixMonths = item.cardType.find((c) => c.expirationTerm === "SIX_MONTHS")

    const row = transactionSheet.addRow({
      no: index + 1,
      nationality: item.nationality,
      male1: oneYear?.male && oneYear?.male > 0 ? oneYear?.male : "",
      female1: oneYear?.female && oneYear?.female > 0 ? oneYear?.female : "",
      male2: sixMonths?.male && sixMonths?.male > 0 ? sixMonths?.male : "",
      female2: sixMonths?.female && sixMonths?.female > 0 ? sixMonths?.female : "",
    })
    row.eachCell((cell, colNumber) => {
      if (colNumber !== 1 && typeof cell.value === "number" && cell.value > 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF90EE90" },
        }
      }
    })
  })

  // ฟอร์แมททั้งหมด
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

  // สรุป
  summarySheet.columns = [
    { header: "Currency", key: "currency", width: 20 },
    { header: "Total", key: "total", width: 20 },
    { header: "Symbol", key: "symbol", width: 10 },
  ]

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Report.xlsx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
