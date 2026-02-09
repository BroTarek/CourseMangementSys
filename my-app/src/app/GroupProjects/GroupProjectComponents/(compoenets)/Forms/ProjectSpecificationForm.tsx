import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

const ProjectSpecificationForm = () => {
  const { register, control } = useFormContext();

  return (
    <>
      <div style={{ display: "grid", padding: ".5rem" }}>

        <div style={{ display: "flex", gap: ".5rem" }}>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="TotalMarksAssigned">Total Marks Assigned</Label>
            <Input {...register("totalMarks", { valueAsNumber: true })} id="TotalMarksAssigned" type="number" placeholder="" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="FollowUp">Follow Up Period</Label>
            <Controller
              name="followUpPeriod"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a follow up period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Follow up</SelectLabel>

                      {['Hourly', 'Daily', 'Weekly', 'Monthly'].map((period, i) => (
                        <SelectItem value={period} key={i} >
                          {period}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="References for project">Project Reference</Label>
          <Controller
            name="projectReferences"
            control={control}
            render={({ field }) => (
              <Textarea {...field} id="References for project" placeholder="enter references for project" />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectSpecificationForm;
