import React, { useCallback, useEffect, useRef, useState } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router'

export default function Header(props) {
  const {pathname} = useLocation();
  const onUpRef = useRef()
  const menuRef = useRef()
  useEffect(()=>{
    const linkTagNameA = document.querySelectorAll('.header_control ul a')
    linkTagNameA.forEach(item => {
      item.classList.remove('active')
      if(item.getAttribute('href') === pathname) {
        item.classList.add('active')
      }
    })
  },[pathname])

  useEffect(()=> {
    const shinkHeader = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        onUpRef.current.classList.add('block');
      }else{
        onUpRef.current.classList.remove('block');
      }
      window.addEventListener('scroll', shinkHeader)
    }
  
    shinkHeader();
    
    return () => {
      window.removeEventListener('scroll', shinkHeader)  
    }
  },[])


  const goUp = () => {
    window.scrollTo(0,0)
  }

  const openMenu = () => {
    menuRef.current.style.transform = 'translateX(0)'
  }

  const closeMenu = () => {
    menuRef.current.style.transform = 'translateX(-100%)'
  }

  
  return (
    <>
    <div className='header' >
        <div className='header_logo'>
            <Link to='/'>
                Pexels API
            </Link>
        </div>
        <div className='header_control' ref={menuRef}>
            <ul>
                <Link to='/'>Home</Link>
                <Link to='/v1'>Image</Link>
                <Link to='/videos'>Video</Link>
            </ul>
            <button className='close-menu' onClick={() => closeMenu()}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
        <button className='header_menu'  onClick={()=> openMenu()}>
            <i className="fa-solid fa-bars"></i>
        </button>
    </div>
    <div ref={onUpRef} href="" className='go_up'>
          <button onClick={goUp}>
               <i className="fa-solid fa-angle-up"></i>
          </button>
    </div>
    </>
  )
}
