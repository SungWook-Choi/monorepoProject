import axios from 'axios';

const login = () => {
    return (
        <>
            <button
                onClick={async () => {
                    const url:string = 'http://localhost:4000/users/googleAuth'
                    const res = await axios.get<null>(url);
                    console.log(res);
                }}
            >구글 인증 로그인</button>
        </>
    )
}
export default login;
