const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div className="relative w-full mx-auto">
        <div className="relative z-10 text-center"> 
          <div className="mx-auto">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute left-0 top-0 w-full h-full shadow-lg"
                src="https://www.youtube.com/embed/HJ1x2IRMoqM?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&controls=0&iv_load_policy=3"
                title="Hero video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
