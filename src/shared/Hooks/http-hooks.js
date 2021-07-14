import { useState ,useCallback,useRef,useEffect} from "react"


export const useHttpClient =()=>{
    
   const [isloading, setisloading] = useState(false);
   const [error, setError] = useState();
   const activeHttpRequest=useRef([]);
   const sendRequest= useCallback( async(url,method='GET',body=null,headers={})=>{
  setisloading(true);
  const httpAbortCtrl=new AbortController();
  activeHttpRequest.current.push(httpAbortCtrl);
    try{
     const response= await fetch(url,{
      method:method,
      body:body,
      headers:headers,
      signal:httpAbortCtrl.signal
   });
     const responseData = await response.json();
     activeHttpRequest.current=activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);
                if(!response.ok) //This means we have a 400 or 500 response
                {
                    throw new Error(responseData.message);
         
                }
                setisloading(false);
                return responseData;

            }catch(err){

               setError(err.message);
               setisloading(false);
               throw err;

        }
   
    },  []);

    const ClearError=()=>{
     
        setError(null);


    };
    useEffect(()=>{
   
        return ()=>{
          
            activeHttpRequest.current.forEach(abortCtrl =>  abortCtrl.abort());


        };

    },[])
      
return {isloading,error,sendRequest,ClearError};

};