
import { DashBoardData } from "DTO/dashboard.dto"
import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface InsightsData {
  data: DashBoardData
}

const Insights = ({ data }: InsightsData) => {
  const { insights } = data

  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  // Typewriter / streaming effect
  useEffect(() => {
    if (!insights) return

    if (index < insights.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + insights[index])
        setIndex((prev) => prev + 1)
      }, 6) // typing speed (adjust if needed)

      return () => clearTimeout(timeout)
    }
  }, [index, insights])

  return (
    <Card className="max-w-3xl mx-auto w-full">
      <CardHeader>
        <CardTitle>AI Financial Insights</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground font-normal">
          {displayedText || "Generating insights..."}
        </div>
      </CardContent>
    </Card>
  )
}

export default Insights
