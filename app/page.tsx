'use client';

import { createShortUrl } from "./actions"
import { useActionState } from "react";

const Home = () => {

  const [shortUrl,formAction] =useActionState(createShortUrl,null);

 
  return (
    <main className="min-h-screen bg-slate-200 ">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-black text-center">URL Shortener</h1>

          <form action={formAction} className="space-y-4">

            <input
              name="url"
              placeholder="https://example.com/very/long/url"
              required
              className="w-full p-4 border rounded-xl"
            />

              <button className="p-4 mx-auto block bg-blue-700 text-white rounded-xl hover:opacity-75">
                Shorten URL
              </button>

              {shortUrl && (
                <input 
                  value={shortUrl}
                  readOnly
                  className="w-full p-4 border rounded-xl"
                />
              )}
          </form>
      </div>
    </main>
  )
}

export default Home