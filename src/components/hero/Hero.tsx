export function Hero() {
  return (
    <section className="w-full px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
          Hi, I'm <span className="text-accent-primary">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-4">
          Full-Stack Developer & Designer
        </p>
        <p className="text-lg text-text-muted max-w-2xl">
          I build modern web applications with a focus on performance, 
          accessibility, and beautiful user experiences. Passionate about 
          clean code and thoughtful design.
        </p>
      </div>
    </section>
  );
}
