import Axios from 'axios'

export function getBookMarks() {
  return Axios('http://127.0.0.1:4000/bookmark')
}
