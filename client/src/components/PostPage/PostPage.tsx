/* eslint-disable @typescript-eslint/no-unused-vars */
import PostCard from "./PostCard";
import PostContent from "./PostContent";
import PostComments from "./PostComents";
// import { API_BASE_URL } from "../../config";

const PostList = () => {
  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-700 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 grid grid-cols-2">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-20">
          <PostCard />
          <PostComments />
        </div>
      </main>
      <div className="py-8 px-4">
        <PostContent />
      </div>
    </div>
  );
};

export default PostList;
