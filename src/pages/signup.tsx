import { Mail, CircleUserRound, LockKeyhole, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nameref = useRef(null);
  const mailref = useRef(null);
  const passref = useRef(null);
  const navigate = useNavigate();

  function saveToLocalStorage(name: string, email: string, password: string) {
    console.log(name, email, password);

    function validateMail(email: string | null) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email as any
        )
      ) {
        return true;
      }
      return false;
    }

    if (validateMail(email)) {
      localStorage.setItem(
        "username",
        JSON.stringify({
          name: name,
          email: email,
          password: password,
        })
      );

      navigate("/");
    } else {
      alert("invalid email");
    }
  }

  return (
    <>
      <div className="text-sky-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col border border-cyan-800 bg-slate-800 bg-opacity-20 gap-4 p-10 place-items-center rounded-2xl bg-gradient-to-r from-sky-700 to-sky-500 ">
        <h1 className="text-4xl text-yellow-300 font-bold">Sign up</h1>
        <p className="font-semibold text-sm">
          Please fill the deatils and create an account
        </p>
        <CircleUserRound className="size-28" />

        <article className="border-b-2 border-cyan-600 flex flex-row gap-8 items-center">
          <UserRound className="size-5 place-self-center" />
          <input
            className="p-1 focus:outline-none focus:border-blue-500 bg-transparent"
            autoFocus
            type="text"
            placeholder="Usename"
            ref={nameref}
          />
        </article>

        <article className="border-b-2 border-cyan-600 flex flex-row gap-8 items-center">
          <Mail className="size-5 place-self-center" />
          <input
            className="p-1 focus:outline-none focus:border-blue-500 bg-transparent"
            type="email"
            placeholder="Email ID"
            ref={mailref}
          />
        </article>
        <article className="border-b-2 border-cyan-600 flex flex-row gap-8">
          <LockKeyhole className="size-5 place-self-center" />
          <input
            className="p-1 focus:outline-none focus:border-blue-500 bg-transparent"
            type="password"
            placeholder="Password"
            ref={passref}
          />
        </article>
        <Button
          className="w-full text-lg m-3"
          onClick={() =>
            saveToLocalStorage(
              nameref.current?.value,
              mailref.current?.value,
              passref.current?.value
            )
          }
        >
          Submit
        </Button>

        <Button
          onClick={() => (window.location.href = "/login")}
          variant="ghost"
        >
          Already have an account? Login!
        </Button>
      </div>
    </>
  );
}
