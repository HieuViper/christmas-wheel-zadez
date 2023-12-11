import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useWindowSize } from "@uidotdev/usehooks";
import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Wheel } from "react-custom-roulette";
import center from "../public/center.png";
import audioCp from "../public/clap.mp3";
import Congrat from "../public/congrat.png";
import audioBg from "../public/tieng-chuong.mp3";
import "./App.css";
import prizeData from "./assets/prizeData.json";
import Player from "./components/Player";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim";

const colorsList = ["#165B33", "#BB2528", "#146B3A", "#EA4630", "#F8B229"];

let count = 0;
let arr = prizeData;
for (let i = 0; i < arr.length; i++) {
  count >= colorsList.length ? (count = 0) : count;

  Object.defineProperty(arr[i], "style", {
    value: {
      backgroundColor: colorsList[count],
    },
  });
  // arr[i].style = colorsList[count];
  count++;
}
function App() {
  const size = useWindowSize();
  const [data, setData] = useState(arr);
  console.log("🚀 ~ file: App.jsx:32 ~ App ~ data:", data);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  console.log("🚀 ~ file: App.jsx:76 ~ App ~ prizeNumber:", prizeNumber);
  const [confetti, setConfetti] = useState(false);
  //modal winner
  const [prizeWinning, setPrizeWinning] = useState("");
  const [openModalWinner, setOpenModalWinner] = useState(false);
  // particals
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);
  const handleCloseModalWinner = () => {
    setPlayer(null);
    setOpenModalWinner(false);
    setConfetti(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };
  // choose player
  const [player, setPlayer] = useState(null);
  //music
  const [isPlay, setIsPlay] = useState(false);
  console.log("🚀 ~ file: App.jsx:66 ~ App ~ isPlay:", isPlay);
  const audioBgElm = useRef();
  const audioClapElm = useRef();

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  useEffect(() => {
    if (isPlay) {
      audioBgElm.current.play();
      audioBgElm.current.volume = 0.5;
    } else {
      audioBgElm.current.pause();
      audioBgElm.current.volume = 0.5;
    }
  }, [isPlay]);

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div
        className="relative  flex justify-center items-center md:p-[9px] p-[4px]"
        id="wheelCircle"
      >
        <>
          <div
            style={{
              width: "100%",
              position: "absolute",
              height: "100%",
              zIndex: 9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img className="w-20 rounded-full" src={center} alt="logo" />
          </div>

          <div className="parent-container">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={() => {
                setMustSpin(false);
                console.log(data[prizeNumber]);
                setPrizeWinning(data[prizeNumber]);
                setOpenModalWinner(true);
                setConfetti(true);
                audioClapElm.current.play();
                audioBgElm.current.volume = 1;
                setData([
                  ...data.slice(0, prizeNumber),
                  ...data.slice(1 + prizeNumber),
                ]);
              }}
              pointerProps={{
                style: { width: 100, transform: "rotate(45deg)" },
                src: "https://app.woay.vn/w/1d4cfeac-2291-49c3-acd8-8b58767fb681/assets/6d00c7be-7bc2-4aaf-9807-47afff1adef6-muiten.png",
              }}
              outerBorderColor={["tranparent"]}
              outerBorderWidth={[9]}
              innerBorderColor={["#f2f2f2"]}
              radiusLineColor={["tranparent"]}
              radiusLineWidth={[1]}
              spinDuration={1.5}
            />
          </div>
        </>

        <img
          src="https://app.woay.vn/w/1d4cfeac-2291-49c3-acd8-8b58767fb681/assets/ccf129ef-32e2-4190-b2e2-eb88a496b316-vienvongquay.png"
          alt=""
          className="absolute w-[100%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {data.length == 1 ? (
        <button
          className="relative mt-5 inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
          onClick={() => setData(arr)}
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative">RESET</span>
        </button>
      ) : (
        <button
          className="relative mt-5 inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
          onClick={handleSpinClick}
          disabled={!player}
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative">SPIN</span>
        </button>
      )}

      {/* Display name player */}
      {player && (
        <div className="absolute top-20 text-4xl font-bold text-slate-600 font-mono">
          Lượt quay của <b className="text-red-600">{player}</b>
        </div>
      )}

      <div className="absolute top-20 left-12 w-[450px]">
        <img src="../public/text-logo.png" className="" alt="textlogo" />
      </div>

      {/* Volume */}
      <div className="absolute bottom-20 left-12">
        <IconButton
          onClick={() => {
            setIsPlay(!isPlay);
          }}
          className=""
        >
          {isPlay ? <VolumeUpIcon /> : <VolumeMuteIcon />}
        </IconButton>
      </div>
      {/* Audio section */}
      <audio ref={audioBgElm} loop>
        <source src={audioBg} type="audio/mpeg" />
      </audio>
      <audio ref={audioClapElm}>
        <source src={audioCp} type="audio/mpeg" />
      </audio>

      {/* Nyan Cat */}
      {/* <div id="tsparticles" className="absolute bottom-20 left-24 w-[400px]">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            autoPlay: true,
            background: {
              color: {
                value: "#043564",
              },
              image:
                "url('https://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
              position: "0 50%",
              repeat: "no-repeat",
              size: "60%",
              opacity: 1,
            },
            backgroundMask: {
              composite: "destination-out",
              cover: {
                color: {
                  value: "#fff",
                },
                opacity: 1,
              },
              enable: false,
            },
            clear: true,
            defaultThemes: {},
            delay: 0,
            fullScreen: {
              enable: false,
              zIndex: 0,
            },
            detectRetina: true,
            duration: 0,
            fpsLimit: 120,
            interactivity: {
              detectsOn: "window",
              events: {
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                onDiv: {
                  selectors: [],
                  enable: false,
                  mode: [],
                  type: "circle",
                },
                onHover: {
                  enable: false,
                  mode: [],
                  parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10,
                  },
                },
                resize: {
                  delay: 0.5,
                  enable: true,
                },
              },
              modes: {
                trail: {
                  delay: 1,
                  pauseOnStop: false,
                  quantity: 1,
                },
                attract: {
                  distance: 200,
                  duration: 0.4,
                  easing: "ease-out-quad",
                  factor: 1,
                  maxSpeed: 50,
                  speed: 1,
                },
                bounce: {
                  distance: 200,
                },
                bubble: {
                  distance: 200,
                  duration: 0.4,
                  mix: false,
                  divs: {
                    distance: 200,
                    duration: 0.4,
                    mix: false,
                    selectors: [],
                  },
                },
                connect: {
                  distance: 80,
                  links: {
                    opacity: 0.5,
                  },
                  radius: 60,
                },
                grab: {
                  distance: 100,
                  links: {
                    blink: false,
                    consent: false,
                    opacity: 1,
                  },
                },
                push: {
                  default: true,
                  groups: [],
                  quantity: 4,
                },
                remove: {
                  quantity: 2,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                  factor: 100,
                  speed: 1,
                  maxSpeed: 50,
                  easing: "ease-out-quad",
                  divs: {
                    distance: 200,
                    duration: 0.4,
                    factor: 100,
                    speed: 1,
                    maxSpeed: 50,
                    easing: "ease-out-quad",
                    selectors: [],
                  },
                },
                slow: {
                  factor: 3,
                  radius: 200,
                },
                light: {
                  area: {
                    gradient: {
                      start: {
                        value: "#ffffff",
                      },
                      stop: {
                        value: "#000000",
                      },
                    },
                    radius: 1000,
                  },
                  shadow: {
                    color: {
                      value: "#000000",
                    },
                    length: 2000,
                  },
                },
              },
            },
            manualParticles: [],
            particles: {
              bounce: {
                horizontal: {
                  value: 1,
                },
                vertical: {
                  value: 1,
                },
              },
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: "#ffffff",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                },
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: [],
              },
              groups: {},
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 3000,
                    y: 3000,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                distance: {},
                direction: "left",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                  bottom: "out",
                  left: "out",
                  right: "out",
                  top: "out",
                },
                random: false,
                size: false,
                speed: 6,
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: true,
                trail: {
                  enable: false,
                  length: 10,
                  fill: {},
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: false,
                  width: 1920,
                  height: 1080,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: 100,
              },
              opacity: {
                value: 0.5,
                animation: {
                  count: 0,
                  enable: false,
                  speed: 2,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              reduceDuplicates: false,
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {
                  star: {
                    sides: 5,
                  },
                },
                type: "star",
              },
              size: {
                value: {
                  min: 1,
                  max: 4,
                },
                animation: {
                  count: 0,
                  enable: false,
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              stroke: {
                width: 0,
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              destroy: {
                bounds: {},
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    value: 3,
                  },
                  rate: {
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                  particles: {},
                },
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              tilt: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              life: {
                count: 0,
                delay: {
                  value: 0,
                  sync: false,
                },
                duration: {
                  value: 0,
                  sync: false,
                },
              },
              rotate: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  value: 45,
                },
                width: 1,
              },
              links: {
                blink: false,
                color: {
                  value: "#fff",
                },
                consent: false,
                distance: 100,
                enable: false,
                frequency: 1,
                opacity: 1,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              repulse: {
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            responsive: [],
            smooth: false,
            style: {},
            themes: [],
            zLayers: 100,
            name: "Nyan Cat 2",
            motion: {
              disable: false,
              reduce: {
                factor: 4,
                value: true,
              },
            },
          }}
        />
      </div> */}

      {/* List User */}
      <div className="absolute bottom-6 right-6  z-20">
        <Player setPlayer={setPlayer} />
      </div>

      {/* Confetti */}
      {confetti && (
        <div
          className="absolute z-[1301] w-full h-full"
          onClick={handleCloseModalWinner}
        >
          <Confetti width={size.width} height={size.height} />
        </div>
      )}

      {/* Modal Winning */}
      <Modal
        open={openModalWinner}
        onClose={handleCloseModalWinner}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={Congrat}
            alt=""
            className="absolute w-32 left-0 top-0 -z-10"
          />
          <img
            src={Congrat}
            alt=""
            className="absolute w-32 right-0 top-0 -z-10 -scale-x-100"
          />
          <img
            src={prizeWinning.image?.uri}
            alt=""
            className="w-[200px] h-[200px] rounded-md mx-auto block"
          />

          <div className="text-center text-2xl font-bold bg-gradient-to-r from-[#DE4DAA] to-[#F6D327] bg-clip-text text-transparent">
            Xin Chúc Mừng!
          </div>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            textAlign="center"
          >
            {player} đã trúng <b>{prizeWinning.option}</b>
          </Typography>
          <div className="text-center w-full">
            <i className="text-sm mt-2">{prizeWinning.description}</i>
          </div>

          {/* <div className="w-full flex justify-center">
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: 2, paddingX: 5 }}
              onClick={handleCloseModalWinner}
            >
              Xác nhận
            </Button>
          </div> */}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
