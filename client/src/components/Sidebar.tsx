import React, { useEffect, useRef, useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [month, setMonth] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsByMonth = async () => {
      setMonth(1);
      try {
        const response = await fetch(`/api/posts/month/${month}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          console.log(posts);
        } else {
          console.error("Error fetching posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsByMonth();
  }, [month]);

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

  const postsByMonth = [
    { month: "January 2023", posts: ["Post 1", "Post 2"] },
    { month: "February 2023", posts: ["Post 3", "Post 4"] },
  ];

  const popularTags = ["React", "Node.js", "TypeScript", "Tailwind CSS"];

  return (
    <div ref={sidebarRef}>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-[0.625rem] rounded-lg fixed bottom-2 left-2 text-white dark:text-white bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0"
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
        className={`w-[300px] p-4 bg-white rounded-lg fixed left-0 top-1/4 z-50 transition delay-150 duration-300 ease-in-out  ${
          isSidebarOpen ? "translate-x-[-100%]" : "translate-x-[0%]"
        }`}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Posts by Month</h2>
          <ul>
            {postsByMonth.map(({ month, posts }) => (
              <li key={month} className="mb-1">
                <h6>{month}</h6>
                <ul className="ml-4">
                  {posts.map((post) => (
                    <li key={post}>{post}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Popular Tags</h2>
          <ul>
            {popularTags.map((tag) => (
              <li key={tag} className="mb-3">
                <span className="bg-purple-500 p-1 rounded">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
