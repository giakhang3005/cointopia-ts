import React from 'react'
import Nav from './Nav/Nav'
import { Outlet } from 'react-router-dom'

type Props = {}

const Layout = (props: Props) => {
  return (
    <>
        <Nav />
        {/* Outlet will display all childrens */}
        <Outlet />
    </>
  )
}

export default Layout