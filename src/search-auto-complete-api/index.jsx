import { useEffect, useState } from "react";
import Suggesstions from "./suggesstions";


export default function SearchAutocomplete() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [filterUser, setFilterUser] = useState([])

    function handleonchange(event) {
        const query = event.target.value.toLowerCase();
        setSearchParam(query);
        if (query.length > 1) {
            const filteredData = users && users.length ? users.filter((item) =>
                item.toLowerCase().indexOf(query) > -1) : [];
            setFilterUser(filteredData);
            setShowDropDown(true)

        } else {
            setShowDropDown(false)
        }
    }
    function handleClick(event){
        console.log(event.target.innerText)
        setShowDropDown(false)
        setSearchParam(event.target.innerText)
        setFilterUser([])
    }

    async function fetchListOfUsers() {
        try {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/users");
            const data = await response.json();

            if (data && data.users && data.users.length) {
                setUsers(data.users.map((userItem) => userItem.firstName));
                setLoading(false);
                setError(null);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(error);
        }
    }


    useEffect(() => {
        fetchListOfUsers();
    }, []);

    console.log(users, filterUser);

    return (
        <div className="search-autocomplete-container">
            {loading ? (
                <h1>Loading Data ! Please wait</h1>
            ) : (
                <input
                    name="search-users"
                    placeholder="Search Users here..."
                    value={searchParam}
                    onChange={handleonchange}
                />
            )}
            {
                showDropDown && <Suggesstions data={filterUser} handleClick={handleClick} />
            }


        </div>
    );
}