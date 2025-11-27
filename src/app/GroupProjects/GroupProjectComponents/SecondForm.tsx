import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, UserMinus, UserPlus, SearchXIcon,ChevronsUpDown,Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MemberSection from '@/app/GroupProjects/GroupProjectComponents/MemberSection'
import {Members} from '@/app/GroupProjects/GroupProjectComponents//MemberSection'
import {MembersSectionProps} from '@/app/GroupProjects/GroupProjectComponents/MemberSection'
const SecondForm = () => {

  type MembersSectionProps = (typeof Members)[number];
  const [SelectedMembers, setSelectedMembers] = useState<MembersSectionProps[]>(
    []
  );
  const frameworks =SelectedMembers
  const [unSelectedMembers, setUnSelectedMembers] =
    useState<MembersSectionProps[]>(Members);
  const handleMemberRemoval = (id: string) => {
    setSelectedMembers((p) => SelectedMembers.filter((m) => m.id !== id));
    setUnSelectedMembers((p) => [
      Members.find((m) => m.id === id) as MembersSectionProps,
      ...p,
    ]);
  };
  const handleMemberAddition = (id: string) => {
    setSelectedMembers((p) => [
      ...p,
      Members.find((m) => m.id === id) as MembersSectionProps,
    ]);
    setUnSelectedMembers((p) => unSelectedMembers.filter((m) => m.id !== id));
  };
  const [searched,setSearched]=useState('')
  
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const MemberSection = ({
    Name,
    Identity,
    Avatar,
    id,
  }: MembersSectionProps) => {
    // Logic to check if selected
    const isSelected = SelectedMembers.some((m) => m.id === id);
    
    return (
      <div className="flex items-center justify-between py-3 px-2 rounded-md hover:bg-slate-50 transition-colors">
        {/* LEFT SIDE: Avatar & Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <img
            src={Avatar}
            alt={Name}
            className="h-10 w-10 rounded-full object-cover border border-slate-200"
          />

          {/* Text Info */}
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none text-slate-900">
              {Name}
            </p>
            <p className="text-sm text-slate-500 mt-1">{Identity}</p>
          </div>
        </div>

        {/* RIGHT SIDE: Buttons */}
        <div className="flex items-center gap-2">
          {/* Role Select Trigger (Visual only based on screenshot) */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-slate-700">
            {Identity}
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {/* Add/Remove Action Button */}
          <button
            onClick={() => {
              if (isSelected) {
                handleMemberRemoval(id);
              } else {
                handleMemberAddition(id);
              }
            }}
            className={`p-2 rounded-md transition-colors border ${
              isSelected
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" // Remove style
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900" // Add style
            }`}
          >
            {isSelected ? (
              <UserMinus className="h-4 w-4" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-170 overflow-hidden">
            <DialogHeader>
              <DialogTitle>Select team members</DialogTitle>
              <DialogDescription>
                Add or remove existing memebers to this project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3 flex-1">
                <SearchXIcon />

                <Input type="search" placeholder="Search for team member" onChange={
                  (e)=>{setSearched(e.target.value)}
                } />
              </div>
              <div className="grid gap-3">
                <p>Already added members</p>
                {SelectedMembers.length > 0 ? (
                  <ScrollArea className='max-h-[200px] w-full rounded-md border p-2 ' >
                    {SelectedMembers.map(
                      (member: MembersSectionProps, i: number) => (
                        <div key={i}>
                          {MemberSection({
                            Name: member.Name,
                            Identity: member.Identity,
                            Avatar: member.Avatar,
                            id: member.id,
                          })}
                        </div>
                      )
                    )}
                  </ScrollArea>
                ) :<p>no selected students yet</p>}
              </div>
              <div className="grid gap-3">
                <p>All members</p>
                <ScrollArea className="h-40 w-100 rounded-md border">
                  {unSelectedMembers.filter(m=>m.Name.includes(searched)).map(
                    (member: MembersSectionProps, i: number) => (
                      <div key={i}>
                        {MemberSection({
                          Name: member.Name,
                          Identity: member.Identity,
                          Avatar: member.Avatar,
                          id: member.id,
                        })}
                      </div>
                    )
                  )}
                </ScrollArea>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

     
         <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>
        <Plus/>
          {value
            ? frameworks.find((framework) => framework.Name === value)?.Name
            : "Add leader"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" 
          // onChangeCapture={(e)=>setSearched(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.Name}
                   onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {MemberSection({Name:framework.Name,
                    id:framework.id,
                    Avatar:framework.Avatar,
                    Identity:framework.Identity
                  })}
                  {framework.Name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.Name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
  );
};

export default SecondForm;
