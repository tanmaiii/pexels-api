import {Routes as RoutersSwitch, Route} from 'react-router-dom'
import React from 'react'
import Home from '../page/Home'
import Image from '../page/Image'
import Videos from '../page/Videos'
import Catalog from '../page/Catalog'
import Detail from '../page/detail/Detail'

export default function Routes() {
  return (
    <RoutersSwitch>
        <Route path='/:category/detail/:id' element={<Detail/>}/>
        <Route path='/:category/search/:keyword' element={<Catalog/>}/>
        <Route path='/v1' element={<Image/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route exact path='/' element={<Home/>}/>
    </RoutersSwitch>
  )
}
