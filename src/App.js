import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "./assets/IMG-0889.jpg";
import img2 from "./assets/IMG-0891.jpg";
import img3 from "./assets/IMG-0901.jpg";
import img4 from "./assets/IMG-0907.jpg";
import img5 from "./assets/IMG-0915.jpg";
import img6 from "./assets/IMG-0925.jpg";
import img7 from "./assets/IMG-0939 2.jpg";
import img8 from "./assets/IMG-0944.jpg";
import img9 from "./assets/IMG-1076.jpg";
import img10 from "./assets/IMG-1112.jpg";
import img11 from "./assets/IMG-1192.jpg";
import img12 from "./assets/IMG-1244.jpg";
import img13 from "./assets/IMG-1281.jpg";
import img14 from "./assets/IMG-1294.jpg";
import map from "./assets/villapaje.png";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
function App() {
  const imageArray = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14
  ];
  return (
    <div className="App">
      <header
        style={{
          color: "white",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <p>Villa of Sweden</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BsFillTelephoneFill
            style={{ marginRight: "0.5rem", cursor: "pointer" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "0.5rem"
            }}
          >
            <a>WhatsApp +46-768670210</a>
            <a>Local +255-715168659</a>
          </div>
        </div>
      </header>
      <section>
        <div>
          <Carousel autoPlay={true}>
            {imageArray?.map((img, i) => (
              <div key={i} style={{ width: "100%", height: "50%" }}>
                <img src={img} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <div>
        <img src={map} style={{ width: "100%", height: "70%" }} />
      </div>
      <header
        style={{
          color: "white",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <p>Villa of Sweden</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BsFillTelephoneFill style={{ marginRight: "0.5rem" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "0.5rem"
            }}
          >
            <a>WhatsApp +46-768670210</a>
            <a>Local +255-715168659</a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
