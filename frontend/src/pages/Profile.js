import React, {  useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LeftSide from '../components/LeftSide';
import '../styles/profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateprofile } from '../actions/auth';
import { Link } from 'react-router-dom';
const Profile = () => {
  const user = useSelector(state=>state.user?.user)
  const [name,setName]=useState(user?.name || '')
  const [email, setEmail] = useState(user?.eamil || '');

  const [mobNo,setMobNo]=useState(user?.mobNo?user?.mobNo:'')
  const [showBtn,setShowBtn]=useState(false)
  const dispatch =useDispatch()
    const handleSubmit=(e)=>{
      e.preventDefault()
      dispatch(updateprofile({ name,mobNo, email}))
      setShowBtn(false)

    }

const handleInputChange=(value,text)=>{
  setShowBtn(true)
if(text==='name'){
  setName(value)
}
if(text==='mob'){
  setMobNo(value)
}
if (text === 'email') {
  setEmail(value);
}

}

  return(
      <>
       <SideBar/>
       <div className='mainarea all-oredrs'>
         <Header/>
         <div className="profile-section">
           {
             user?(
               <>
               <div className="profile-photo">
               <h1>{user?.name?.charAt(0)}</h1>
             </div>
             <div className="profile-detail">
                 <form onSubmit={handleSubmit}>
                     <div className="profile-input">
                        <label htmlFor="name">Полное имя</label>
                        <input type="text" id='name' onChange={(e)=>handleInputChange(e.target.value,'name')} value={name} />
                     </div>
                     <div className="profile-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email'  onChange={(e)=>handleInputChange(e.target.value,'email')} value={ email } />
                     </div>
                     <div className="profile-input">
                        <label htmlFor="mob">Мобильный номер телефона</label>
                        <input type="text" id='mob' onChange={(e)=>handleInputChange(e.target.value,'mob')} value={mobNo} />
                     </div>
                     {showBtn&&<button type='submit'>UPDATE</button>}
                 </form>
             </div>
             </>
             ):(
               <div>
                 <h1>Вы не зарегистрированы! Пожалуйста, зарегистрируйтесь</h1>
                 <Link to="/signin"><button>Регистрация</button></Link>
                 </div>
             )
           }
             
         </div>
       </div>
       <LeftSide/>
      </>
  );
};

export default Profile;
