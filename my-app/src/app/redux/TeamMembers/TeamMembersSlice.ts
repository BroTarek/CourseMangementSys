import { Members } from "@/app/GroupProjects/GroupProjectComponents/(compoenets)/MemebersDialogu/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialStateProps = {
    members: typeof Members,
    selectedMembers: typeof Members
    notSelectedMembers: typeof Members
    MemberSearchKeyword: string
    Leaders: typeof Members
}
const initialState: InitialStateProps = {
    members: Members.map((m) => m),
    selectedMembers: [],
    notSelectedMembers: [],
    MemberSearchKeyword: '',
    Leaders: []
}
const TeamMemberSlice = createSlice({
    initialState,
    name: "TeamMemberSlice",
    reducers: {
        AddToSelectedMembers: (state, action: PayloadAction<typeof Members[0]>) => {
            state.selectedMembers.push(action.payload)
            state.members = state.members.filter((Member) => Member.id !== action.payload.id)
        },
        RemoveFormselectedMembers: (state, action: PayloadAction<typeof Members[0]>) => {
            state.selectedMembers = state.selectedMembers.filter((selectedMember) => selectedMember.id !== action.payload.id)
            state.members.push(action.payload)
        },
        setMemberSearchKeyword: (state, action: PayloadAction<string>) => {
            state.MemberSearchKeyword = action.payload.toLowerCase()
        },
        setSpecificMemberRole: (state, action: PayloadAction<{ member: typeof Members[0], role: string }>) => {
            state.members = state.members.map((m) => {
                console.log(action.payload.member)
                console.log(9)
                if (m.id === action.payload.member.id)
                    return { ...m, Role: action.payload.role }
                else
                    return m
            })

        },
        addLeader: (state, action: PayloadAction<typeof Members[0]>) => {
            state.Leaders.push(action.payload)
        },
        RemoveLeader: (state, action: PayloadAction<typeof Members[0]>) => {
            state.Leaders = state.Leaders.filter((leader) => leader.id !== action.payload.id)
        }
    }
})


export const { AddToSelectedMembers, RemoveFormselectedMembers, addLeader, RemoveLeader, setMemberSearchKeyword, setSpecificMemberRole } = TeamMemberSlice.actions
export default TeamMemberSlice.reducer