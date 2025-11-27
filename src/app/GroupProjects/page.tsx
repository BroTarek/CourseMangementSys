"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FirstForm from '@/app/GroupProjects/GroupProjectComponents/FisrtForm'
import SecondForm from '@/app/GroupProjects/GroupProjectComponents/SecondForm'
import ThirdForm from "./GroupProjectComponents/ThirdForm";
const Page = () => {
  
  return (
    <>
     {/* <FirstForm/> */}
     {/* <SecondForm/> */}
     <ThirdForm/>
    </>
  );
};

export default Page;
