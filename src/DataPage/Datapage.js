import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormDataViewAPI } from '../Http/ViewFormData';
import Header from '../Header/header';
import FormHomePage from '../FormPage/form';

const FormData = () => {
  const { formid } = useParams();
  const [display, setDisplay] = React.useState(false);
  const [data, setData] = React.useState([
    { 'id':'4' },
   
  ]);
  const url = useNavigate();
  
  const fetchData = async () => {
    try {
      const responseData = await FormDataViewAPI(formid);
   await  setData(responseData.data);

  // alert(JSON.stringify(responseData.data))
    } catch (error) {
      console.error('Error fetching form data:', error);
     // alert(error)
    }
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        // User is signed in
     await   fetchData()
        setDisplay(true);
      } else {
        // User is not signed in, redirect to login
        url('/login');
      }
    });

    return () => {
      // Clean up the auth state listener
      unsubscribe();
    };
  }, []);

 

  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      
      <div className='top-header'>
        {display ? ( <FormHomePage data={data}  />):(<div />)}
     
      </div>
    </div>
  );
};

export default FormData;
