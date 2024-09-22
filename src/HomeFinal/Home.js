import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { FormDataViewAPI } from '../Http/ViewFormData';
import Header from '../Header/header';
import FormHomePage from '../FormPage/form';

const HomeFinal= () => {
  
  const [display, setDisplay] = React.useState(false);
  const [data, setData] = React.useState([
    { 'id':'' },
   
  ]);
  const url = useNavigate();
  
 

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        
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
        
      <FormHomePage  type1={true} />
      </div>
    </div>
  );
};

export default HomeFinal;
