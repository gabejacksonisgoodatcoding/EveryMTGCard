"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Search(){
    const pathname = usePathname()
    const router = useRouter()
    const params = new URLSearchParams()
    
    function SearchSubmit(request){
        const search = request.get("search")

        params.set("s", search)
        router.push(`${pathname}?${params.toString()}`)
    }

    return(
        <div>
            <form action={SearchSubmit}>
            <label>
                <input name = "search" type="search" placeholder="search" className="justify-center p-4"></input>
            </label>            
            </form>

        </div>

    )

}