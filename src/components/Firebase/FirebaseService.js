import { getUser } from "../Auth/auth"

export const setValidationStatus = (firebase, status, message) => {
  const user = getUser()

  const uid = user.uid
  const validationDataRef = firebase
    .database()
    .ref(`/validation/${uid}/status/`)

  if (message) {
    return validationDataRef.set({ status, message })
  } else {
    return validationDataRef.child("status").set(status)
  }
}

export const setValidationPending = firebase => {
  setValidationStatus(firebase, "PENDING")
}
export const setValidationRetry = firebase => {
  setValidationStatus(firebase, "RETRY")
}
