import project1 from '../../assets/project1.png'

function Post2() {
  return (
    <main className="pt-24 pb-16">
      <article className="container-custom max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Machine Learning in Everyday Apps
        </h2>
        <div className="text-sm text-text-muted mb-6">
          January 15, 2025 &nbsp;|&nbsp; AI
        </div>
        <img
          src={project1}
          alt="AI analytics illustration"
          className="w-full h-auto rounded-lg mb-6"
        />
        <div className="prose prose-invert max-w-none space-y-4 text-text-muted">
          <p>
            Machine learning (ML) has moved from research labs to devices in our pockets. From recommending your next favourite song to helping you type faster, ML models are quietly powering many features we now take for granted.
          </p>
          <p>
            In this post we demystify how ML can be integrated into everyday applications. We'll break down key concepts such as supervised and unsupervised learning, discuss the importance of dataset quality and share tips for choosing the right frameworks.
          </p>
          <p>
            We'll also look at practical examples, including on‑device models that run offline, cloud‑hosted APIs for complex tasks and ways to respect user privacy while still delivering personalised experiences. Whether you're an app developer exploring ML for the first time or a product manager curious about what's possible, this article provides a gentle introduction to getting started.
          </p>
        </div>
      </article>
    </main>
  )
}

export default Post2



