/* eslint-disable max-nested-callbacks */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOne } from "@/hooks/useOne";
import React from "react";
import { IVisaType } from "src/app/(protected)/visa/type";

interface PeopleTableProps {
  data?: {
    nationality: string;
      visaType: string;
      cardType: {
        expirationTerm: string;
        male: number;
        female: number;
      }[];
  }[],
  visaType: string | number;
}

export function PeopleTable({ data, visaType }: PeopleTableProps) {
  const { data: visaData } = useOne<IVisaType>({ resource: "visa", id: Number(visaType) })
  return (
    <Card>
      <CardHeader>
        <CardTitle>ລາຍລະອຽດ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {visaType !== "all" && (
                <TableRow>
                  <TableHead colSpan={6} className="text-center text-lg">{visaData?.result?.typeCode}</TableHead>
                </TableRow>
              )}
              <TableRow className="">
                <TableHead rowSpan={3} className="text-center font-black">No</TableHead>
                <TableHead rowSpan={3} className="font-black border-x-[1px] text-center">ສັນຊາດ</TableHead>
                {visaType === "all" && (
                  <TableHead rowSpan={3} className="font-black border-x-[1px] text-center">ປະເພດວິຊ່າ</TableHead> 
                )}
                <TableHead colSpan={2} className="font-black border-x-[1px] text-center">1 ປີ</TableHead>
                <TableHead colSpan={2} className="font-black border-x-[1px] text-center">6 ເດືອນ</TableHead>
              </TableRow>
              <TableRow>
                <TableHead colSpan={2} className="font-black border-x-[1px] text-center">ຄ່າທໍານຽມ</TableHead>
                <TableHead colSpan={2} className="font-black border-x-[1px] text-center">ຄ່າທໍານຽມ</TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="font-black border-x-[1px] text-center">ຊາຍ</TableHead>
                <TableHead className="font-black border-x-[1px] text-center">ຍິງ</TableHead>
                <TableHead className="font-black border-x-[1px] text-center">ຊາຍ</TableHead>
                <TableHead className="font-black border-x-[1px] text-center">ຍິງ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((item, index) => {
                  // ดึงค่าตาม expirationTerm
                  const oneYear = item.cardType.find((c) => c.expirationTerm === "ONE_YEAR");
                  const sixMonths = item.cardType.find((c) => c.expirationTerm === "SIX_MONTHS");

                  return (
                    <TableRow key={`${item.nationality}-${item.visaType}`}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="border-x-[1px] text-center">{item.nationality}</TableCell>
                      {visaType === "all" && (
                        <TableCell className="border-x-[1px] text-center">{item.visaType}</TableCell>
                      )}
                      {/* ONE_YEAR */}
                      <TableCell className="border-x-[1px] text-center">{oneYear?.male && oneYear.male > 0 ? oneYear.male : null}</TableCell>
                      <TableCell className="border-x-[1px] text-center">{oneYear?.female && oneYear.female > 0 ?oneYear?.female : null}</TableCell>
                      {/* SIX_MONTHS */}
                      <TableCell className="border-x-[1px] text-center">{sixMonths?.male && sixMonths.male > 0 ? sixMonths?.male : null}</TableCell>
                      <TableCell className="border-x-[1px] text-center">{sixMonths?.female && sixMonths.female > 0 ? sixMonths?.female : null}</TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
