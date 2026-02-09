/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from "@/app/redux/store";
import { RemoveFormselectedMembers } from "@/app/redux/TeamMembers/TeamMembersSlice";
import React from "react";
import { Members } from "./data";

const DisplaySelectedMembers = ({person}:{person:typeof Members}) => {

    
  const dispatch=useAppDispatch()
  if (person.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No members selected yet</p>
        <p className="text-gray-400 mt-2">Add members using the form above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {person.map((MemberData, i) => (
        <div
          key={i}
          className="flex items-center p-4 rounded-xl border border-gray-200 bg-white hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:scale-[1.02] group"
        >
          {/* Avatar */}
          <div className="relative">
            <img
              className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-blue-100 transition-colors duration-300"
              src={MemberData.Avatar}
              alt={MemberData.Name}
            />
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          {/* Member Info */}
          <div className="ml-4 flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors duration-300">
              {MemberData.Name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{MemberData.Identity}</p>
            
            {/* Optional status indicator */}
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Active
              </span>
              <span className="ml-2 text-xs text-gray-500">
                {MemberData.Role}
              </span>
            </div>
          </div>
          
        
           <div onClick={()=>{
            dispatch(RemoveFormselectedMembers(MemberData))
           }}>x</div>
        </div>
      ))}
    </div>

  );
};

export default DisplaySelectedMembers;