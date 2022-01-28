import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from "react-router-dom";

export default ()=>{

    const {_id} = useParams();
    const history = useHistory();

    const [pet,setPet] = useState({
        name: "",
        type: "",
        description: "",
        skill_1: "",
        skill_2: "",
        skill_3: "",
        likes: 0
    })

    const [liked,setLiked] = useState(false);

    useEffect(()=>{
        //console.log("the id is: "+_id);
        axios.get(`http://localhost:8000/api/pets/find/${_id}`)
        .then(res=>{
            setPet(res.data.results);
            console.log(res.data.results);
        })
    },[])

    const OnAdopthandler = (id) => {
        axios.delete(`http://localhost:8000/api/pets/delete/${_id}`)
        .then(res=>{
            console.log(res);
            history.push("/");
        }
        )
        .catch(err=>console.log(err));
    }

    const likeHandler = () => {
        if(!liked){
            let temp = pet;
            temp.likes += 1;
            axios.patch(`http://localhost:8000/api/pets/update/${_id}`,temp)
            .then(res=>{
                console.log(res);
                setPet(temp);
                setLiked(true);
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <div>
            <h1>Pet Shelter</h1>
            <Link to={"/"}>Back to home</Link>
            <h1>Details about {pet.name}</h1>
            <button className='btn btn-danger' onClick={OnAdopthandler}>Adopt {pet.name}</button>
            <div className='position-relative mx-auto w-25 m-3 p-3 border border-2 rounded'>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <td>Pet Type:</td>
                            <td>{pet.type}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{pet.description}</td>
                        </tr>
                        <tr>
                            <td>Skills:</td>
                            <td>
                                <p>{pet.skill_1}</p>
                                <p>{pet.skill_2}</p>
                                <p>{pet.skill_3}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className='btn btn-primary' onClick={likeHandler}>Like {pet.name}</button>
                <p>{pet.likes} likes</p>
            </div>
        </div>
    )
}