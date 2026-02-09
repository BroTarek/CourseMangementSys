'use client'
import MemberItem from './MemberItemComponent/MemberItem'
import { useAppSelector } from '@/app/redux/store'
const MembersSection = () => {
  const SelelctedMembers=useAppSelector((state)=>state.TeamMembersReducer.selectedMembers)
  const Members=useAppSelector((state)=>state.TeamMembersReducer.members)
  const searchWord=useAppSelector((state)=>state.TeamMembersReducer.MemberSearchKeyword)
  console.log(SelelctedMembers)
  return (
    <div style={{width:"300px"}}>
       {/* selected members Section*/}
       {SelelctedMembers.map((memberData,i)=>(<MemberItem isASelectedMember MemberData={memberData} key={i}/>))}
       {/* unselected members Section*/}
       <div style={{height:"1rem",width:"5rem",background:"red"}}></div>
       {Members.filter((member)=>member.Name.includes(searchWord)).map((memberData,i)=>(<MemberItem isASelectedMember={false} MemberData={memberData} key={i}/>))}
    
    </div>
  )
}

export default MembersSection