

export default function Home() {
  return (
    <div className="bg-black mt-10 flex items-center justify-center min-h-screen">
      <main className="max-w-xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          Generate your AI Image
        </h1>

        <section className="max-w-full">
          <div className="flex items-center">
            <input
              type="text"
              id="prompt"
              name="prompt"
              className="rounded-l-lg py-3 px-4 w-full text-gray-300 focus:outline-none"
              placeholder="Enter your prompt here"
            />

            <button className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-r-lg py-3 px-4 ml-1 font-semibold">
              Generate
            </button>
          </div>
        </section>

        <section className="mt-8 max-w-full">
          <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
            <div className="text-md text-gray-600">
              Image will be generated here!
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
