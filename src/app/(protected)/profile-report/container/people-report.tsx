/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
/* eslint-disable curly */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
"use client"

import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
import { Users, Filter, Calendar } from "lucide-react"
import { PeopleTable } from "./people-table";
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
// import { cn } from "@/lib/utils"

interface DataTableToolbarProps {
  data?: {
    total: {
      male: number,
      female: number,
    },
    nationalityCount: number;
    rows: {
      nationality: string,
      male: number,
      female: number,
    }[]
  }
}

export function PeopleReportFilterToolbar({ data }: DataTableToolbarProps) {

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ທັງໝົດ</p>
                  <p className="text-2xl font-bold text-foreground">{(data?.total.female || 0) + (data?.total.male || 0)}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ຍິງ</p>
                  <p className="text-2xl font-bold text-foreground">
                    {data?.total.female}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ຊາຍ</p>
                  <p className="text-2xl font-bold text-foreground">{data?.total.male}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ສັນຊາດ</p>
                  <p className="text-2xl font-bold text-foreground">
                    {data?.nationalityCount}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        {/* <PeopleCharts data={filteredData} /> */}

        {/* Data Table */}
        <PeopleTable data={data?.rows} />
      </div>
    </div>
  )
}
