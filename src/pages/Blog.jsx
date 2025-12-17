import { Link } from 'react-router-dom'
import project2 from '../assets/project2.png'
import project1 from '../assets/project1.png'

const blogPosts = [
  {
    id: 1,
    img: project2,
    title: 'Designing Nostalgic User Interfaces for Mobile',
    date: 'March 6, 2025',
    category: 'UI/UX',
    excerpt: 'How recreating classic user interfaces can inspire modern app design and delight a new generation of users.',
    slug: 'post1',
  },
  {
    id: 2,
    img: project1,
    title: 'Machine Learning in Everyday Apps',
    date: 'January 15, 2025',
    category: 'AI',
    excerpt: 'A beginner‑friendly overview of integrating ML algorithms into consumer applications.',
    slug: 'post2',
  },
]

function Blog() {
  return (
    <main className="pt-24 pb-16">
      <section className="container-custom max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Blog</h2>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl text-primary mb-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-xs text-text-muted mb-3">
                    {post.date} &nbsp;|&nbsp; {post.category}
                  </div>
                  <p className="text-sm text-text-muted mb-4">{post.excerpt}</p>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-primary font-semibold underline hover:text-accent transition-colors text-sm"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Blog



