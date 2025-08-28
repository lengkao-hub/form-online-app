"use client"
import { Download, Users } from "lucide-react";
// import { PeopleReportFilterToolbar } from "./container/people-report";
import { Button } from "@/components/ui";
import usePeopleReport from "./hook/hook";
import { FilterPeopleReport } from "./container/filter";
import { PeopleReportFilterToolbar } from "./container/people-report";

export default function PeopleReportPage() {
  const { result, filter } = usePeopleReport()
  const visaType = filter.visaType
  return (
    <main className="min-h-screen">
      <header className="border-b bg-transparent mb-5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ລາຍງານຂໍ້ມູນການອອກບັດ</h1>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export To Excel
            </Button>
          </div>
        </div>
      </header>
      <FilterPeopleReport filter={filter}/>
      <PeopleReportFilterToolbar data={result} visaType={visaType}/>
    </main>
  )
}