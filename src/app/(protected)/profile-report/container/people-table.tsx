"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PeopleTableProps {
  data?: {
    nationality: string
    male: number
    female: number
  }[]
}

export function PeopleTable({ data }: PeopleTableProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>ລາຍລະອຽດ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-black">ລ/ດ</TableHead>
                <TableHead className="font-black">ຊາດ</TableHead>
                <TableHead className="font-black">ຊາຍ</TableHead>
                <TableHead className="font-black">ຍິງ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item, index) => (
                  <>
                    <TableRow key={`${item.nationality}-male`}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.nationality}</TableCell>
                      <TableCell>{item.male}</TableCell>
                      <TableCell>{item.female}</TableCell>
                      {/* <TableCell>{item.male}</TableCell> */}
                    </TableRow>
                    {/* <TableRow key={`${item.nationality}-female`}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.nationality}</TableCell>
                      
                      <TableCell>{item.female}</TableCell>
                    </TableRow> */}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
