import airlineLogos from "../../lib/logo";

interface BannerPorps {
  images: string[];
  speed: number;
  keyString: string;
}

export function ImageSection({ images, speed, keyString }: BannerPorps) {
  const imagesStyle = {
    animation: `swipe ${speed}s linear infinite`,
  };

  return (
    <div className="images-airlines" style={imagesStyle}>
      {images.map((imageName, index) => (
        <img
          key={keyString + imageName + Math.random().toString()}
          src={`/AirlinesLogosForFlightCard/${imageName}.png`}
          alt={`Airline Logo ${index}`}
          className="imglogo-banner-airlines"
        />
      ))}
    </div>
  );
}

export default function AirLinesLogos() {
  return (
    <div className="banner-wrapper-airlines">
      <div className="wrapper-airlines">
        <ImageSection images={airlineLogos} speed={130} keyString="banner1" />
        <ImageSection images={airlineLogos} speed={130} keyString="banner2" />
      </div>
    </div>
  );
}
