import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Replace these with your EmailJS credentials
      // Get them from https://www.emailjs.com/
      const serviceId = 'YOUR_SERVICE_ID'
      const templateId = 'YOUR_TEMPLATE_ID'
      const publicKey = 'YOUR_PUBLIC_KEY'

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )

      setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again or email me directly at avrahamstato@example.com' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-24 pb-16">
      <section className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <em className="text-primary">Interested?</em>
          </h2>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Contact Me
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Let's discuss how we can work together to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-surface p-8 rounded-xl border border-primary/20">
            <h3 className="text-xl font-bold text-primary mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary text-text-primary border border-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-text-muted mb-2">
                  Your Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary text-text-primary border border-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-text-muted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary text-text-primary border border-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-text-muted mb-2">
                  Your Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary text-text-primary border border-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y transition-all"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-bg-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Resume Download */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-surface p-8 rounded-xl border border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">Email</h4>
                    <a href="mailto:avrahamstato@example.com" className="text-text-muted hover:text-primary transition-colors">
                      avrahamstato@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">💼</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/avrahamstato" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                      linkedin.com/in/avrahamstato
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xl">💻</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">GitHub</h4>
                    <a href="https://github.com/stato10" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                      github.com/stato10
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Download Section */}
            <div className="bg-surface p-8 rounded-xl border border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-4">Download Resume</h3>
              <p className="text-text-muted text-sm mb-6">
                Download my resume to learn more about my experience and skills
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 w-full justify-center"
              >
                <span>📄</span>
                Download Resume (PDF)
                <span>↓</span>
              </a>
              <p className="text-xs text-text-muted mt-3 text-center">
                Or view my <a href="#skills" className="text-primary hover:text-accent">skills section</a> for a quick overview
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
