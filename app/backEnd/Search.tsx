"use client"
import {usePathname, useRouter, useSearchParams } from "next/navigation"
import {useState, useEffect} from 'react'


export default function Search(){
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();

    const [searchToggle, setSearchToggle] = useState(false)



    
    function SearchSubmit(e: any){
        e.preventDefault();
        const form = e.target;
        const request = new FormData(form);
        const params = new URLSearchParams(searchParams.toString())
        const search = request.get("search")
        const creature_type = request.get("creature")

        params.set("t", String(creature_type))
        params.set("s", String(search))
        params.set("a", searchToggle.toString())
        router.push(`${pathname}?${params.toString()}`)
    }

    function changeColor(color: string, checked: boolean) {
        const Myparams = new URLSearchParams(searchParams.toString())

        let colors = Myparams.get("c") ?? "";

        if (checked) {
            if (!colors.includes(color)) {
                colors += color;
            }
        } else {
            colors = colors.replace(color, "");
        }

        Myparams.set("c", colors);

        router.push(`${pathname}?${Myparams.toString()}`);
    }

    // const handleBlur = (event: React.FocusEvent<HTMLDivElement>)=>{
    //     if (!event.currentTarget.contains(event.relatedTarget as Node)){
    //         console.log("unFocus")
    //         setSearchToggle(false)
    //     }
    // }

    return(
        <div tabIndex ={0} className="p-4 w-full justify-center flex flex-row">
            <form onSubmit={SearchSubmit}>
            <label >
                <input name = "search" type="search" placeholder="search" className="justify-center focus:outline-none"></input>
            </label>
            <button className = "border border-red-500" type="button" onClick={() => setSearchToggle(!searchToggle)}>Toggle Advanced Search</button>

            <br></br>

            {searchToggle && <span className="grid grid-rows-4 grid-cols-1 gap-1 pb-3">
            <label>
                <input  onChange = {(e) => changeColor("g", e.target.checked)} checked = {searchParams.get("c")?.includes("g") || false} id= "g" type="checkbox" name="g" />
                green
            </label>
            <label>
                <input onChange = {(e) => changeColor("u", e.target.checked)} checked = {searchParams.get("c")?.includes("u") || false} id= "u" type="checkbox" name="u" />
                blue
            </label>
            <label>
                <input onChange = {(e) => changeColor("r", e.target.checked)} checked = {searchParams.get("c")?.includes("r") || false} id= "r" type="checkbox" name="r" />
                red
            </label>
            <label>
                <input onChange = {(e) => changeColor("b", e.target.checked)} checked = {searchParams.get("c")?.includes("b") || false} id= "b" type="checkbox" name="b" />
                black
            </label>
            <label>
                <input  onChange = {(e) => changeColor("w", e.target.checked)} checked = {searchParams.get("c")?.includes("w") || false} id= "w" type="checkbox" name="w" />
                white
            </label>    
                <input name = "creature" type="search" placeholder="Creature Type?" className="justify-center focus:outline-none"></input>
            </span>}

            <button className = "border-4 border-green-500 text-green-400" type="submit">Submit</button>
            </form>
        </div>

    )

}