import Image from 'next/image'

export default function Home() {
    return (
      <div>
        <div style={{ width: '100%', position: 'relative', height: '400px'}}>
          <Image src="/cover.jpg" alt="error" layout="fill" objectFit="cover"/>
        </div>
        <div className="container mx-auto px-4 py-6" />
          <section className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Hi, I&apos;m Xinyi Lu</h1>
            
            <p className="text-xl mb-8">A data and software engineer passionate about building AI-driven solutions. With experience in GenAI, NLP, and backend development in the finance industry, I am driven to solve complex problems at the intersection of AI, data science, and engineering.</p>
            <div className="flex justify-center gap-4">
              <a href="/about" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Learn More
              </a>
            </div>
          </section>
      </div>
    )
  }