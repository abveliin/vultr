import React, { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";
import Head from "next/head";
import Hero from "../src/modules/Hero/Hero";
import Instagram from "../src/modules/Instagram/Instagram";
import Slider from "../src/modules/slider/Slider";
import Para from "../src/modules/parallax/Parallax_1";

interface FormData {
  title: string;
  content: string;
  id: string;
}

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];

  ig_feed: any;
}

export default function Home({ notes, ig_feed }: Notes) {
  const [aspect_ratio, set_aspect_ratio] = useState(0);
  useEffect(() => {
    const height: number = window.innerHeight;
    const width: number = window.innerWidth;

    let aspect_ratio = width / height;
    if (aspect_ratio <= 9 / 16) aspect_ratio = 9 / 16;
    if (aspect_ratio >= 16 / 9) aspect_ratio = 16 / 9;
    set_aspect_ratio(aspect_ratio);
  }, []);

  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });

  const router = useRouter();

  const refresh_data = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      if (data.id) {
        fetch(`http://localhost:3000/api/note/${data.id}`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
        });
      } else {
        fetch(`http://localhost:3000/api/note/create`, {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      }
      refresh_data();
    } catch (error) {
      console.log(error);
    }
  }

  const delete_fn = async (id: string) => {
    try {
      await fetch(`217.69.10.168/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        console.log("delete");
        refresh_data(); // for updating the retreiving list after a submit
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submit_fn = async (data: FormData) => {
    try {
      // DOMPurify.sanitize(data)
      create(data);
      setForm({ title: "", content: "", id: "" });
      console.log("here we have data", data);
      refresh_data();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative bg-slate-200">
      <Head>
        <title>ODDI</title>
      </Head>

      <Hero
        heading="ODDI in collaboration with OISDG"
        message="what we care about"
      />

      <Slider />
      <Para />

      <h1 className="text-center font-bold text-2xl mt-4">Notes for testing</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit_fn(form);
        }}
        className="w-auto min-w-[75%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title I'm testing postgres in VPS"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />

        <textarea
          placeholder="Content...."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />

        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>

      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex">
                    <button
                      onClick={() => delete_fn(note.id)}
                      className="bg-red-500 text-white p-1 mr-2"
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        setForm({
                          title: note.title,
                          content: note.content,
                          id: note.id,
                        });
                      }}
                      className="bg-blue-500 text-white p-1 mr-2"
                    >
                      modifier
                    </button>

                    <h1 className="font-bold">{note.title}</h1>
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Instagram ig_feed={ig_feed} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    // created_at and updated_at can be dificult to retreive that's why I add these parameters in findMany function
    select: {
      title: true,
      id: true,
      content: true,
    },
    orderBy: { created_at: "desc" },
  });

  const ig_url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`;

  const data = await fetch(ig_url);
  const ig_feed = await data.json();

  console.log("insta posts", ig_feed.data);

  return {
    props: {
      notes,
      ig_feed,
    },
  };
};
