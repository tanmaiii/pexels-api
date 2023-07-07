import React from 'react'
import Header from '../components/header/Header'
import List from '../components/list/List'
import {category} from '../api/pexelsApi'

export default function Home() {
  return (
    <div className='container'>
        <div className='mt-3 mb-3' >
            <List type={category.v1} />
        </div>
    </div>
  )
}
