import React from "react"
import Header from "components/Header/Header.jsx"

const dashboardRoutes = []

const Layout = ({ children }) => {
  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Night of Passion"
        //rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white",
        }}
      />
      {children}
    </>
  )
}
export default Layout
