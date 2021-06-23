import React from 'react'
import { useParams } from 'react-router';
import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/Util/Validators';
import  './UpdatePlace';
//for editing the places updating title or description of a place
const DUMMY_PLACES = [{

    id: "p1",
    title: "empire state building",
    description: "best skyscraper",
    imageUrl: "https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {

        /*lat:40.7484405,
        lng:-73.9862116,*/
        lat: 28.7041,
        lng: 77.1025,
    },
    creator: "u1"



},

{

    id: "p2",
    title: "empire state building",
    description: "best skyscraper",
    imageUrl: "https://mma.prnewswire.com/media/1500294/Empire_State_Building_90th_Anniversary.jpg?w=950",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {

        lat: 40.7484405,
        lng: -73.9862116,
    },
    creator: "u2"



}
];
const UpdatePlace = () => {

    const PlaceId = useParams().placeId;
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === PlaceId)
    if (!identifiedPlace) {
        return (

            <div className="center">
                <h2>Could Not Find Place!!!</h2>
            </div>


        );
    };
    return <form className="place-form">

        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please Enter A Valid Title" onInput={() => { }} value={identifiedPlace.title} valid={true}></Input>
        <Input id="description" element="textarea" label="description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please Enter A Valid description" onInput={() => { }} value={identifiedPlace.description} valid={true}></Input>

        <Button type="submit" disabled={true}>Update Place</Button>
    </form>

};

export default UpdatePlace;