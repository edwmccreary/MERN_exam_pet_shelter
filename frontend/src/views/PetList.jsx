import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default ()=> {

    const [testList,setTestList] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pets/findAll')
        .then(res=>{
            //setTestList(res.data.results)
            console.log(res.data.results);
            sortTest(res.data.results);
        })
    },[])

    const sortTest = (list) => {
        let temp = [...list];
        //A to Z
        temp?.sort((a, b) => (b.type > a.type ? -1 : 1))
        setTestList(temp);
    }

    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to={"/pets/new"}>Add a pet to the shelter</Link>
            <h2>These pets are looking for a good home</h2>
            <table className='table table-striped w-50 mx-auto border border-2 mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testList.map((pet, i)=>{
                            return (
                                <tr key={i}>
                                    <td>{pet.name}</td>
                                    <td>{pet.type}</td>
                                    <td><Link to={`/pets/view/${pet._id}`}>details</Link>|<Link to={`/pets/edit/${pet._id}`}>edit</Link></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </div>
    )
}