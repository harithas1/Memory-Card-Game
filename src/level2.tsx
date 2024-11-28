import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

// import images
import f1 from "./assets/f1.png";
import f2 from "./assets/f2.png";
import f3 from "./assets/f3.png";
import f4 from "./assets/f4.png";
import mjoker from "./assets/mjoker.png";

import mlogo from "./assets/mlogo.png";
import { useEffect, useState, useContext } from "react";
import { ScoreContext } from "./scoreProvide";

const imgContainer = [
  {
    id: 1,
    img: f1,
  },
  {
    id: 2,
    img: f1,
  },
  {
    id: 3,
    img: f2,
  },
  {
    id: 4,
    img: f2,
  },
  {
    id: 5,
    img: f3,
  },
  {
    id: 6,
    img: f3,
  },
  {
    id: 7,
    img: f4,
  },
  {
    id: 8,
    img: f4,
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

function Level2() {
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
    if (score === 4) {
      navigate(nextpathUrl);
      updateScore(0);
    } else {
      alert("Please complete Level -2 to go to next level");
      // navigate("/level1");
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="col-span-4 flex flex-col items-center gap-9 border-4 border-gray-500 p-5">
          {/* <p>{matchedCards.length/2}</p> */}
          {/* <Timer /> */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 border-4 border-gray-600 p-2">
            {shuffledImages.map((img: { id: number; img: string }) => (
              <div
                key={img.id}
                onClick={() => handleCardClick(img.id)}
                className={`card ${
                  flippedCards.includes(img.id) || matchedCards.includes(img.id)
                    ? `flipped`
                    : ""
                } sm:size-36 flip border-2 border-gray-900`}
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

          <section className="flex flex-row gap-10">
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

export default Level2;