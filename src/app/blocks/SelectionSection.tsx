"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SelectOption } from "./SelectOption"
import { GroupSection } from "./GroupsSection"

export function SelectionSection() {
  return (
    <Card className="w-full max-w-sm border shadow-sm">
      <CardHeader className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle>Assign to</CardTitle>
          <SelectOption />
        </div>
        <CardDescription>Choose a group and confirm selection.</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-6">
          {/* Group Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="GroupName">Group Name</Label>
            <Input id="GroupName" type="text" placeholder="October" />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm text-muted-foreground">
              Accept terms and conditions
            </Label>
          </div>

          {/* Scrollable Group List */}
          <div>
            <Label className="mb-2 block text-sm font-medium">Groups</Label>
            <ScrollArea className="h-56 rounded-md border p-2">
              <GroupSection />
            </ScrollArea>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button type="submit" className="w-full">
          Save Selection
        </Button>
      </CardFooter>
    </Card>
  )
}
