"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FirstForm = () => {
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [date2, setDate2] = useState<Date | undefined>(undefined);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const Items = [
    { icon: "😆", value: "computer science" },
    { icon: "👿", value: "chemistry" },
    { icon: "👽", value: "Operating Systems" },
    { icon: "🎃", value: "ICT" },
    { icon: "🥶", value: "accounting" },
  ];
  type ItemsType = (typeof Items)[number];

  const SelectItems = ({ icon, value }: ItemsType) => {
    return (
      <>
    <SelectItem 
      value={value} 
      className="w-full"   // full width
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap:"7px",
          width: "100%",         // full width
          padding: "0.4rem 0.6rem",
        }}
      >
        <div>{icon}</div>
        <div>{value}</div>
      </div>
    </SelectItem>
      </>
    );
  };
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="ProjectName">ProjectName</Label>
        <Input id="ProjectName" type="text" placeholder="Project name" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="ProjectDescribtion">Project Describtion</Label>
        <Input
          id="ProjectDescribtion"
          type="text"
          placeholder="Project Describtion"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          start date
        </Label>
        <Popover open={open1} onOpenChange={setOpen1}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="startDate"
              className="w-48 justify-between font-normal"
            >
              {date1 ? date1.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date1}
              onSelect={setDate1}
              className="custom-calendar rounded-lg border"
              buttonVariant="ghost"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          end date
        </Label>
        <Popover open={open2} onOpenChange={setOpen2}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="endDate"
              className="w-48 justify-between font-normal"
            >
              {date2 ? date2.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date2}
              onSelect={setDate2}
              className="custom-calendar rounded-lg border"
              buttonVariant="ghost"
            />
          </PopoverContent>
        </Popover>
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

export default FirstForm;
