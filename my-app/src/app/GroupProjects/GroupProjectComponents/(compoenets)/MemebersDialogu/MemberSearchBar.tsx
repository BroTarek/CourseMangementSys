import { useAppDispatch } from '@/app/redux/store'
import { setMemberSearchKeyword } from '@/app/redux/TeamMembers/TeamMembersSlice'
import { Input } from '@/components/ui/input'


const MemberSearchBar = () => {
  const dispatch=useAppDispatch()
  return (
    <Input onChange={(e)=>{
      dispatch(setMemberSearchKeyword(e.target.value.toLowerCase()))
    }}/>
  )
}

export default MemberSearchBar