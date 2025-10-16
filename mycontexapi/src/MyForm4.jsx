import {useState} from "react"

function MyForm4(){
  const [firstName,setFirstName] = useState({
    firstName : ''
  });

  const [lastName,setlastName] = useState({
    lastName : ''
  });

  const [email,setEmail] = useState({
    email : ''
  });
  // 근데 잘 생각해보면 alert을 띄우는건 학습 상황이라서 그렇지 실제 얘가 하는 역할은 form태그의 preventDefault()를 쓰기 위해서에 가깝습니다.
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName} ${lastName}`);
    event.preventDefault();
  }
//   const handleChange = (event) => {
//   setFirstName({...firstName, [event.target.name]: [event.target.value]});
//   setlastName({...lastName, [event.target.name]: [event.target.value]});
//   setEmail({...email, [event.target.name]: [event.target.value]});
// }
return(
<form onSubmit={handleSubmit}>
    <label>First Name : </label>
    <input type="text" onChange={e => setFirstName(e.target.value)} />
    <br />
    <label>Last Name :</label>
    <input type="text" onChange={e => setlastName(e.target.value)} />
    <br />
    <label>Email:</label>
    <input type="email" onChange={e => setEmail(e.target.value)} />
    <br />
    <input type="submit" value='클릭하세요'/>
    </form>
  )
}
export default MyForm4