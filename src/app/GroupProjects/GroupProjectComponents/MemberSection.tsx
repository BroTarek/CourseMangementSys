import { ChevronDown, UserMinus, UserPlus } from "lucide-react";
import React, { useState } from "react";

export const Members = [
  {
    id: "1",
    Name: "Mohamed",
    Identity: "Grade-11",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "2",
    Name: "Tarek",
    Identity: "Grade-12",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "3",
    Name: "Ali",
    Identity: "Grade-10",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "4",
    Name: "Emad",
    Identity: "Grade-12",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "5",
    Name: "Ramadan",
    Identity: "Grade-11",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "6",
    Name: "Khaled",
    Identity: "Grade-10",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "7",
    Name: "Omar",
    Identity: "Grade-12",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "8",
    Name: "Joo",
    Identity: "Grade-11",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "9",
    Name: "Ziad",
    Identity: "Grade-12",
    Avatar: "Screenshot (10).png",
  },
  {
    id: "10",
    Name: "Khaled",
    Identity: "Grade-10",
    Avatar: "Screenshot (10).png",
  },
];
export type MembersSectionProps = (typeof Members)[number];
const MemberSection = ({ Name, Identity, Avatar, id }: MembersSectionProps) => {
  // Logic to check if selected
  const [SelectedMembers, setSelectedMembers] = useState<MembersSectionProps[]>(
    []
  );
  
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

export default MemberSection;
