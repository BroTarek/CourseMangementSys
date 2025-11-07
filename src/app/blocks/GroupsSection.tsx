"use client";
import { useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

type Group = {
  residence: string;
  studentsNo: string;
};

export function GroupSection() {
  const Groups: Group[] = [
    { residence: "October", studentsNo: "21" },
    { residence: "Maadi", studentsNo: "12" },
    { residence: "Tagamooa", studentsNo: "4" },
    { residence: "Mohandeseen", studentsNo: "9" },
    { residence: "Maadi", studentsNo: "12" },
    { residence: "Tagamooa", studentsNo: "4" },
    { residence: "Mohandeseen", studentsNo: "9" },
    { residence: "Maadi", studentsNo: "12" },
    { residence: "Tagamooa", studentsNo: "4" },
    { residence: "Mohandeseen", studentsNo: "9" },
    { residence: "Maadi", studentsNo: "12" },
    { residence: "Tagamooa", studentsNo: "4" },
    { residence: "Mohandeseen", studentsNo: "9" },
    { residence: "Maadi", studentsNo: "12" },
    { residence: "Tagamooa", studentsNo: "4" },
    { residence: "Mohandeseen", studentsNo: "9" },
  ];

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (name: Group["residence"]) => {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col gap-4">
      {Groups.map((group, i) => (
        <label
  key={i}
  className={`cursor-pointer w-full block transition-all ${
    checked[group.residence] ? "w-full" : ""
  }`}
>
  <input
    type="checkbox"
    checked={checked[group.residence] || false}
    onChange={() => toggle(group.residence)}
    className="mr-2 hidden"
  />
  <Item
    variant="muted"
    className={`block w-full transition-colors ${
      checked[group.residence] ? "bg-foreground text-background" : ""
    }`}
  >
    <ItemContent>
      <ItemTitle>{group.residence}</ItemTitle>
      <ItemDescription>{group.studentsNo} students</ItemDescription>
    </ItemContent>
  </Item>
</label>

      ))}
    </div>
  );
}
