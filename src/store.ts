import { atom } from "recoil";

const numbers = atom({
    key: 'numbers',
    default: [],
  })

  export default numbers;