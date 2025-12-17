import project2 from '../../assets/project2.png'

function Post1() {
  return (
    <main className="pt-24 pb-16">
      <article className="container-custom max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Designing Nostalgic User Interfaces for Mobile
        </h2>
        <div className="text-sm text-text-muted mb-6">
          March 6, 2025 &nbsp;|&nbsp; UI/UX
        </div>
        <img
          src={project2}
          alt="Retro UI illustration"
          className="w-full h-auto rounded-lg mb-6"
        />
        <div className="prose prose-invert max-w-none space-y-4 text-text-muted">
          <p>
            Have you ever felt a wave of nostalgia when booting up an old console or navigating through a retro operating system? There's a certain magic to the user interfaces of the past. While modern design trends favour minimalism and efficiency, older interfaces were often unapologetically quirky and full of character.
          </p>
          <p>
            In this article we explore how recreating classic interfaces—like the original Xbox dashboard or early media players—can inform present‑day mobile design. By analysing the layout, typography and interaction patterns of these legacy systems, we can glean inspiration for engaging, intuitive experiences that also tug at the heart strings of users who grew up with them.
          </p>
          <p>
            We'll cover techniques for modernising retro aesthetics, such as blending skeuomorphic elements with flat design, and using motion graphics to guide users through complex menus. We'll also discuss the importance of accessibility and how to balance authenticity with usability on small screens.
          </p>
          <p>
            Whether you're a designer looking for fresh ideas or a developer interested in experimentation, reimagining nostalgic UIs can be a rewarding creative exercise that connects the past to the future.
          </p>
        </div>
      </article>
    </main>
  )
}

export default Post1



