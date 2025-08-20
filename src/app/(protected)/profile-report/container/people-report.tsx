/* eslint-disable max-depth */
/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
/* eslint-disable curly */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
"use client"

import { useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
import { Users, Filter, Calendar } from "lucide-react"
import { PeopleTable } from "./people-table"
import { IProfile } from "../../profile/type"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
// import { cn } from "@/lib/utils"

const mockPeopleData = [
  {
    id: 1,
    name: "Alice Johnson",
    nationality: "USA",
    gender: "Female",
    age: 28,
    department: "Engineering",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    nationality: "Canada",
    gender: "Male",
    age: 34,
    department: "Marketing",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Chen Wei",
    nationality: "China",
    gender: "Male",
    age: 29,
    department: "Engineering",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Diana Rodriguez",
    nationality: "Mexico",
    gender: "Female",
    age: 31,
    department: "HR",
    joinDate: "2023-01-25",
  },
  {
    id: 5,
    name: "Erik Larsson",
    nationality: "Sweden",
    gender: "Male",
    age: 26,
    department: "Design",
    joinDate: "2023-04-05",
  },
  {
    id: 6,
    name: "Fatima Al-Zahra",
    nationality: "UAE",
    gender: "Female",
    age: 33,
    department: "Finance",
    joinDate: "2023-02-14",
  },
  {
    id: 7,
    name: "Giovanni Rossi",
    nationality: "Italy",
    gender: "Male",
    age: 37,
    department: "Sales",
    joinDate: "2023-03-22",
  },
  {
    id: 8,
    name: "Hannah Kim",
    nationality: "South Korea",
    gender: "Female",
    age: 25,
    department: "Engineering",
    joinDate: "2023-05-01",
  },
  {
    id: 9,
    name: "Ibrahim Hassan",
    nationality: "Egypt",
    gender: "Male",
    age: 30,
    department: "Marketing",
    joinDate: "2023-01-30",
  },
  {
    id: 10,
    name: "Julia Santos",
    nationality: "Brazil",
    gender: "Female",
    age: 32,
    department: "HR",
    joinDate: "2023-04-18",
  },
  {
    id: 11,
    name: "Klaus Mueller",
    nationality: "Germany",
    gender: "Male",
    age: 35,
    department: "Engineering",
    joinDate: "2023-02-08",
  },
  {
    id: 12,
    name: "Lila Patel",
    nationality: "India",
    gender: "Female",
    age: 27,
    department: "Design",
    joinDate: "2023-03-15",
  },
  {
    id: 13,
    name: "Marcus Thompson",
    nationality: "UK",
    gender: "Male",
    age: 29,
    department: "Finance",
    joinDate: "2023-05-10",
  },
  {
    id: 14,
    name: "Nadia Volkov",
    nationality: "Russia",
    gender: "Female",
    age: 31,
    department: "Sales",
    joinDate: "2023-01-12",
  },
  {
    id: 15,
    name: "Omar Benali",
    nationality: "Morocco",
    gender: "Male",
    age: 28,
    department: "Marketing",
    joinDate: "2023-04-25",
  },
]

interface DataTableToolbarProps {
  filter: {
    selectedOfficeId?: any;
    setSelectedOfficeId?: (OfficeId?: any) => void;
    start?: Date;
    setStart?: (filter?: Date) => void;
    end?: Date;
    setEnd?: (filter?: Date) => void;
    gender?: string;
    setGender?: (filter?: string) => void;
    nationality?: string | undefined;
    setNationality?: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
  data?: IProfile[]
}

export function PeopleReportFilterToolbar({ filter: {
  selectedOfficeId,
  // setSelectedOfficeId,
  start,
  // setStart,
  end,
  // setEnd,
  gender,
  // setGender,
  nationality,
  // setNationality,
}, data }: DataTableToolbarProps) {
  // const [activeFilters, setActiveFilters] = useState<string[]>([])
  // const [nationalityOpen, setNationalityOpen] = useState(false)
  const filteredData = useMemo(() => {
    return mockPeopleData.filter((person) => {
      if (selectedOfficeId) {
        return false;
      }

      if (gender && person.gender !== gender) {
        return false;
      }

      if (nationality && person.nationality !== nationality) {
        return false;
      }

      if (start || end) {
        const joinDate = new Date(person.joinDate);
        if (start && joinDate < start) return false;
        if (end && joinDate > end) return false;
      }

      return true;
    });
  }, [selectedOfficeId, gender, nationality, start, end]);

  useEffect(() => {
    const newActiveFilters: string[] = [];
    if (selectedOfficeId) newActiveFilters.push(`Office: ${selectedOfficeId}`);
    if (gender) newActiveFilters.push(`Gender: ${gender}`);
    if (nationality) newActiveFilters.push(`Nationality: ${nationality}`);
    if (start) newActiveFilters.push(`Start: ${start.toLocaleDateString()}`);
    if (end) newActiveFilters.push(`End: ${end.toLocaleDateString()}`);

    // setActiveFilters(newActiveFilters);
  }, [selectedOfficeId, gender, nationality, start, end]);

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
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total People</p>
                  <p className="text-2xl font-bold text-foreground">{filteredData.length}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nationalities</p>
                  <p className="text-2xl font-bold text-foreground">
                    {[...new Set(filteredData.map((p) => p.nationality))].length}
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Age</p>
                  <p className="text-2xl font-bold text-foreground">
                    {filteredData.length > 0
                      ? Math.round(filteredData.reduce((sum, p) => sum + p.age, 0) / filteredData.length)
                      : 0}
                  </p>
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
                    {[...new Set(filteredData.map((p) => p.department))].length}
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
        <PeopleTable data={data} />
      </div>
    </div>
  )
}
