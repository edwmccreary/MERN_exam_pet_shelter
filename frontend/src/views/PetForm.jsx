import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, Link } from "react-router-dom";

export default (props)=>{

    const history = useHistory();
    const {_id} = useParams();

    const [pet,setPet] = useState({
        name: "",
        type: "",
        description: "",
        skill_1: "",
        skill_2: "",
        skill_3: "",
        likes: 0
    })

    const [errors,setErrors] = useState({});

    const [duplicate,setDuplicate] = useState(false);
    const [originalName,setOriginalName] = useState("");//used for checking duplicates on update, if not original name check for dup, if original don't check

    useEffect(()=>{
        if(props.edit){
            axios.get(`http://localhost:8000/api/pets/find/${_id}`)
            .then(res=>{
                setPet(res.data.results);
                setOriginalName(res.data.results.name);
                console.log(res.data.results);
            })
        }
    },[])

    const OnSubmitHandler = (e) => {
        //e.preventDefault();
        
        if(props.edit){
            axios.patch(`http://localhost:8000/api/pets/update/${_id}`,pet)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log("error data below:")
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
        }
        else{
            axios.post("http://localhost:8000/api/pets/create",pet)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log("error data below:")
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })

        }
    }

    const OnChangeHandler = (e) => {
        const {name, value} = e.target;
        setPet(pet => ({
            ...pet,
            [name]: value
        }));
    };

    const CheckDuplicateName = (e) =>{
        e.preventDefault();
        setDuplicate(false);
        setErrors({});
        let event = e;
        if(!pet.name || pet.name == originalName){
            OnSubmitHandler(event);
        }
        else{
            axios.get(`http://localhost:8000/api/pets/name/${pet.name}`)
            .then(res=>{
                console.log("checking duplicate: "+pet.name);
                console.log(res.data.results.length);
                if(res.data.results.length == 0){
                    setDuplicate(false);
                    OnSubmitHandler(e);
                }
                else{
                    setDuplicate(true);
                }
            })
            .catch(err=>{
                
            })
        }
    }

    return(
        <div >
            <h1>Pet Shelter</h1>
            <Link to={"/"}>Back to home</Link>
            <div className='w-auto mt-3 mb-auto p-3 border border-2 rounded'>
                <h3>{props.edit ? `Edit ${pet.name}` : "Know a pet needing a home?"}</h3>
                <form onSubmit={CheckDuplicateName}>
                    <div className='d-inline-flex'>
                        <div>
                            <div className='mb-3'>
                                <label htmlFor="name" className='form-label'>Pet Name:</label>
                                <input type="text" name="name" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.name}/>
                                <p>{errors.name && errors.name.message}</p>
                                <p>{duplicate && "This pet name is already taken"}</p>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="type" className='form-label'>Pet Type:</label>
                                <input type="text" name="type" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.type}/>
                                <p>{errors.type && errors.type.message}</p>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="description" className='form-label'>Pet Description:</label>
                                <input type="text" name="description" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.description}/>
                                <p>{errors.description && errors.description.message}</p>
                            </div>
                        </div>
                        <div>
                            <p>Skills &#40;optional&#41;:</p>
                            <div className='mb-3'>
                                <label htmlFor="skill_1" className='form-label'>Skill 1:</label>
                                <input type="text" name="skill_1" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.skill_1}/>
                                <p>{errors.skill_1 && errors.skill_1.message}</p>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="skill_2" className='form-label'>Skill 2:</label>
                                <input type="text" name="skill_2" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.skill_2}/>
                                <p>{errors.skill_2 && errors.skill_2.message}</p>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="skill_3" className='form-label'>Skill 3:</label>
                                <input type="text" name="skill_3" className='form-control' onChange={OnChangeHandler} value={props.edit && pet.skill_3}/>
                                <p>{errors.skill_3 && errors.skill_3.message}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <button type='submit' className='btn btn-primary'>{props.edit ? "Edit Pet" : "Add Pet"}</button>
                </form>
                
            </div>
        </div>
    )
}