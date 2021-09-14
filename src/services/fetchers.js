import Axios from 'axios'

export const fetchMessage = async function (){
  const response = await Axios.post('/api/user')
  return console.log(response)
}