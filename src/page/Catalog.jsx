import React from "react";
import {useEffect, useState, useRef, useCallback} from 'react'
import Header from "../components/header/Header";
import List from "../components/list/List";
import Search from "../components/search/Search";
import { useParams } from "react-router-dom";

export default function Catalog(props) {
  const {keyword} = useParams()
  const {category} = useParams()

  return (
    <div className="container">
        <Search type={category}/>
        <div className="mt-3 mb-3">
          <List keyword={keyword}  type={category} />
        </div>
      </div>
  )
}
