import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@components/components/ui/chart"
import { useDashboardData } from "@hooks/useDashboardData"
import { CategoryWiseChart } from "@components/components/CategoryWiseChart"
import { DashBoardData, Summary } from "DTO/dashboard.dto"
import Insights from "@components/components/Insights"
import { Loader } from "@components/components/Loader"
import { Button } from "@components/components/ui/button"
import { useDashboard } from "@components/components/DashboardContext"

export function DashboardData() {
    // const {data,loading,error} = useDashboardData();
    const {data,loading,error,loadDashboard} = useDashboard();
    const [showInsights,setShowInsights] = React.useState<Boolean>(false);

    React.useEffect(()=>{
            if(!data){
                loadDashboard();
        }
    },[]);

    const chartData = React.useMemo(() => {
        if (!data?.categories) return []

            const map = new Map<string,{ date: string; income: number; expense: number }>()

                for (const txn of data.categories) {
                    const date = txn.txnDate

                    if (!map.has(date)) {
                        map.set(date, {
                            date,
                            income: 0,
                            expense: 0,
                        })
                    }

                    const entry = map.get(date)!
                        if (txn.type === "income") {
                            entry.income += txn.amount
                        } else {
                            entry.expense += txn.amount
                        }
                }

            return Array.from(map.values()).sort(
                (a, b) => +new Date(a.date) - +new Date(b.date)
            )
    }, [data])

    const chartConfig = {
        amount: {
            label: "Amount",
        },
        income: {
            label: "Total Income :",
            color: "var(--chart-1)",
        },
        expense: {
            label: "Total Expense :",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("income")

    const total = React.useMemo(
        () => ({
        income: chartData.reduce((acc, curr) => acc + curr.income, 0),
        expense: chartData.reduce((acc, curr) => acc + curr.expense, 0),
        }),
        [chartData]
    )

    if(loading) return <Loader />
    if(error) return <p>Error to load Data : {error}</p>
    if(!data) return null

    return (
        <>
            <div className="w-full h-full dark bg-primary-foreground ">
                {/* Total Chart for Income and expense */}
                <div className="w-full max-w-5xl mx-auto">
                    <Card className="dark py-4 sm:py-0">
                    <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle>Financial Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing Financial Status from last 3 months
                    </CardDescription>
                    </div>
                    <div className="flex">
                    {["income", "expense"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                        <button
                            key={chart}
                            data-active={activeChart === chart}
                            className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                            onClick={() => setActiveChart(chart)}
                        >
                            <span className="text-muted-foreground text-xs">
                            {chartConfig[chart].label}
                            </span>
                            <span className="text-lg leading-none font-bold sm:text-3xl">
                            {total[key as keyof typeof total].toLocaleString()}
                            </span>
                        </button>
                        )
                    })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                    >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                        left: 12,
                        right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            })
                        }}
                        />
                        <ChartTooltip
                        content={
                            <ChartTooltipContent
                            className="w-[150px]"
                            nameKey="views"
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                })
                            }}
                            />
                        }
                        />
                        <Line
                        dataKey={activeChart}
                        type="monotone"
                        stroke={`var(--color-${activeChart})`}
                        strokeWidth={2}
                        dot={false}
                        />
                    </LineChart>
                    </ChartContainer>
                </CardContent>
                    </Card>
                </div>

                {/* Bar Chart for expenses displayed in terms of Categories */}
                <div className="flex gap-3 p-3">
                <div className="w-full max-w-3xl mx-auto">
                    <CategoryWiseChart  data={data}/>
                </div>

                <div className="w-full max-w-3xl mx-auto flex flex-col justify-center absolutea">
                    <Button
                        size={"sm"}
                        onClick={() => setShowInsights(!showInsights)}
                        className="px-6 w-40 mb-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium align-middle justify-between items-center"
                    >
                        {showInsights ? "Hide AI Insights" : "Show AI Insights"}
                    </Button>
                

                {/* Conditionally render Insights component */}
                {showInsights && <Insights data={data} />}
                </div>
                </div>
            </div>
        </>
    )
}
