import React, { useEffect, useState } from 'react';
import Header_auth from '../Header/Header_auth';
import Header_auth_admin from '../Header/Header_auth_admin';
//import axios from 'axios';

export default function Admin_customer(){
    const[admin, setAdmin] = useState(false);
    //const history = useHistory();
    useEffect(() =>{
      function checkLogin(){
        if(localStorage.getItem('access_token')!=null)
        {
            if(localStorage.getItem('loai-nguoi-dung') === 'QuanLy' ||localStorage.getItem('loai-nguoi-dung') === 'admin' ){
            setAdmin({
                admin: true 
            })
            }
            else{
                setAdmin(false)
            }
        }
        
      }
      checkLogin();
    },[])
    return (
        <div>
            {admin ? <Header_auth_admin/> : <Header_auth/> }
        </div>
    );
};