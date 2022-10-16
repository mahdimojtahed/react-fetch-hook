import { useState , useCallback } from 'react';

export const useHttpClient = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const sendRequest = useCallback(async (URL, method = 'GET', body = null, headers = {}, credentials = 'include') => {
      setIsLoading(true);
      try {
         const res = await fetch(URL, {method, body, headers, credentials});
         const resData = await res.json();
         
         if(!res.ok) {
            setError(resData.error);
         }

         setIsLoading(false)   
         return resData;
      } catch (error) {
         setIsLoading(false)   
         setError(error.message)
      }
   }, [])

   const clearError = () => {
      setError(null);
   }
   return {isLoading, error, clearError, sendRequest}
}