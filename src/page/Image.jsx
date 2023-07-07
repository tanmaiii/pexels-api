import React from "react";
import Header from "../components/header/Header";
import List from "../components/list/List";
import { category } from "../api/pexelsApi";
import Search from "../components/search/Search";

export default function Image(props) {
  return (
    <div>
      <div className="container">
        <Search type={category.v1}/>
        <div className="mt-3 mb-3">
          <List type={category.v1} />
        </div>
      </div>
    </div>
  );
}
