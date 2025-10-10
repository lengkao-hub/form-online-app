/* eslint-disable no-magic-numbers */
/* eslint-disable curly */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

type Person = {
  id: number
  name: string
  nationality: string
  gender: string
  age: number
  department: string
  joinDate: string
}

interface PeopleChartsProps {
  data: Person[]
}

export function PeopleCharts({ data }: PeopleChartsProps) {
  // Prepare data for nationality chart
  const nationalityData = data.reduce(
    (acc, person) => {
      acc[person.nationality] = (acc[person.nationality] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const nationalityChartData = Object.entries(nationalityData)
    .map(([nationality, count]) => ({ nationality, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 nationalities

  // Prepare data for gender chart
  const genderData = data.reduce(
    (acc, person) => {
      acc[person.gender] = (acc[person.gender] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const genderChartData = Object.entries(genderData).map(([gender, count]) => ({
    gender,
    count,
  }))

  // Prepare data for age group chart
  const ageGroupData = data.reduce(
    (acc, person) => {
      let ageGroup = ""
      if (person.age >= 18 && person.age <= 25) ageGroup = "18-25"
      else if (person.age >= 26 && person.age <= 35) ageGroup = "26-35"
      else if (person.age >= 36 && person.age <= 45) ageGroup = "36-45"
      else if (person.age >= 46) ageGroup = "46+"

      acc[ageGroup] = (acc[ageGroup] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const ageGroupChartData = Object.entries(ageGroupData).map(([ageGroup, count]) => ({
    ageGroup,
    count,
  }))

  // Prepare data for department chart
  const departmentData = data.reduce(
    (acc, person) => {
      acc[person.department] = (acc[person.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const departmentChartData = Object.entries(departmentData).map(([department, count]) => ({
    department,
    count,
  }))

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--chart-1))",
    },
  }

  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No data available for charts</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Nationality Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Top Nationalities</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nationalityChartData}>
                <XAxis dataKey="nationality" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {genderChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Age Group Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Age Group Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroupChartData}>
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Department Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Department Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentChartData}>
                <XAxis dataKey="department" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
