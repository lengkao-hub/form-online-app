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
// import useOfficeCombobox from '../office/hook/useOfficeCombobox';
import { useEffect, useState } from 'react';
import useOfficeCombobox from "../../office/hook/useOfficeCombobox";
import  usenationalitiesCombobox  from "../../nationality/hook/useNationalitiesCombobox";
import { gender as genderOptions } from "../../profile/container/table/filter";
import { Combobox } from "@/components/ui/combobox";

export type Option = {
  label: string;
  value: string | number;
};

interface DataTableToolbarProps {
  filter: {
    start?: Date;
    setStart?: (filter?: Date) => void;
    selectedOfficeId?: any;
    setSelectedOfficeId?: (OfficeId?: any) => void;
    end?: Date;
    setEnd?: (filter?: Date) => void;
    gender?: string;
    setGender?: (filter?: string) => void;
    nationality?: string | number
    setNationality?: React.Dispatch<React.SetStateAction<string | number>>;
    visaType?: string | number,
    setVisaType?: React.Dispatch<React.SetStateAction<string | number>>;
    setFilterType?: React.Dispatch<React.SetStateAction<string>>;
    cardType?: string,
    setCardType?: React.Dispatch<React.SetStateAction<string>>;
  };
}
export function FilterPeopleReport({ filter: {
  start,
  setStart,
  selectedOfficeId,
  setSelectedOfficeId,
  end,
  setEnd,
  gender,
  setGender,
  nationality,
  setNationality,
  setFilterType,
} }: DataTableToolbarProps) {
  const { result: officeOptions } = useOfficeCombobox();
  const { result: nationalityOptions } = usenationalitiesCombobox({ isNationality: true });
  const [selectedReport, setSelectedReport] = useState<string>("daily");
  const extendedGenderOptions = [
    { label: 'All', value: 'all', icon: "" },
    ...genderOptions,
  ];
  useEffect(() => {
    const now: Date = new Date();
    setFilterType?.(selectedReport)

    if (selectedReport === "daily") {
      const cuurentDate = new Date()
      setStart?.(cuurentDate)
    }

    if (selectedReport === "weekly") {
      const startWeek: Date = startOfWeek(now, { weekStartsOn: 1 })
      const endWeek: Date = endOfWeek(now, { weekStartsOn: 1 })
      setStart?.(startWeek)
      setEnd?.(endWeek)
    }

    if (selectedReport === "monthly") {
      const startMonth: Date = startOfMonth(now)
      const endMonth: Date = endOfMonth(now)
      setStart?.(startMonth)
      setEnd?.(endMonth)
    }
  }, [selectedReport])
  return (
    <div className="bg-transparent mx-6">
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-white my-2">
        <div className="space-y-2 h-auto">
          <Label htmlFor="date-filter" className="text-[18px]">ວັນທີເດືອນປີ</Label>
          {selectedReport === "daily" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button id="date-filter" variant="outline" className="w-full justify-start text-left font-normal h-9">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {start ? formatDate({ date: start }) : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={start}
                  onSelect={(day) => {
                    if (!day) {
                      return;
                    }
                    const now = new Date();
                    const withTime = new Date(day);
                    withTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
                    setStart?.(withTime);
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
                    {start ? formatDate({ date: start }) : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={start}
                    onSelect={(day) => {
                      if (!day) {
                        return;
                      }
                      setStart?.(day);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button id="end-date" variant="outline" className="w-full justify-start text-left font-normal h-9">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {end ? formatDate({ date: end }) : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={end}
                    onSelect={(day) => {
                      if (!day) {
                        return;
                      }
                      setEnd?.(day);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="date-filter" className="text-[18px]">ຫ້ອງການ</Label>
          <MultiSelectCombobox
            options={officeOptions}
            value={selectedOfficeId}
            onChange={setSelectedOfficeId}
            placeholder="ເລືອກຫ້ອງການ..."
          />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="nationality-filter" className="text-[18px]">ສັນຊາດ</Label>
              <Combobox
                options={nationalityOptions}
                value={nationality}
                onChange={setNationality}
                placeholder="ເລືອກສັນຊາດ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality-filter" className="text-[18px]">ເພດ</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-[37.78px]">
                  <SelectValue placeholder="ເລືອກເພດ" />
                </SelectTrigger>
                <SelectContent>
                  {extendedGenderOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      <div className="flex items-center">
                        {opt.icon && <opt.icon className="mr-2 h-4 w-4" />}
                        <span className="whitespace-nowrap">{opt.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}