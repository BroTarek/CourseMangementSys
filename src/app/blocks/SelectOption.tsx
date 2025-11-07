import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectOption() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Search </SelectLabel>
          <SelectItem value="apple">groups</SelectItem>
          <SelectItem value="banana">students</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
