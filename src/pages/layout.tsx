import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Outlet, useLocation } from "react-router-dom";
import { ScoreContext } from "../scoreProvide";
import { useContext, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
// import { useEffect } from "react";
import cracker1 from "../assets/cracker1.gif";
// import Green from "../assets/Green.mp4";

const Layout = () => {
  const { score } = useContext(ScoreContext);
  const [totalScore, setTotalScore] = useState(0);
  const user = JSON.parse(localStorage.getItem("username") || "{}");
  const userName = user["name"];
  // const userEmail = user["email"].split("@")[0]
  const userEmail = user["email"];
  console.log(userEmail);
  // let score = 0
  const location = useLocation();
  const currentUrl = location.pathname;
  console.log(currentUrl.slice(1));

  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    if ((currentUrl.slice(1) == "level1" || currentUrl == "/") && score == 3) {
      setShowCongratulations(true);
      setTotalScore(3);
      // updateScore(0);
    } else if (currentUrl.slice(1) == "level2" && score == 4) {
      setShowCongratulations(true);
      setTotalScore((prev) => prev + 4);
      // updateScore(0);
    } else if (currentUrl.slice(1) == "level3" && score == 6) {
      setShowCongratulations(true);
      setTotalScore((prev) => prev + 6);
      // updateScore(0);
    } else if (currentUrl.slice(1) == "level4" && score == 7) {
      setShowCongratulations(true);
      setTotalScore((prev) => prev + 9);
      // updateScore(0);
    } else if (currentUrl.slice(1) == "level5" && score == 8) {
      setShowCongratulations(true);
      setTotalScore((prev) => prev + 12);
      // updateScore(0);
    }
  }, [score, currentUrl]);

  const [time, setTime] = useState(30);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimeRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsTimeRunning(false);
      alert("Time's up");
    }
    return () => clearInterval(timer);
  }, [isTimeRunning, time]);

  const toggleTimer = () => {
    setIsTimeRunning(!isTimeRunning);
  };
  // display video for 17 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     document.getElementById("video").style.display = "block";
  //     document.getElementById("main").style.display = "none";
  //   }, 17000);
  //   return () => clearTimeout(timer);
  // }, []);

  // function titleTypeEffect() {
  //   const title = "Memorize & Match"
  //   const place = document.querySelector(".custom-anime");
  //   let i = 0;
  //   setInterval(() => {
  //     place.innerHTML = title.slice(0, i);
  //     i++;
  //     // if (i > title.length) {
  //     //   i=0
  //     // }
  //   }, 300);
  // }

  // useEffect(() => {
  //   titleTypeEffect();
  // }, []);
  //

  // shouldn't show layout 17seconds

  return (
    <>
      <div className="grid grid-rows-2 gap-2 mt-0" id="main">
        <section className="flex flex-col p-3 border bg-sky-100">
          <img src="" alt="" />
          <h1 className="text-5xl font-bold place-self-center font-mono custom-anime text-yellow-800 custom-text-shadow ">
            Memorize & Match
          </h1>
        </section>

        <section className="flex flex-row place-content-between">
          <Select>
            <SelectTrigger className="w-32 place-self-center ml-4 bg-black text-white">
              <SelectValue placeholder="Levels" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup className="p-3">
                <SelectLabel>Easy</SelectLabel>
                <section>
                  <Link to="/level1">Level-1</Link>
                </section>
                <section>
                  <Link to="/level2">Level-2</Link>
                </section>
              </SelectGroup>
              <SelectGroup className="p-3">
                <SelectLabel>Medium</SelectLabel>
                <section>
                  <Link to="/level3">Level-3</Link>
                </section>
                <section>
                  <Link to="/level4">Level-4</Link>
                </section>
              </SelectGroup>

              <SelectGroup className="p-3">
                <SelectLabel>Hard</SelectLabel>
                <section>
                  <Link to="/level5">Level-5</Link>
                </section>
              </SelectGroup>
            </SelectContent>
          </Select>
          <section className="flex flex-row gap-5 place-self-center">
            <span className="text-xl place-self-center text-blue-600 custom-text-shadow">
              {currentUrl == "/"
                ? "LEVEL - 1"
                : currentUrl.slice(1, 6).toUpperCase() +
                  " - " +
                  currentUrl.slice(6)}
            </span>
            <Button className="bg-green-800">Score: {score}</Button>
            <Button
              onClick={toggleTimer}
              className="bg-blue-800 text-white hide"
              variant="outline"
            >
              {isTimeRunning ? "Pause" : time === 30 ? "Start" : "Resume"}
            </Button>
            <span className="flex flex-row items-center gap-2 hide">
              <span>Time Left:</span>
              <span>{time}s</span>
            </span>
          </section>
          <section className="flex flex-row gap-5 place-self-center">
            <Button className="bg-red-700">Total Score: {totalScore}</Button>
            <Dialog
              open={showCongratulations}
              onOpenChange={setShowCongratulations}
            >
              <DialogTrigger asChild>
                <Button className="hide"></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <img
                    className="fixed h-screen -top-80"
                    src={cracker1}
                    alt="crackers"
                  />
                  <img
                    className="fixed h-screen -top-96 -left-10"
                    src={cracker1}
                    alt="crackers"
                  />
                  <DialogTitle>Congratulations!!</DialogTitle>
                  {totalScore < 34 ? (
                    <DialogDescription>
                      You have completed{" "}
                      <span className="text-red-600 text-xl">
                        {currentUrl == "/"
                          ? "LEVEL - 1"
                          : currentUrl.slice(1, 6).toUpperCase() +
                            " - " +
                            currentUrl.slice(6)}
                      </span>{" "}
                      successfully!{" "}
                    </DialogDescription>
                  ) : (
                    <DialogDescription className="text-red-600 text-xl">
                      You have completed all the levels successfully!
                    </DialogDescription>
                  )}
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button className="bg-red-600 text-xs rounded-3xl">
                  Rules
                </Button>
              </DialogTrigger>
              <DialogContent className="border-4 border-black rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl bg-red-600 place-self-center -translate-y-14 p-2 border-4 border-black text-white rounded-lg">
                    How to Play
                  </DialogTitle>
                  <DialogDescription>
                    <ul className="list-disc p-4">
                      <li>
                        Click on the cards to flip them over. If two cards
                        match, they stay flipped over.
                      </li>
                      <li>If two cards don't match, they flip back over</li>
                      <li>Match all the cards to win the game</li>
                    </ul>
                  <p className="text-center text-xl font-bold">Good luck!!</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </section>
          <section className="place-self-center mr-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="size-10 rounded-3xl border bg-sky-500"
                  variant="ghost"
                >
                  {/* {userName[0].toUpperCase()} */}
                  {userName}
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[425px] bg-gradient-to-r from-sky-700 to-sky-500">
                <SheetHeader>
                  <SheetTitle className="text-2xl text-white">
                    Edit profile
                  </SheetTitle>
                  <SheetDescription className="text-sm text-white">
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="name"
                      defaultValue={userName}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="username"
                      defaultValue={userEmail}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </section>
        </section>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

{
  /* <section className="place-self-end mr-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="bg-black text-white size-10 rounded-3xl"
                  variant="outline"
                >
                  {userName[0].toUpperCase()}
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[425px] bg-gradient-to-r from-pink-200 to-indigo-200">
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="name"
                      value={userName}
                      className="col-span-3"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="username"
                      value={userEmail}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </section> */
}
