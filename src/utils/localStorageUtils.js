import { User } from "../data/user"

export function saveToLocalStorage(key, value) {
   localStorage.setItem(key, value)
}
export function loadFromLocalStorage(key) {
   localStorage.clear(key)
   return localStorage.getItem(key) || {
      username: key,
      exercises: [

      ],
   }
}

