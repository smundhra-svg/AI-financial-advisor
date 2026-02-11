import { Button } from "@components/components/ui/button"
import { Input } from "@components/components/ui/input"
import { Label } from "@components/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/components/ui/sheet"
import { Dispatch, SetStateAction } from 'react';

interface NewCategoryProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: string) => void;
  newCategory: string;
  setNewCategory: Dispatch<SetStateAction<string>>;
}

export function NewCategory({ newCategory, setNewCategory, open, onClose, onSave }: NewCategoryProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Category</SheetTitle>
          <SheetDescription>
            Make changes to your List of categories here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Category Name</Label>
            <Input id="sheet-demo-name" defaultValue="..." value={newCategory} onChange={(e)=> setNewCategory(e.target.value)}/>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={() => {
            if(!newCategory.trim()) return;
            onSave(newCategory);
          }}>
            Save changes
            </Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
