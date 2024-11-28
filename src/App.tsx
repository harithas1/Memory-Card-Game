import { Button } from "@/components/ui/button";

// import images
import m1 from "./assets/m1.png";
import m2 from "./assets/m2.png";
import m3 from "./assets/m3.png";
import m4 from "./assets/m4.png";
import mjoker from "./assets/mjoker.png";

import mlogo from "./assets/mlogo.png";
import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import m5 from "./assets/m5.png";
// import m6 from "./assets/m6.png";
// import m7 from "./assets/m7.png";
// import m8 from "./assets/m8.png";
// import m9 from "./assets/m9.png";
// import m10 from "./assets/m10.png"
// import m11 from "./assets/m11.png"
// import m12 from "./assets/m12.png"
// import m13 from "./assets/m13.png"
// import m14 from "./assets/m14.png"
// import m15 from "./assets/m15.png"
// import m16 from "./assets/m16.png"
// import m17 from "./assets/m17.png"
// import m18 from "./assets/m18.png"
// import m19 from "./assets/m19.png"
// import m20 from "./assets/m20.png"

// const imgContainer = [m1, m2, m3, m4];

const imgContainer = [
  {
    id: 1,
    img: m1,
  },
  {
    id: 2,
    img: m1,
  },
  {
    id: 3,
    img: m2,
  },
  {
    id: 4,
    img: m2,
  },
  {
    id: 5,
    img: m3,
  },
  {
    id: 6,
    img: m3,
  },
  {
    id: 7,
    img: m4,
  },
  {
    id: 8,
    img: m4,
  },
  {
    id: 9,
    img: mjoker,
  },
];

function shuffle(imgContainer) {
  const shuffledArray = [...imgContainer];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// ----------------------------------------------------------

function App() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shuffled = shuffle(imgContainer);
    setShuffledImages(shuffled);
  }, []);

  const handleCardClick = (id) => {
    if (flippedCards.length == 2 || matchedCards.includes(id) || disabled) {
      //
      return;
    }
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length == 2) {
      setDisabled(true);
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkForMatch = ([firstCard, secondCard]: number[]) => {
    const firstImg = shuffledImages.find((img) => img.id === firstCard).img;
    const secondImg = shuffledImages.find((img) => img.id === secondCard).img;

    if (firstImg === secondImg) {
      setMatchedCards((prev) => [...prev, firstCard, secondCard]);
    }

    setDisabled(false);
    setFlippedCards([]);
  };

  function resetGame() {
    setShuffledImages(shuffle(imgContainer));
    setFlippedCards([]);
    setMatchedCards([]);
    setDisabled(false);
  }

  return (
    <>
      <section className="grid grid-cols-4 gap-2">
        <div className="col-span-4 flex flex-col items-center gap-9 border-4 border-gray-500 p-5">
          {/* <div className="flex flex-row place-content-between gap-7">
            <Button>Score: {matchedCards.length / 2}</Button>
            <Dialog>
              <DialogTrigger>
                <Button>Rules</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div> */}
          {/* <Timer /> */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {shuffledImages.map((img: { id: number; img: string }) => (
              <div
                key={img.id}
                onClick={() => handleCardClick(img.id)}
                className={`card ${
                  flippedCards.includes(img.id) || matchedCards.includes(img.id)
                    ? `flipped`
                    : ""
                } sm:size-36  `}
                style={{ cursor: `pointer` }}
              >
                <img
                  src={
                    flippedCards.includes(img.id) ||
                    matchedCards.includes(img.id)
                      ? img.img
                      : mlogo
                  }
                  alt="memory card"
                />
              </div>
            ))}
          </div>

          <Button onClick={() => resetGame()} variant="default">
            Restart Game!
          </Button>
        </div>
      </section>
    </>
  );
}

export default App;

// function Timer() {
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds + 1);
//       }, 1000);
//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive]);
//   const handleStart = () => {
//     setIsActive(true);
//   };
//   const handleStop = () => {
//     setIsActive(false);
//   };
//   const handleReset = () => {
//     setSeconds(0);
//     setIsActive(false);
//   };

//   return (
//     <section className="scoreAndTimer flex flex-row gap-4">
//       <Button> Score:{seconds < 10 ? matchedCards.length / 2 : 0}</Button>
//       <h1>{seconds > 10 ? "You Lost" : `Timer: ${seconds}`}</h1>
//       <Button onClick={handleStart}>Start</Button>
//       <Button onClick={handleStop}>Stop</Button>
//       <Button onClick={handleReset}>Reset</Button>
//     </section>
//   );
// }
