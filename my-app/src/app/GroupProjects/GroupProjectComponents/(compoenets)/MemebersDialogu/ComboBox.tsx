/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { addLeader } from "@/app/redux/TeamMembers/TeamMembersSlice";
import { Members } from "./data";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const allMembers = useAppSelector(
    (state) => state.TeamMembersReducer.members
  );
  const dispatch = useAppDispatch();

  // Filter members based on search query
  const filteredMembers = allMembers.filter(
    (member) =>
      member.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.Identity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectMember = (member: typeof Members[0]) => {
    dispatch(addLeader(member));
    setSearchQuery("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-gray-50"
        >
          <span className="truncate flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Leader
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search member..."
            className="h-9 border-0 focus:ring-0"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">
              No member found
            </CommandEmpty>
            <CommandGroup>
              {filteredMembers.map((member,i) => (
                <CommandItem
                  key={i}
                  value={member.Name}
                  onSelect={() => handleSelectMember(member)}
                  className="p-0 m-1 focus:bg-transparent aria-selected:bg-transparent"
                >
                  <div className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-150 w-full aria-selected:bg-gray-50">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover border border-gray-200"
                          src={member.Avatar}
                          alt={member.Name}
                        />
                      </div>
                      {/* Name and Identity */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {member.Name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {member.Identity}
                        </p>
                      </div>
                    </div>
                    {/* Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectMember(member);
                      }}
                      className="ml-2 p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-150 hover:scale-105 shrink-0"
                      title="Add as leader"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}