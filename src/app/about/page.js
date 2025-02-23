import Gallery from "@/components/gallery";

export default function About() {
  return (
    <div className="container flex mx-auto px-4 py-12">
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <p className="mb-6">I am driven by curiosity and a passion for solving complex problems. With a strong ability to learn quickly, I excel at transforming ideas into effective, real-world solutions. </p>
        <p className="mb-6">I graduated from National University of Singapore (NUS) with a BSc (Honours) in Business Analytics, double major in Statistics and have been working in the finance industry as a GenAI and backend developer. My interest lies in leveraging Generative AI to solve business pain points. 
          For example, building Retrieval-Augmented Generation chatbots to reduce time taken to comb through lengthy documents.
        </p>
        <p className="mb-6">
          In my free time, I enjoy hiking, yoga and volunteering to support youth and elderly causes.
        </p>
        <p>Feel free to connect with me on <u><a href="https://www.linkedin.com/in/xinyi-lu-35b72917a/">LinkedIn</a></u>!</p>
      </div>
      <div className="w-1/2 p-4 ml-auto mt-6">
        <Gallery />
      </div>
    </div>
  );
}