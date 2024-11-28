import { Button } from "@/components/ui/button";

import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import p4 from "./assets/p4.png";
import p5 from "./assets/p5.png";
import p6 from "./assets/p6.png";
import p7 from "./assets/p7.png";
import mjoker from "./assets/mjoker.png";


import mlogo from "./assets/mlogo.png";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "./scoreProvide";
import { useNavigate, useLocation } from "react-router-dom";

const imgContainer = [
  {
    id: 1,
    img: p1,
  },
  {
    id: 2,
    img: p1,
  },
  {
    id: 3,
    img: p2,
  },
  {
    id: 4,
    img: p2,
  },
  {
    id: 5,
    img: p3,
  },
  {
    id: 6,
    img: p3,
  },
  {
    id: 7,
    img: p4,
  },
  {
    id: 8,
    img: p4,
  },
  {
    id: 9,
    img: p5,
  },
  {
    id: 10,
    img: p5,
  },
  {
    id: 11,
    img: p6,
  },
  {
    id: 12,
    img: p6,
  },
  {
    id: 13,
    img: p7,
  },
  {
    id: 14,
    img: p7,
  },
  {
    id: 15,
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

function Level4() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { score, updateScore } = useContext(ScoreContext);

  useEffect(() => {
    const shuffled = shuffle(imgContainer);
    setShuffledImages(shuffled);
    const timer = setTimeout(() => {
      const flipped = shuffled.map((item) => item.id);
      setFlippedCards(flipped);
    }, 1000);
    const popTimer = setTimeout(() => {
      setFlippedCards([]);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(popTimer);
    };
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
      updateScore(score + 1);
    }

    setDisabled(false);
    setFlippedCards([]);
  };

  function resetGame() {
    setShuffledImages(shuffle(imgContainer));
    setFlippedCards([]);
    setMatchedCards([]);
    setDisabled(false);
    updateScore(0);
  }

  const location = useLocation();

  const navigate = useNavigate();
  const handleNextLevel = () => {
    const currentUrl = location.pathname;
    const nextpathUrl =
      currentUrl.slice(0, 6) + (Number(currentUrl.slice(6)) + 1);
    // console.log(nextpathUrl);

    if (score === 7) {
      navigate(nextpathUrl);
      updateScore(0);
    } else {
      alert("Please complete Level-4 to go to next level");
      // navigate("/level1");
    }
  };
  // handleNextLevel()

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="col-span-4 flex flex-col items-center gap-9 border-4 border-gray-500 pt-10 p-3 h-auto">
          {/* <p>{matchedCards.length/2}</p> */}
          {/* <Timer /> */}
          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 border-4 border-gray-600 p-2">
            {shuffledImages.map((img: { id: number; img: string }) => (
              <div
                key={img.id}
                onClick={() => handleCardClick(img.id)}
                className={`card ${
                  flippedCards.includes(img.id) || matchedCards.includes(img.id)
                    ? `flipped`
                    : ""
                } sm:size-32 flip border-2 border-gray-900`}
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

          <section className="flex flex-row gap-10 h-screen">
            <Button onClick={() => resetGame()} variant="default">
              Restart Game!
            </Button>
            <Button onClick={handleNextLevel}>Next Level</Button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Level4;
