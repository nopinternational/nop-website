import React from "react"
import Header from "components/Header/Header.jsx"
import Footer from "components/Footer/Footer.jsx"
import HeaderLinks from "components/Header/HeaderLinks.jsx"
const dashboardRoutes = []

const Layout = ({ children }) => {
  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Night of Passion"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white",
        }}
      />
      {children}
      <Footer></Footer>
    </>
  )
}
export default Layout
