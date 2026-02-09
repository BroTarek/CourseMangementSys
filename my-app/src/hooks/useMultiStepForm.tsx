'use client'
import {ReactElement, useState } from 'react'

const useMultiStepForm = (forms:ReactElement[]) => {

  const [currentFormIndex,setCurrentFormIndex]=useState(0)
  const next=()=>currentFormIndex >= forms.length-1?
  setCurrentFormIndex(0):setCurrentFormIndex(p=>p+1)
  const prev=()=>currentFormIndex <=0?
  setCurrentFormIndex(forms.length-1):setCurrentFormIndex(p=>p-1)

  return{
    Next:next,
    Previous:prev,
    currentForm:forms[currentFormIndex],
    CurrentIndex:currentFormIndex,
    totalSteps:forms.length
  }
}

export default useMultiStepForm