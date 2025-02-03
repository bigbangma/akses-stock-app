"use client"
import { Badge } from "@/components/ui/badge"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import PointOfSaleCard, { POS } from "@/components/PointOfSaleCard"








export default function Home() {
  const [POSs, setPOSs] = useState<POS[]>([])
  useEffect(()=>{
    fetch("/api/pos",{
      method: "GET",
    }).then((res) => res.json()).then((data) => {
      setPOSs(data.pos as POS[])
      console.log(data.pos)
    })
  },[])




  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Points of Sale</h1>

<div className="container mx-auto p-0">
<Accordion type="single"  collapsible className="" defaultValue="pending">
  <AccordionItem value="pending" >
    <AccordionTrigger>
      <div className="flex justify-between items-center gap-3">
      Pending Point of Sales <Badge>{POSs.filter((pos) =>(
        (pos?.internal_transfers?.assigned ?? 0)
        + (pos?.internal_transfers?.confirmed ?? 0)
        + (pos?.internal_transfers?.draft ?? 0)
        + (pos?.internal_transfers?.assigned ?? 0)
      )).length}</Badge>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          !POSs
          .filter((pos) =>
                        (pos?.internal_transfers?.assigned ?? 0)
                        + (pos?.internal_transfers?.confirmed ?? 0)
                        + (pos?.internal_transfers?.draft ?? 0)
                        + (pos?.internal_transfers?.assigned ?? 0)
          )
          .length ?
          <p>No pending point of sales</p>
          :
        POSs.filter((pos) => 
                        (pos?.internal_transfers?.assigned ?? 0) 
                      + (pos?.internal_transfers?.confirmed ?? 0)
                      + (pos?.internal_transfers?.draft ?? 0)
                      + (pos?.internal_transfers?.assigned ?? 0)
        ).map((pos) => (
          <PointOfSaleCard pos={pos} key={pos.id} />
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="done">
    <AccordionTrigger>
      <div className="flex justify-between items-center gap-3">
        Done Point of Sales
      <Badge>{POSs.filter(
        (pos) => (
            (pos?.internal_transfers?.assigned ?? 0) +
            (pos?.internal_transfers?.confirmed ?? 0) +
            (pos?.internal_transfers?.draft ?? 0) +
            (pos?.internal_transfers?.assigned ?? 0) 
        )  == 0
      ).length}</Badge>
      </div>
</AccordionTrigger>
    <AccordionContent>
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {
        !POSs.length ?
          <p>No done point of sales</p>
          :
        POSs
        .filter((pos) => 
          ( 
            (pos?.internal_transfers?.assigned ?? 0) +
            (pos?.internal_transfers?.confirmed ?? 0) +
            (pos?.internal_transfers?.draft ?? 0) +
            (pos?.internal_transfers?.assigned ?? 0) 
          ) == 0
        ).map((pos) => (
          <PointOfSaleCard pos={pos} key={pos.id} />
        ))
      }
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </div>

    </div>
    
  )
}

