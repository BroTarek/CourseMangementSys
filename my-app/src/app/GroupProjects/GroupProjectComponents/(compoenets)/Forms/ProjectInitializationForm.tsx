"use client";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
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

const ProjectInitializationForm = () => {
  const { register, control } = useFormContext();
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
              gap: "7px",
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
        <Label htmlFor="ProjectName">Project Name</Label>
        <Input {...register("projectName")} id="ProjectName" type="text" placeholder="Project name" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="ProjectDescription">Project Description</Label>
        <Input
          {...register("projectDescription")}
          id="ProjectDescription"
          type="text"
          placeholder="Project Description"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          Start Date
        </Label>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Popover open={open1} onOpenChange={setOpen1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="startDate"
                  className="w-48 justify-between font-normal"
                >
                  {field.value ? field.value.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="custom-calendar rounded-lg border"
                  buttonVariant="ghost"
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="date" className="px-1">
          End Date
        </Label>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="endDate"
                  className="w-48 justify-between font-normal"
                >
                  {field.value ? field.value.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  className="custom-calendar rounded-lg border"
                  buttonVariant="ghost"
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <Controller
        name="department"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departments</SelectLabel>
                {Items.map((item, i) => (
                  <div key={i}>
                    {SelectItems({ icon: item.icon, value: item.value })}
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </>
  );
};

export default ProjectInitializationForm;
