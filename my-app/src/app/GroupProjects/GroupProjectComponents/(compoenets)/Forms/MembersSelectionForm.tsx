"use client";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useAppSelector } from "../../../../redux/store";
import { ComboboxDemo } from "../MemebersDialogu/ComboBox";

import { X } from "lucide-react";
import { useAppDispatch } from "../../../../redux/store";
import { RemoveFormselectedMembers, RemoveLeader } from "../../../../redux/TeamMembers/TeamMembersSlice";
import MemberSelection from "../MemebersDialogu/MemberSelection";

const Page = () => {
  const { setValue } = useFormContext();
  const SelectedMembers = useAppSelector(
    (state) => state.TeamMembersReducer.selectedMembers
  );
  const SelectedLeaders = useAppSelector(
    (state) => state.TeamMembersReducer.Leaders
  );
  const dispatch = useAppDispatch();

  // Sync members and leaders with React Hook Form
  useEffect(() => {
    setValue("members", SelectedMembers);
  }, [SelectedMembers, setValue]);

  useEffect(() => {
    setValue("leaders", SelectedLeaders);
  }, [SelectedLeaders, setValue]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Assign team members and define their roles
        </h2>
        <p className="text-gray-600 text-sm">
          Add team members and assign roles to ensure everyone knows their responsibilities.
          You can also invite external collaborators if needed.
        </p>
      </div>

      {/* Team Members Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Team Members</h3>

        {/* Selected Members Display */}
        <div className="flex flex-wrap gap-3 mb-4">
          {SelectedMembers.map((member, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {member.Name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.Name}</p>
                  <p className="text-xs text-gray-500">{member.Role}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(RemoveFormselectedMembers(member))}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Member Button */}
        <MemberSelection />
      </div>

      {/* Team Leader Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Team Leader</h3>
        <p className="text-sm text-gray-500 mb-4">Please choose a leader for the team</p>

        {/* Selected Leader Display */}
        {SelectedLeaders.length > 0 && (
          <div className="mb-4">
            {SelectedLeaders.map((leader, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 mb-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {leader.Name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{leader.Name}</p>
                    <p className="text-xs text-gray-500">{leader.Role}</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(RemoveLeader(leader))}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Leader Button */}
        <ComboboxDemo />
      </div>
    </div>
  );
};

export default Page;