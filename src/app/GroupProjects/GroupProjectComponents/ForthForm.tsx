import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

const ForthForm = () => {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="ResourceAllocation">Resource Allocation</Label>
        <Input id="ResourceAllocation" type="text" placeholder="" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="TotalBudget">Project Describtion</Label>
        <Input
          id="TotalBudget"
          type="number"
          placeholder="Project Describtion"
        />
      </div>
           <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            {Items.map((item, i) => (
              <div key={i}>
                {SelectItems({ icon: item.icon, value: item.value })}
              </div>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default ForthForm;
