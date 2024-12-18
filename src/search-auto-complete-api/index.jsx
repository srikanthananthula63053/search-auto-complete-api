import { useEffect, useState } from "react";

export default function SearchAutoCompleteApi(){
    const[user,setUser] = useState([]);
    const [loading,SetLoading]=useState(false);
    const[error,setError]=useState(null);
    useEffect(()=>
        FectchListOfuser()
        ,[])
    return(
        <div>
            <input
            name="search user"
            placeholder="search user"

            />
        </div>
    );
}