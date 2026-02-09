import { Members } from "./MemebersDialogu/data"
export type MemberItemProps={
  MemberData:typeof Members[0],
  key: number,
  isASelectedMember:boolean
}
export type MemberItemBtnProps={
    isASelectedMember:boolean
    MemberData:typeof Members[0]
}

export type Role = 'Leader' | 'Consultant' | 'Designer' | 'Coder' | 'Backend';


