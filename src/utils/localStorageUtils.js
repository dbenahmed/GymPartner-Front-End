import { User } from "../data/user"

export function saveToLocalStorage(key, value) {
   localStorage.setItem(key, JSON.stringify(value))
}
export function loadFromLocalStorage(key) {
   return ((JSON.parse(localStorage.getItem(key))) || {
      username: key,
      planName: key,
      exercises: [
      ],
   })
}

