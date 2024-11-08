/* eslint-disable @typescript-eslint/no-extra-semi */
import { Form, Link } from "react-router-dom";
import authenticationService from "../services/authentication-service";
import storageService from "../services/storage-service";
import {ResponseData } from "../services/apiTypes";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiteBlob } from "../components/Blob";

let userdata: any = {
  email: String,
  password: String
};

function Signin() {
  let navigate = useNavigate();


  function onChangeEmail(e: React.FormEvent<HTMLInputElement>): void {
    userdata.email = e.currentTarget.value;
  };

  function onChangePassword(e: React.FormEvent<HTMLInputElement>): void {
    userdata.password = e.currentTarget.value;
  };


  async function submit() {
    if (userdata.password === String("") || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userdata.email))) {
      if (userdata.password === String("")) {
        toast.error(`Verification error: password required`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        return;
      }
      toast.error(`Verification error: check email address`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return;
    }

    await authenticationService.makeLoginRequest(userdata.email, userdata.password).then(function (response) {
      const responseData: ResponseData = response.data as unknown as ResponseData;
      
     // alert(responseData.accessToken);
      storageService.saveAccessToken(responseData.accessToken);
      storageService.saveRefreshToken(responseData.refreshToken);
      storageService.saveTokenExpiresDate(responseData.expiration);

      navigate("/panel/dashboard")


    }).catch(function(error) {
      const message = error.response.data.message || error.response.data.errors[Object.keys(error.response?.data.errors)[0]];
      toast.error(`Verification error: ${message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }


  return (
    <>
     <SiteBlob />
      <div className="grid w-full p-10 bg-gray-500 backdrop-blur-sm bg-opacity-20 bg-clip-padding backdrop-filter rounded-lg shadow">
        <strong className="mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in
        </strong>
        <Form className="grid ">
          <input
            className="m-3 font-bold rounded text-slate-500 blur-none"
            type="email"
            onChange={onChangeEmail}
            placeholder="Enter email"
            required
          ></input>
          <input
            className="m-3 font-bold rounded text-slate-500"
            type="password"
            onChange={onChangePassword}
            placeholder="Enter password"
            required
          ></input>
          <button id="submit" type="submit" className="m-3 text-black transition-all duration-150 rounded hover:bg-slate-300 bg-slate-50" onClick={submit}>
            Sign in
          </button>
          <Link to='/register' className="text-sm text-gray-700 transition-all duration-150 hover:text-black">
            Don't have an account? Sign up
          </Link>
        </Form>

        <ToastContainer />
      </div>
    </>
  );
}

document.getElementById("submit")?.addEventListener("click", function(event) {
  event.preventDefault();
})

export default Signin;