import React from 'react'
import MemberSearchBar from './MemberSearchBar'
import MemberItem from './MemberItemComponent/MemberItem'
import { Search, Plus } from 'lucide-react'
import { useAppSelector } from '@/app/redux/store'
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
import { Button } from "@/components/ui/button";

const MemberSelection = () => {
  const allMembers = useAppSelector((state) => state.TeamMembersReducer.members)
  const selectedMembers = useAppSelector((state) => state.TeamMembersReducer.selectedMembers)
  const searchKeyword = useAppSelector((state) => state.TeamMembersReducer.MemberSearchKeyword)
  
  // Filter members based on search
  const filteredAllMembers = allMembers.filter(member => 
    member.Name.toLowerCase().includes(searchKeyword) ||
    member.Identity.toLowerCase().includes(searchKeyword) ||
    member.Role.toLowerCase().includes(searchKeyword)
  )
  
  const filteredSelectedMembers = selectedMembers.filter(member => 
    member.Name.toLowerCase().includes(searchKeyword) ||
    member.Identity.toLowerCase().includes(searchKeyword) ||
    member.Role.toLowerCase().includes(searchKeyword)
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select team members</DialogTitle>
          <DialogDescription>
            Add or remove existing members to this project.
          </DialogDescription>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="relative">
          <MemberSearchBar />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Members List Container */}
        <div className="space-y-6 max-h-[40vh] overflow-y-auto">
          {/* Already Added Members Section */}
          <section>
            <h2 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-3">
              Already Added Members
            </h2>
            <div className="space-y-3">
              {filteredSelectedMembers.length > 0 ? (
                filteredSelectedMembers.map((member,i) => (
                  <MemberItem
                    key={i}
                    MemberData={member}
                    isASelectedMember={true}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  {searchKeyword ? 'No added members match your search.' : 'No members currently added.'}
                </p>
              )}
            </div>
          </section>

          {/* All Members Section */}
          <section>
            <h2 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-3">
              All Members
            </h2>
            <div className="space-y-3">
              {filteredAllMembers.length > 0 ? (
                filteredAllMembers.map((member,i) => (
                  <MemberItem
                    key={i}
                    MemberData={member}
                    isASelectedMember={false}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  {searchKeyword ? 'No members found matching your search.' : 'No members available.'}
                </p>
              )}
            </div>
          </section>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MemberSelection