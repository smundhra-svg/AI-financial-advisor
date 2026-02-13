import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/components/ui/alert-dialog"
import { Button } from "@components/components/ui/button"
import { useNavigate } from "react-router";

interface AlertProps{
    handleBulkConfirm: ()=> Promise<void>;
}

export function AlertModal({handleBulkConfirm}:AlertProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        handleBulkConfirm();
        navigate("/generate");
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="secondary" className="hover:scale-105 transition-transform cursor-pointer">Confirm Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Changes saved cannot be reverted back.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
