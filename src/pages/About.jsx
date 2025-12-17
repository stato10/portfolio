import aboutImg from '../assets/about_img.png'

function About() {
  return (
    <main className="pt-24 pb-16">
      <section className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 flex justify-center">
            <img
              src={aboutImg}
              alt="Profile illustration"
              className="w-full max-w-md rounded-lg"
            />
          </div>
          <div className="flex-1 lg:flex-[2]">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Hi. I'm Avraham, nice to meet you. Please take a look around!</h2>
            <p className="text-text-muted mb-8">
              I am passionate about building excellent software that improves the lives of those around me. I specialize in creating software for clients ranging from individuals and small-businesses all the way to large enterprise corporations. What would you do if you had a software expert available at your fingertips?
            </p>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6 text-center">About Me</h3>
              <p className="text-text-muted text-center mb-8">
                I'm a Full Stack Developer with expertise in building scalable web applications and robust backend systems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About

