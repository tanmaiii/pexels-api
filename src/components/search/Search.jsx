import React from "react";
import './search.css'
import {useEffect, useState, useRef, useCallback} from 'react'
import {useNavigate} from 'react-router'
import PropTypes from 'prop-types';

export default function Search(props) {
    const navigate = useNavigate()
    const headerRef = useRef(null)
    const [keyword, setKeyword] = useState('')
    const type = props.type

    const goToSearch = useCallback(
        () => {
              if(keyword.trim().length > 0){
                navigate(`/${type}/search/${keyword}`)
              }
        },[keyword, props]
    )
  
    useEffect(() => {
          const enterEvent = (e) => {
              e.preventDefault();
              if(e.keyCode === 13){
                  goToSearch();
              }
          }
          document.addEventListener('keyup', enterEvent)
          return () => {
              document.removeEventListener('keyup', enterEvent)
          }
    },[keyword, goToSearch])

  return (
        <div className="search-container" ref={headerRef}>
            <div className="search-container_search">
                <div className="search-container_search_input">
                <input
                    type="text"
                    placeholder='Search for free photo'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    onClick={goToSearch}
                    className="search-container_search_button"
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                </div>
            </div>
        </div>
  );
}


Search.protoType ={
    type: PropTypes.string
}