export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}

export const setUser = user =>
  isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()
  console.log("auth.isLoggedIn.user: ", user)
  return !!user.email
}

export const logout = firebase => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        setUser({})
        resolve()
      })
  })
}

export const setDisplayName = (firebase, name) => {
  return new Promise(resolve => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
      })
      .then(success => console.log("setDisplayName success: ", success))
      .catch(fail => console.log("setDisplayName fail: ", fail))
  })
}