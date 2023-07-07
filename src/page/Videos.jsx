import React from "react";
import Header from "../components/header/Header";
import List from "../components/list/List";
import {category} from '../api/pexelsApi'
import Search from "../components/search/Search";

export default function Videos() {
  return (
    <div className="container">
      <Search type={category.videos}/>
      <div className="mt-3 mb-3">
        <List type={category.videos} />
      </div>
    </div>
  );
}
