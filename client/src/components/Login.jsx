import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { motion } from "motion/react";
import React, { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import cross_icon from "../assets/cross_icon.svg"
import { AppContext } from "../context/AppContext";


const Login = () => {
  const [state, setState] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");

  const {setShowLogin} = useContext(AppContext);

  const handleChangeState = () => {
    setState(state === "login" ? "signup" : "login");
  };

  const registerUser = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Send user data to backend
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      console.log("Register Response:", data);
    } catch (error) {
      console.error("Register Error:", error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      // Send token to backend for verification
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      console.log("Login Response:", data);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex justify-center items-center min-w-full">
      <motion.form
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duation: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm">
          Welcome back! Please {state === "login" ? "Login" : "Sign Up"} to
          continue.{" "}
        </p>
        {state === "signup" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img alt="" width={15} className="scale-150" />
            <input
              type="text"
              required
              className="outline-none text-sm"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img alt="" width={13} />
          <input
            type="email"
            required
            className="outline-none text-sm"
            placeholder="Email-Id"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img alt="" width={10} />
          <input
            type={showPassword ? "text" : "password"}
            required
            className="outline-none text-sm"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span className="">
            {showPassword ? (
              <FaEye onClick={() => setShowPassword(false)} size={15} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} size={15} />
            )}
          </span>
        </div>
        {state == "login" && (
          <p className="text-sm text-blue-600 my-4 cursor-pointer ">
            Forgot password?
          </p>
        )}
        <button
          className={`
                    ${state === "signup" ? "my-3 " : ""} 
                    ${loading ? "bg-blue-500/50 pointer-events-none" : ""} 
                    relative  w-full rounded-full text-center text-white bg-blue-500 py-2 cursor-pointer hover:bg-blue-600
                  `}
          disabled={loading}
        >
          {state === "login" ? "Login" : "create account"}
          {loading && (
            <div className="absolute top-[25%] left-[45%]  pointer-events-none">
              <Spinner />
            </div>
          )}
        </button>

        {state === "login" ? (
          <p className="mt-5 text-center">
            Don't have an account?
            <span
              onClick={handleChangeState}
              className="px-2 text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?
            <span
              onClick={handleChangeState}
              className="px-2 text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
            <img src={cross_icon}
                onClick={() => setShowLogin(false)}
                className='absolute w-4 top-5 right-5 cursor-pointer hover:scale-105 duration-200'
                alt=""
            />
      </motion.form>
    </div>
  );
};

export default Login;
