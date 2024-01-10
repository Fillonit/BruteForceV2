interface Post {
  _id: string;
  title: string;
  imageURL: string;
  content: string[];
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: string;
  likes: number;
  views: number;
}

interface PostCardProps {
  post: Post | null;
}

const PostContent: React.FC<PostCardProps> = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <div key={post._id} className="relative font-tektur">
      <p className="text-black text-base dark:text-white">{post.content}</p>
    </div>
  );
};

export default PostContent;
