"use client"

import {
  CalendarIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { formatDate } from '@/lib/format-date';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label, MultiSelectCombobox, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import useOfficeCombobox from '../office/hook/useOfficeCombobox';
import { useEffect, useState } from 'react';

interface DataTableToolbarProps {
    filter: {
        createdAt?: Date;
        setCreatedAtFilter?: (filter?: Date) => void;
        selectedOfficeId?: any;
        setSelectedOfficeId?: (OfficeId?: any) => void;
        startDate?: Date;
        setStartDate?: (filter?: Date) => void;
        endDate?: Date;
        setEndDate?: (filter?: Date) => void;
        filterType?: string;
        setFilterType?: React.Dispatch<React.SetStateAction<string>>;

    };
}
export function FilterNumberAggregation({ filter: { 
  createdAt, 
  setCreatedAtFilter, 
  selectedOfficeId, 
  setSelectedOfficeId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setFilterType,
} }: DataTableToolbarProps) {
  const { result: officeOptions } = useOfficeCombobox();
  const [selectedReport, setSelectedReport] = useState<string>("daily");
  useEffect(() => {
    const now: Date = new Date();
    setFilterType?.(selectedReport)

    if (selectedReport === "daily") {
      const cuurentDate = new Date()
      setCreatedAtFilter?.(cuurentDate)
    }

    if (selectedReport === "weekly") {
      const startWeek: Date = startOfWeek(now, { weekStartsOn: 1 })
      const endWeek: Date = endOfWeek(now, { weekStartsOn: 1 })
      setStartDate?.(startWeek)
      setEndDate?.(endWeek)
    }

    if (selectedReport === "monthly") {
      const startMonth: Date = startOfMonth(now)
      const endMonth: Date = endOfMonth(now)
      setStartDate?.(startMonth)
      setEndDate?.(endMonth)
    }
  }, [selectedReport])
  return (
    <div >
      <Select defaultValue={selectedReport} onValueChange={(value: string) => setSelectedReport(value)}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a report" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="daily">ລາຍງານປະຈໍາວັນ</SelectItem>
            <SelectItem value="weekly">ລາຍງານປະຈໍາອາທິດ</SelectItem>
            <SelectItem value="monthly">ລາຍງານປະຈໍາເດືອນ</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30 my-2">
        <div className="space-y-2 h-auto">
          <Label htmlFor="date-filter">ວັນທີເດືອນປີ</Label>
          {selectedReport === "daily" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button id="date-filter" variant="outline" className="w-full justify-start text-left font-normal h-9">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {createdAt ? formatDate({ date: createdAt }) : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={createdAt}
                  onSelect={(day) => {
                    if (!day) { 
                      return; 
                    }
                    const now = new Date();
                    const withTime = new Date(day);
                    withTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                    setCreatedAtFilter?.(withTime);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
          {(selectedReport === "weekly" || selectedReport === "monthly") && (
            <div className="flex flex-col gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="start-date" variant="outline" className="w-full justify-start text-left font-normal h-9">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? formatDate({ date: startDate }) : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(day) => {
                      if (!day) { 
                        return; 
                      }
                      setStartDate?.(day);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button id="end-date" variant="outline" className="w-full justify-start text-left font-normal h-9">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? formatDate({ date: endDate }) : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={(day) => {
                      if (!day) { 
                        return; 
                      }
                      setEndDate?.(day);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="date-filter">ສາຂາ</Label>
          <MultiSelectCombobox
            options={officeOptions}
            value={selectedOfficeId}
            onChange={setSelectedOfficeId}
            placeholder="Select office..."
          />
        </div>
      </div>
    </div>
  )
}