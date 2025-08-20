"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IProfile } from "../../profile/type"

interface PeopleTableProps {
  data?: IProfile[]
}

export function PeopleTable({ data }: PeopleTableProps) {
  const getGenderColor = (department: string) => {
    const colors: Record<string, string> = {
      MALE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      FEMALE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }
    return colors[department] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>People Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead>ຊື່ ແລະ ນາມສະກຸນ</TableHead>
                <TableHead>ເພດ</TableHead>
                <TableHead>ບາໂຄດ</TableHead>
                <TableHead>ວັນທີລົງທະບຽນ</TableHead>
                {/* <TableHead>Join Date</TableHead> */}
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
                data?.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium text-center">{person.id}</TableCell>
                    <TableCell className="font-medium">{person.firstName + person.lastName}</TableCell>
                    {/* <TableCell>{person.nationality.code}</TableCell> */}
                    <TableCell>
                      <Badge variant="secondary" className={getGenderColor(person.gender)}>
                        {person.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{person.barcode}</TableCell>
                    {/* <TableCell>{person.a}</TableCell> */}
                    {/* <TableCell>
                      <Badge variant="secondary" className={getDepartmentColor(person.department)}>
                        {person.department}
                      </Badge>
                    </TableCell> */}
                    <TableCell>{new Date(person.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
