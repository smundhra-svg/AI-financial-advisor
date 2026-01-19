"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart"
import { DashBoardData } from "DTO/dashboard.dto"
import { useNavigate } from "react-router"
import Insights from "./Insights"

export interface CategoryWiseChartProps{
    data: DashBoardData
}
export const description = "A mixed bar chart"

export function formattedDateToMonth(dateString:string){
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-GB",{
        day: "numeric",
        month: "long",
        year:"numeric"
    });
    return formatter.format(date);
}


export function CategoryWiseChart({data}: CategoryWiseChartProps) {
    const navigate = useNavigate()
  const { categories, summary } = data
  const chartData = Object.entries(summary.categories as Record<string, number>).map(
    ([category, amount]) => ({
      category,
      amount
    })
  )
const categoryKeys = Object.keys(summary.categories);
const categoryConfigs = categoryKeys.reduce((acc, category) => {
  acc[category] = {
    label: category,
    color: `var(--chart-3)`
  }
  return acc
}, {} as ChartConfig)

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-3)"
  },
  ...categoryConfigs,
} satisfies ChartConfig

const startingMonth = formattedDateToMonth(categories[0].txnDate);
const endingMonth = formattedDateToMonth(categories[categories.length - 1].txnDate);
const year = new Date(categories[0].txnDate).getFullYear();

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
        <CardDescription>{startingMonth} - {endingMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              className="text-l"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" layout="vertical" radius={5} fill="var(--chart-1)" barSize={20}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Net Savings : {summary.netSavings.toFixed(2)}<TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing expense breakdown for the last 3 months
        </div>
      </CardFooter>
    </Card>
    <div className="text-white">
        <Insights data={data}/>
    </div>
    </>
  )
}
