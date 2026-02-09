import React from "react";
import { MemberItemBtnProps } from "../../types";
import { UserMinus, UserPlus } from "lucide-react";
import { useAppDispatch } from "@/app/redux/store";
import {
  AddToSelectedMembers,
  RemoveFormselectedMembers,
} from "@/app/redux/TeamMembers/TeamMembersSlice";

const MemberItemBtn = ({ isASelectedMember,MemberData }: MemberItemBtnProps) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={`p-2 rounded-md transition-colors border ${
        isASelectedMember
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" // Remove style
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900" // Add style
      }`}
      onClick={() => {
        if (isASelectedMember) dispatch(RemoveFormselectedMembers(MemberData));
        else dispatch(AddToSelectedMembers(MemberData));
      }}
    >
      {isASelectedMember ? (
        <UserMinus className="h-4 w-4" />
      ) : (
        <UserPlus className="h-4 w-4" />
      )}
    </button>
  );
};

export default MemberItemBtn;
