import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RiAddFill} from 'react-icons/ri'
import {useLocation,useNavigate} from 'react-router-dom'
import AddressModal from '../components/AddressModal'
import '../styles/shipping.css'
import { deleteAddress, getAdress,selectAddress, updateAddress } from '../actions/address';
const Shipping = () => {

    const cartItems = useSelector(state=>state.cart.cartItems)
    const allAdress = useSelector(state=>state.address.addressItems)
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)
    const cartPrice=cartItems.reduce((total,itm)=>total+itm?.price*itm?.qty,0)
    const deleviryPrice = (cartPrice>1299||cartPrice===0)?0:50
    const discount = 0;
    const totalPrice= (cartPrice+deleviryPrice)-discount;
    // const auth = useSelector(state=>state.user.user)
    const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    const [show,setShow]=useState(false)
    const [selected,setSelected]=useState(0)
   const [addressToEdit,setAddressToEdit]=useState()
    useEffect(()=>{
        if(!user){
            navigate('/signin')
        }
    },[])
    
    
    useEffect(()=>{
        if(user){
            dispatch(getAdress(user._id))
        }
    },[])
  const proceedToPayment =()=>{
    navigate('/payment')
  }

  const delteAddress=(id)=>{
      dispatch(deleteAddress(id))
  }
  const handleUpdateAddress=(address)=>{
     setAddressToEdit(address)
     setShow(true)
  }
  
  const handleSelectAddress=(address,i)=>{
  setSelected(i)
  dispatch(selectAddress(address))
  }
    
  return (
    <>
  <div className='shipping'>
   <div className="progress">
        <div className="status">
            <p>Корзина</p>
            <div className={`divider`}></div>
            <p className={` ${path==='/shipping'&& 'active'}`}>Доставка</p>
            <div className="divider"></div>
           <p className={` ${path==='/payment'&& 'active'}`}>Оплата</p>
        </div>
   </div>
   <div className="shipping-details">
       <div className="address">
        <h3>Выбор адреса доставки</h3>
        <div className="add-sec-area">
            {
            allAdress.length>0?(allAdress.map((address,i)=>(
                <div onClick={()=>handleSelectAddress(address,i)} className={`og-add ${selected===i&& 'selected'}`} key={address._id}>
                <p>{address.name}</p>
                <span>{address.address},{address.town}</span>
                <span>{address.city},{address.state} -{address.pinCode} </span>
                <span><b>Мобильный номер телефона</b>{address.mobNo}</span>
                <div className="btns">
                    <button className='btn' onClick={()=>delteAddress(address._id)}>Удалить</button>
                    <button className='btn' onClick={()=>handleUpdateAddress(address)}>Изменить</button>
                </div>
               </div>
            ))
            ):<h3 style={{padding:'20px 0'}}>Ни одного адреса не найдено. Добавьте новый</h3>}
           
            <div className="add-address" onClick={()=>setShow(true)}>
             <div className="add">
                 <RiAddFill/>
                 <p>Добавить адрес</p>
             </div>
            </div>
        </div>
       </div>
       
       <div className="checkout-area">
                      <div className="billing">
                        <h4>ИНФОРМАЦИЯ О ЦЕНЕ</h4>
                        <div className="details">
                            <div className="item">
                                <p>Цена</p>
                                <p><span>₽</span>{cartPrice}</p>
                            </div>
                            
                            <div className="item">
                                <p>Стоимость доставки</p>
                                <p>{deleviryPrice===0?<span className='free'>Бесплатно</span>:<span>₽{deleviryPrice}</span>}</p>
                            </div>
                        </div>
                        <div className="total">
                            <h3>Итого</h3>
                            <h3><span>₽</span>{totalPrice}</h3>
                        </div>
                      </div>
                      <button onClick={proceedToPayment} disabled={totalPrice===0?true:false}>ПЕРЕЙТИ К ОПЛАТЕ</button>
        </div>
   </div>
  </div>
  <AddressModal show={show} setShow={setShow} addressToEdit={addressToEdit}/>
  </>
  );
};

export default Shipping;
