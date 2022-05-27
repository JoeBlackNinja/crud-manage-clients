import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <h1>
        DEsde layout
        <Outlet/>
    </h1>
  )
}

export default Layout