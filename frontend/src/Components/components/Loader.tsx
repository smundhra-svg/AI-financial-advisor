import { Button } from "@components/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@components/components/ui/empty"
import { Spinner } from "@components/components/ui/spinner"
import { useNavigate } from "react-router"

export function Loader() {
  const navigate = useNavigate();
  return (
    <Empty className="bg-accent-foreground w-screen h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle className="text-amber-50">Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
