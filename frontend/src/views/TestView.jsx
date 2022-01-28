import React, {useEffect, useState } from 'react';
import axios from 'axios';

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
            {
                testList.map((pet, i)=>{
                    return (
                        <div key={i}>
                            <p>{pet.name}</p>
                            <p>{pet.type}</p>
                            <p>{pet.description}</p>
                            <p>{pet.skill_1}</p>
                            <p>{pet.skill_2}</p>
                            <p>{pet.skill_3}</p>
                            <p>{pet.likes}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}