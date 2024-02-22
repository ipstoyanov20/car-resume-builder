import { Link } from "react-router-dom";
const Home = () => {
	return (
		<>
			<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-10]"></div>
			<video
				className="bg-black w-full h-full object-cover z-[-5] opacity-70 scale-x-[150%] scale-y-[130%]"
				autoPlay
				muted
				loop
				onPlay={(e) => e.currentTarget.play()}
				onPause={(e) => e.currentTarget.play()}
			>
				<source src="/mercedez.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="grid place-items-center grid-cols-2 absolute left-0 top-0 w-[100%] h-[100%]">
				<div className="grid place-content-center w-[50%] h-[100%]">
					<h1 className="font-opsOne w-[100%] text-left font-bold text-white">
						Build a professional <strong>CV</strong> for {" "}
						<strong>CARS</strong>
					</h1>
					{/* <img src="https://carresumestorage.blob.core.windows.net/resumesimages/mwcf5jcc.mvf126b0c95-805f-4e72-ad6f-8c2eef9240d1.png" alt="Mercedes" className="w-1/2" /> */}
					<Link
						to="/login"
						className=" relative bg-opacity-10 backdrop-blur-sm font-medium grid w-44 mt-5 text-left rounded-lg text-white transition-all duration-500 h-20 place-content-center text-bold bg-gradient-to-t from-[#CE1D00] to-[#F1A300] opacity-90 hover:opacity-100"
					>
						START CREATING
					</Link>
				</div>
			</div>
		</>
	);
};
export default Home;
