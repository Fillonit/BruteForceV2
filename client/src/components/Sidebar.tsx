import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

interface Post {
  author: string;
  _id: string;
  title: string;
  imageURL: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

interface Tag {
  _id: string;
  count: number;
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [popularTags, setPopularTags] = useState<Tag[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedOption, setSelectedOption] = useState<string>("");

  if (month === 13) {
    setMonth(1);
    setSelectedYear(selectedYear + 1);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (selectedOption === "year") {
          response = await fetch(`${API_BASE_URL}/posts/year/${selectedYear}`);
        } else if (selectedOption === "month") {
          response = await fetch(`${API_BASE_URL}/posts/month/${month}`);
        }

        if (response) {
          console.log("Response status:", response.status);
          if (response.ok && selectedOption === "month") {
            const data = await response.json();
            const sortedPosts = data.posts.sort(
              (a: Post, b: Post) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            setPosts(sortedPosts);
          } else if (response.ok) {
            const data = await response.json();
            setPosts(data.posts);
          } else {
            console.error("Error fetching posts:", response.statusText);
          }
        } else {
          console.error("Undefined Response");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    console.log(selectedYear);

    fetchPosts();
  }, [selectedOption, selectedYear, month]);

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/tags/popular`);
        if (response.ok) {
          const data = await response.json();

          const sortedTags = data.tags.sort(
            (a: Tag, b: Tag) => b.count - a.count
          );

          const top3Tags = sortedTags.slice(0, 3);

          setPopularTags(top3Tags);
        } else {
          console.error("Error fetching popular tags:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching popular tags:", error);
      }
    };

    fetchPopularTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div ref={sidebarRef}>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`p-[0.625rem] rounded-lg fixed bottom-2 left-2 text-white dark:text-white ${
          isSidebarOpen ? "bg-purple-400" : "bg-purple-600"
        }  hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0`}
      >
        <svg
          className="w-5 h-5text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 19"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"
          />
        </svg>
      </button>
      <div
        className={`w-[300px] p-4 bg-white rounded-lg fixed left-0 top-5 z-50 transition delay-150 duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-[-100%]" : "translate-x-[2%]"
        }`}
      >
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl text-gray-800 font-bold mb-2">
              Posts by {selectedOption}
            </h2>
            <div className="relative inline-block">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md ml-4 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500"
                id="selectMonthYear"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                defaultValue="month"
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                ></svg>
              </div>
            </div>
          </div>
          <ul className="flex flex-col">
            {posts.slice(0, 2).map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className="block mb-4"
              >
                <div className="max-w-[250px] max-h-[190px] bg-purple-700  rounded-lg shadow-md">
                  <img
                    src={post.imageURL}
                    alt={post.title}
                    className="w-full h-24 object-cover mb-2 rounded-t-lg"
                  />
                  <h6 className="text-sm text-white font-semibold px-2">
                    {post.title}
                  </h6>
                  {selectedOption === "month" && (
                    <>
                      <p className="text-xs text-slate-200 pb-2 pt-1 px-2">
                        Created :{" "}
                        {new Date(post.createdAt).toLocaleDateString(
                          undefined,
                          {
                            month: "long",
                          }
                        )}
                      </p>
                    </>
                  )}
                  {selectedOption === "year" && (
                    <>
                      <p className="text-xs text-slate-200 pb-2 pt-1 px-2">
                        Created : {selectedYear}
                      </p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Popular Tags</h2>
          {popularTags.length > 0 ? (
            <ul>
              {popularTags.map((tag) => (
                <li
                  key={tag._id}
                  className="mb-3 mr-2 transition-transform duration-300 hover:scale-105 inline-block cursor-pointer"
                >
                  <span className="bg-purple-700 text-white p-1 rounded">
                    {tag._id}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tags available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
