"use client";
import { useState } from "react";


export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const generateImage = async () => { // <-- add "async" to this function
    // setGeneratedImage(prompt);

    if (prompt.length === 0) {
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log(data);
  };


  return (
    
    <div className="bg-gradient-to-b from-black from from-45% via-purple-500 via-70% to-white to-90% pt-10 flex items-top justify-center h-svh">
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="rounded-l-lg py-3 px-4 w-full text-black focus:outline-none"
              placeholder="Enter your prompt here"
            />

            <button 
              onClick={generateImage}
              className="text-white bg-gradient-to-r from-yellow-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-r-lg py-3 px-4 ml-1 font-semibold">
              Generate
            </button>
          </div>
        </section>

        <section className="mt-8 max-w-full">
          {/* if image not generated then show blank */}
          {!generatedImage &&(
          <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
            <div className="text-md text-white">
              Image will be generated here!
            </div>
          </div>
          )}

          {/* if imgage is generated */}
          {generatedImage && (
            <div className="flex items-center justify-center">
              <img
                src={generatedImage}
                alt="Generated Image"
                className="w-2/3 rounded-lg hover:scale-105 duration-300"
              />
            </div>
          )}


        </section>
      </main>
    </div>
  );
}