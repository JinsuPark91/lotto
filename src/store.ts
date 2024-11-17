import { atom } from "recoil";

const numbers = atom({
  key: 'numbers',
  default: [],
})

const pastNumbers = atom({
  key: 'pastNumbers',
  default: [],
})

const store = {
  numbers: numbers,
  pastNumbers: pastNumbers,
}

export default store;