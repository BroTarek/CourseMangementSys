import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Members } from "../data";
import { useAppDispatch } from "@/app/redux/store";
import { setSpecificMemberRole } from "@/app/redux/TeamMembers/TeamMembersSlice";

type Role = 'Leader' | 'Consultant' | 'Designer' | 'Coder' | 'Backend';

// Updated type definition - selectedRole should be Role type
type MemberItemSelectProps = 
  | {
      isASelectedMember: true;
      selectedRole: string; // Changed from string to Role
      roles?: never;
      MemberData: typeof Members[0];
    }
  | {
      isASelectedMember: false;
      roles: Role[];
      selectedRole?: never;
      MemberData: typeof Members[0];
    };

const MemberItemSelect = ({
  isASelectedMember,
  roles,
  selectedRole,
  MemberData
}: MemberItemSelectProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(MemberData.Role || "");

  if (isASelectedMember) {
    return <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md">{selectedRole}</button>;
  } else {
    return (
      <Select
        value={value}
        onValueChange={(selectedRole: Role) => {
          setValue(selectedRole);
          dispatch(setSpecificMemberRole({
            member: MemberData,
            role: selectedRole
          }));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role, i) => (
            <SelectItem value={role} key={i}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
};

export default MemberItemSelect;