/* eslint-disable @next/next/no-img-element */
import { MemberItemProps, Role } from "../../types";
import MemberItemBtn from "./MemberItemBtn";
import MemberItemSelect from "./MemberItemSelect";
const MemberItem = ({ MemberData, isASelectedMember }: MemberItemProps) => {
  // const UserRole=useAppSelector((state)=>state.TeamMembersReducer.members)
  return (
    <>
      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 transition-all duration-200 hover:bg-soft-blue/50">
        {/* Member Info */}
        <div className="flex items-center space-x-3 min-w-0 grow">
          {/* Avatar */}
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={MemberData.Avatar}
            alt={MemberData.Name}
          />
          {/* Name and Identity */}
          <div className="grow min-w-0">
            <p className="text-base font-semibold text-gray-800 truncate">
              {MemberData.Name}
            </p>
            <p className="text-sm text-gray-500">{MemberData.Identity}</p>
          </div>
        </div>
        {isASelectedMember ? (
          <MemberItemSelect isASelectedMember MemberData={MemberData} selectedRole={MemberData.Role } />
        ) : (
          <MemberItemSelect
            isASelectedMember={false}
            roles={
              ["Leader", "Consultant", "Designer", "Coder", "Backend"] as Role[]
            }
            MemberData={MemberData}
          />
        )}

        {/* Actions */}
        <MemberItemBtn
          isASelectedMember={isASelectedMember}
          MemberData={MemberData}
        />
      </div>
    </>
  );
};

export default MemberItem;
