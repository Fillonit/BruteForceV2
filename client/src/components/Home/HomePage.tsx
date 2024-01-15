import { Button, Card, Carousel } from "flowbite-react";
// import Doom from "../../assets/Doom.jpg";
import Hades from "../../assets/Hades.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-700 bg-gradient-to-br from-purple-400 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 pb-10">
      <div className="h-96">
        <Carousel
          onSlideChange={(index) => console.log("onSlideChange()", index)}
        >
          <div className="flex flex-col h-full items-center justify-center bg-gradient-to-r from-pink-700 to-purple-500 dark:text-white">
            <p className="text-2xl">BruteForce</p>
            <p className="text-2xl">Immerse into a world of games</p>
            <p className="text-2xl">More than a community</p>
          </div>
          <div className="flex flex-col h-full items-center justify-center bg-gradient-to-r from-green-500 to-blue-700 dark:text-white">
            <p className="text-2xl">BruteForce</p>
            <p className="text-2xl">Immerse into a world of games</p>
            <p className="text-2xl">More than a community</p>
          </div>
          <div className="flex flex-col h-full items-center justify-center bg-gradient-to-r from-rose-700 to-orange-500 dark:text-white">
            <p className="text-2xl">BruteForce</p>
            <p className="text-2xl">Immerse into a world of games</p>
            <p className="text-2xl">More than a community</p>
          </div>
        </Carousel>
      </div>
      <h1 className="text-3xl text-center mt-10 text-black dark:text-white">
        Features
      </h1>
      <div className="grid grid-cols-3 ml-16 mt-9">
        <Card
          className="max-w-sm"
          renderImage={() => (
            <img
              width={400}
              height={500}
              src={Hades}
              alt="..."
              className="rounded-md object-cover"
            />
          )}
        >
          <h5 className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            Welcome to BruteForce
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Immerse yourself in a world of gaming stories, tips, and
            discussions.
          </p>
          <Button gradientDuoTone="purpleToBlue" as={Link} to="/posts">
            Explore
          </Button>
        </Card>
        <Card
          className="max-w-sm"
          renderImage={() => (
            <img
              width={400}
              height={400}
              src={Hades}
              alt="..."
              className="rounded-md"
            />
          )}
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Engaging Blog Content
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Stay informed with our insightful blog posts covering the gaming
            world.
          </p>
          <Button gradientDuoTone="purpleToBlue" as={Link} to="/blog">
            Check it Out
          </Button>
        </Card>
        <Card
          className="max-w-sm"
          renderImage={() => (
            <img
              width={400}
              height={500}
              src={Hades}
              alt="..."
              className="rounded-md"
            />
          )}
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dive into Exciting Games
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Discover the latest gaming trends and explore a wide range of games.
          </p>
          <Button gradientDuoTone="purpleToBlue" as={Link} to="/games">
            Read More
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
