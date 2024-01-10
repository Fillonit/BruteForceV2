import { Avatar } from "flowbite-react";

interface UserData {
  username: string;
  email: string;
  profile: {
    avatar: string;
  };
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProfileUserProps {
  user: UserData | null;
}

const UserInfo: React.FC<ProfileUserProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div key={user._id} className="relative font-tektur text-center">
      <Avatar img={user.profile.avatar} alt={user.username} rounded size="lg" />
      <p className="text-white text-base dark:text-white">{user.username}</p>
    </div>
  );
};

export default UserInfo;
