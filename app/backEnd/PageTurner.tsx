"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export default function PageTurn(){

    const router = useRouter()
    const pathname = usePathname()

    const searchParams = useSearchParams()
    const page = Number(searchParams.get("p") ?? "1")

    function changePage(value: number){
        if(page === 1 && value === -1) {return}

        const params = new URLSearchParams(searchParams.toString())
        params.set("p", String(page + value))
        router.push(`${pathname}?${params.toString()}`)
    }

    return( 
        <>
        <div className="flex justify-between p-8 w-full">

            <button type = "button" className="text-amber-500" onClick={() => changePage(-1)}>
                Previous Page
            </button>
            <button type = "button" className="text-blue-500" onClick={() => changePage(1)}>
                Next Page
            </button>
        </div>
        </>
        
    )
}