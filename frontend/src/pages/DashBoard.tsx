import { useEffect } from "react";
import userService from "../services/user-service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteBlob } from "../components/Blob";
export const DashBoard:React.FC = () => {
  const [userData, setUserData] = useState({
    fName: '',
    lName: '',
  });
  useEffect(() => {
    try {
      (async () => {
        const response = await userService.makeGetCurrentUserRequest();
        setUserData({
          fName: response.data.firstName,
          lName: response.data.lastName,
        });
      }
      )();
      
    } catch (error) {

      console.log(error);
    }
  }, []);
    return (
			<>
				<SiteBlob />
				<div className="text-black z-1 absolute w-[90%] h-[100%] top-0 right-0 grid place-items-center ">
					<div className=" w-[80%] h-[50%] group z-10 relative rounded-md shadow-xl bg-[#ffffff]  opacity-80 backdrop-blur-sm">
						<strong className="font-bold p-5 text-2xl text-left absolute top-[-15%] left-0">
							{"Welcome " + userData.fName + " " + userData.lName}
						</strong>
						<hr className="bg-[#F1A300] w-[20%] absolute right-0 h-1 group-hover:w-[100%] transition-all duration-500" />

						<div className="relative w-[100%] h-[100%] grid place-items-center">
							<div className="relative w-[90%] h-[60%] bg-[#F1A300]/50 rounded-md ">
								<h2 className="absolute font-bold left-0 top-[-15%]">
									Overview
								</h2>
								<table className="table-fixed w-[100%] h-[100%] ">
									<tbody>
										<tr>
											<td className="font-bold transition-all duration-150 rounded-md hover:bg-[#F1A300]/25">
												<Link
													to="/panel/settings"
													className="font-bold text-black"
												>
													Account Settings
												</Link>
											</td>
											<td className="transition-all duration-150 rounded-md hover:bg-[#F1A300]/25">
												View your information and update as needed
											</td>
										</tr>
										<tr>
											<td className="font-bold transition-all duration-150 rounded-md hover:bg-[#F1A300]/25">
												<Link
													to="/panel/myresumes"
													className="font-bold text-black"
												>
													My Resumes
												</Link>
											</td>
											<td className="transition-all duration-150 rounded-md hover:bg-[#F1A300]/25">
												View your resume and create a new one
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		);
}