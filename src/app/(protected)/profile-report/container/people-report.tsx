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
    rows: {
      nationality: string,
      male: number,
      female: number,
    }[]
  }
}

export function PeopleReportFilterToolbar({ data }: DataTableToolbarProps) {
  // const [activeFilters, setActiveFilters] = useState<string[]>([])
  // const [nationalityOpen, setNationalityOpen] = useState(false)
  // const filteredData = useMemo(() => {
  //   if (!data) {
  //     return [];
  //   }
  //   return data?.rows.filter((person) => {
  //     if (selectedOfficeId) {
  //       return false;
  //     }

  //     if (gender && person.gender !== gender) {
  //       return false;
  //     }

  //     if (nationality && person.nationality !== nationality) {
  //       return false;
  //     }

  //     if (start || end) {
  //       const joinDate = new Date(person.joinDate);
  //       if (start && joinDate < start) return false;
  //       if (end && joinDate > end) return false;
  //     }

  //     return true;
  //   });
  // }, [selectedOfficeId, gender, nationality, start, end]);

  // useEffect(() => {
  //   const newActiveFilters: string[] = [];
  //   if (selectedOfficeId) newActiveFilters.push(`Office: ${selectedOfficeId}`);
  //   if (gender) newActiveFilters.push(`Gender: ${gender}`);
  //   if (nationality) newActiveFilters.push(`Nationality: ${nationality}`);
  //   if (start) newActiveFilters.push(`Start: ${start.toLocaleDateString()}`);
  //   if (end) newActiveFilters.push(`End: ${end.toLocaleDateString()}`);

  //   // setActiveFilters(newActiveFilters);
  // }, [selectedOfficeId, gender, nationality, start, end]);

  // const clearFilters = () => {
  //   setSelectedOfficeId?.(undefined);
  //   setGender?.(undefined);
  //   setNationality?.(undefined as any);
  //   setStart?.(undefined);
  //   setEnd?.(undefined);
  //   setActiveFilters([]);
  // };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total People</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Female</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Male</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Departments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {/* {[...new Set(filteredData.map((p) => p.department))].length} */}
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
