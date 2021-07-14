import { PROPERTY_TYPES } from '@babel/types';
import React,{useRef,useState,useEffect} from 'react'
import'./ImageUpload.css'
import Button from './Button';




const ImageUpload=(props) => {
    
    const [file,setfile]=useState();
    const [previewUrl,setpreviewUrl]=useState();
    const [isValid,setisValid]=useState(false);
    const filePickerRef=useRef();

    useEffect(()=>{
   
        if(!file)
        {
            return;
        }
        const fileReader= new FileReader();
        fileReader.onload =()=>{
            setpreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    


    },[file]);

    const pickedHanler=(event)=>{
        let pickedfile;
        let fileisValid=isValid;
        if(event.target.files && event.target.files.length ===1)
       {
            pickedfile=event.target.files[0];
           setfile(pickedfile);
           setisValid(true);
           fileisValid=true;
       }
       else{
           setisValid(false);
           fileisValid=false;
       } 
        props.onInput(props.id,pickedfile,fileisValid);
}

    const PickImageHandler=()=>{

        filePickerRef.current.click();
        


    }

   return (

      <div className="form-control">
      <input id={props.id}  ref={filePickerRef} style={{display:'none'}} type="file"  accept=".jpg,.png,.jpeg"  onChange={pickedHanler} />
 
 

    <div className={`image-uplaod ${props.center && 'center' }` }>
     
    <div className='image-upload__preview'>


   {previewUrl &&  <img src={previewUrl} alt="Preview" />}
   {!previewUrl && <p> Please Pick An Image</p>}
     </div>
     </div>
     <Button type="button" onClick={PickImageHandler}>PICK IMAGE</Button>

   {!isValid && <p>{props.errorText}</p>}
      </div>



   );


}
export default ImageUpload;

