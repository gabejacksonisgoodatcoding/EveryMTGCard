"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {useState} from 'react'

export default function Search(){
    const pathname = usePathname()
    const router = useRouter()
    const params = new URLSearchParams()

    const [searchToggle, setSearchToggle] = useState(false)

    
    function SearchSubmit(request: FormData){


        const colors = ["g", "u", "r", "b", "w"]

        var colors_checked = ""

        const search = request.get("search")

        for (let color in colors){
            const checked = request.get(colors[color])
            if(checked == "on"){
                colors_checked += colors[color]
            }
        }

        params.set("c", colors_checked)
        params.set("s", String(search))
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>)=>{
        if (!event.currentTarget.contains(event.relatedTarget as Node)){
            console.log("unFocus")
            setSearchToggle(false)
        }
    }

    return(
        <div tabIndex ={0} className="p-4 w-full justify-center flex flex-row">
            <form action={SearchSubmit}>
            <label>
                <input  name = "search" type="search" placeholder="search" className="justify-center"></input>
            </label>
            <button onClick={() => setSearchToggle(!searchToggle)}>Toggle</button>

            <br></br>

            <span className="grid grid-rows-4 grid-cols-1">
            <label>
                <input id= "g" type="checkbox" name="g" />
                green
            </label>
            <label>
                <input id= "u" type="checkbox" name="u" />
                blue
            </label>
            <label>
                <input id= "r" type="checkbox" name="r" />
                red
            </label>
            <label>
                <input id= "b" type="checkbox" name="b" />
                black
            </label>
            <label>
                <input id= "w" type="checkbox" name="w" />
                white
            </label>    
            </span>
            <button className = "border-4 border-green-500 text-green-400" type="submit">Submit</button>
            </form>
        </div>

    )

}