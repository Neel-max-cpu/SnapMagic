// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [generatedImage, setGeneratedImage] = useState<string>("");
//   const [prompt, setPrompt] = useState<string>("");

//   const generateImage = async () => {
//     if (prompt.length === 0) {
//       return;
//     }

//     const apiKey = process.env.NEXT_PUBLIC_STABLE_API_KEY; 
//     const engineId = 'stable-diffusion-v1-6';
//     const apiHost = 'https://api.stability.ai';

//     try {
//       const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           text_prompts: [{ text: prompt }],
//           cfg_scale: 7,
//           height: 1024,
//           width: 1024,
//           steps: 30,
//           samples: 1,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`${response.status}: ${errorData.message}`);
//       }

//       const responseData = await response.json();
//       if (responseData.artifacts && responseData.artifacts.length > 0) {
//         const base64Image = responseData.artifacts[0].base64;
//         const imageUrl = `data:image/jpeg;base64,${base64Image}`;
//         setGeneratedImage(imageUrl);
//       } else {
//         throw new Error("No image data found in the response.");
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         window.alert("Error: " + error.message);
//       } else {
//         window.alert("An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-black from-45% via-purple-500 via-70% to-white to-90% pt-10 flex items-top justify-center h-screen">
//       <main className="max-w-xl mx-auto">
//         <h1 className="text-white text-3xl font-bold mb-8">
//           Generate your AI Image
//         </h1>

//         <section className="max-w-full">
//           <div className="flex items-center">
//             <input
//               type="text"
//               id="prompt"
//               name="prompt"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className="rounded-l-lg py-3 px-4 w-full text-black focus:outline-none"
//               placeholder="Enter your prompt here"
//             />
//             <button 
//               onClick={generateImage}
//               className="text-white bg-gradient-to-r from-yellow-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-r-lg py-3 px-4 ml-1 font-semibold"
//             >
//               Generate
//             </button>
//           </div>
//         </section>

//         <section className="mt-8 max-w-full">
//           {!generatedImage && (
//             <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
//               <div className="text-md text-white">
//                 Image will be generated here!
//               </div>
//             </div>
//           )}
//           {generatedImage && (
//             <div className="flex items-center justify-center">
//               <img
//                 src={generatedImage}
//                 alt="Generated Image"
//                 className="w-2/3 rounded-lg hover:scale-105 duration-300"
//               />
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  const generateImage = async () => {
    setLoading(true);
    if (prompt.length === 0) {
      setLoading(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_STABLE_API_KEY; // Ensure this is defined in .env.local
    const engineId = 'stable-diffusion-v1-6';
    const apiHost = 'https://api.stability.ai';

    setLoading(true); // Set loading to true while generating

    try {
      const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status}: ${errorData.message}`);
      }

      const responseData = await response.json();
      if (responseData.artifacts && responseData.artifacts.length > 0) {
        const base64Image = responseData.artifacts[0].base64;
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image data found in the response.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        window.alert("Error: " + error.message);
      } else {
        window.alert("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Set loading back to false when generation is done
    }
  };

  return (
    <div className="bg-gradient-to-b from-black from-45% via-purple-500 via-70% to-white to-90% pt-10 flex items-top justify-center h-screen">
      <main className="max-w-xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">
          Generate your AI Image
        </h1>

        <section className="max-w-full">
          <div className="flex items-center">
            <input
              disabled={loading}
              type="text"
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="rounded-l-lg py-3 px-4 w-full text-black focus:outline-none"
              placeholder="Enter your prompt here"
            />
            <button 
              disabled={loading} // Disable button when loading
              onClick={generateImage}
              className={`text-white bg-gradient-to-r from-yellow-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 rounded-r-lg py-3 px-4 ml-1 font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Generating...' : 'Generate'} {/* Change button text based on loading state */}
            </button>
          </div>
        </section>

        <section className="mt-8 max-w-full">
          {loading && (
            <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
              <div className="flex flex-col items-center">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#b8c480",
                    "#B2A3B5",
                    "#F4442E",
                    "#51E5FF",
                    "#429EA6",
                  ]}
                />
                <div className="mt-2 text-md font-semibold text-gray-300">
                  Generating...
                </div>
              </div>
            </div>
          )}

          {!loading && !generatedImage && (
            <div className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-md w-full p-10">
              <div className="text-md text-gray-600">
                Image will be generated here!
              </div>
            </div>
          )}

          {!loading && generatedImage && (
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
