import { useNavigate, useParams } from "react-router-dom";
import {
  CarInfoVM,
  PersonalInfoVM,
  ResumeVM,
  TemplateVM,
} from "../api";
import { AxiosResponse } from "axios";
import resumesService from "../services/resumes-service";
import { useEffect, useRef, useState } from "react";
import personalInfoService from "../services/personalInfo-service";
import templatesService from "../services/templates-service";
import Handlebars from "handlebars";
import {debounce} from "lodash";
import carInfoService from "../services/car-info-service";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from 'file-saver';
import ReactModal from "react-modal";
import SharePDFModal from "../components/SharePDFModal";
import UploadPersonalPhotoComponent from "../components/UploadPersonalPhotoComponent";
import UploadCarPhotoComponent from "../components/UploadCarPhotoComponent";

interface UserData {
  FullName: string;
  ImageUrl: string;
  Contacts: {
	  Address: string;
	  PhoneNumber: string;
	  Email: string;
	};
	CarInfo: {
		Brand: string;
		Model: string;
		YearOfManufacture: string;
		Description: string;
		Color: string;
		Price: string;
		Distance: string;
		Engine: string;
		Status: string;
		CarImageUrl: string;
  };
}

export const Resumes = () => {
  const [resume, setResume] = useState<ResumeVM | null>(null);
  const [templateContent, setTemplateContent] = useState<string>("");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoVM | null>(null);
  const [carInfo, setCarInfo] = useState<CarInfoVM | null>(null);
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [templates, setTemplates] = useState<Array<TemplateVM>>([]);

  const [isOpenShareModal, setIsOpenShareModal] = useState<boolean>(false);
  const [isOpenChangePhotoModalPersonalImage, setisOpenChangePhotoModalPersonalImage] =
    useState<boolean>(false);
  const [isOpenChangePhotoModalCarImage, setisOpenChangePhotoModalCarImage] =
    useState<boolean>(false);

  const navigator = useNavigate();
  const id = useParams().id;
  const templateRef = useRef<HandlebarsTemplateDelegate>(
    Handlebars.compile("")
  );

  useEffect(() => {
    try {
      (async () => {
        await UpdateResume();
      })();
    } catch (error) {
      console.log(error);
      navigator("/panel/myresumes");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await templatesService.makeGetTemplateFromIdRequest(
        resume?.templateId || "") as AxiosResponse<TemplateVM>;

      setTemplateContent(response.data.content || "");
      templateRef.current = Handlebars.compile(response.data.content || "");
    })();

  } , [resume?.templateId, templateContent]);

	useEffect(() => {
		const debouncedUpdate = debounce(async () => {
			try {
				if (!userData) {
					return;
				}

				await personalInfoService.makePutPersonalInfoRequest(
					resume?.personalInfoId || "",
					userData?.FullName || "",
					userData?.Contacts.Address || "",
					userData?.Contacts.PhoneNumber || "",
					userData?.Contacts.Email || "",

				);

				await resumesService.makeUpdateResumeFromIdRequest(
					resume?.id || "",
					resume?.title || "",
					resume?.templateId || "",
				);

				await carInfoService.makePutCarInfoRequest(
					resume?.carInfoId || "",
					userData?.CarInfo.Brand || "",
					userData?.CarInfo.Model || "",
					userData?.CarInfo.YearOfManufacture || "",
					userData?.CarInfo.Description || "",
					userData?.CarInfo.Distance || "",
					userData?.CarInfo.Color || "",
					userData?.CarInfo.Price || "",
					userData?.CarInfo.Engine || "",
					userData?.CarInfo.Status || "",
				);

				toast.success(`Resume updated successfully.`, {
					position: "bottom-center",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			} catch (error: any) {
				if (
					error.response?.data.errors[
						Object.keys(error.response?.data.errors)[0]
					]
				) {
					toast.error(
						`${
							error.response.data.errors[
								Object.keys(error.response?.data.errors)[0]
							]
						}`,
						{
							position: "bottom-center",
							autoClose: 2500,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "dark",
						},
					);
				} else {
					toast.error(`Error updating resume.`, {
						position: "bottom-center",
						autoClose: 2500,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});
				}
			}
		}, 1000);

		debouncedUpdate();

		return () => {
			debouncedUpdate.cancel();
		};
	}, [resume?.templateId, resume?.title, userData]);

  

const UpdateResume = async () => {
		try {
			const templatesResponse =
				(await templatesService.makeGetTemplatesRequest()) as AxiosResponse<
					TemplateVM[]
				>;

			setTemplates(templatesResponse.data);

			const response = (await resumesService.makeGetResumeFromIdRequest(
				id || "",
			)) as AxiosResponse<ResumeVM>;

			if (!response.data.templateId) {
				response.data.templateId = "";
			}

			if (!response.data.personalInfoId) {
				response.data.personalInfoId = "";
			}

			if (!response.data.carInfoId) {
				response.data.carInfoId = "";
			}

			setResume(response.data);

			const templateResponse =
				(await templatesService.makeGetTemplateFromIdRequest(
					response.data.templateId,
				)) as AxiosResponse<TemplateVM>;

			setTemplateContent(templateResponse.data.content || "");
			//setTemplate(Handlebars.compile(templateResponse.data.content || ""));
			templateRef.current = Handlebars.compile(
				templateResponse.data.content || "",
			);
			const personalInfoResponse =
				(await personalInfoService.makeGetPersonalInfoRequest(
					response.data.personalInfoId,
				)) as AxiosResponse<PersonalInfoVM>;

			setPersonalInfo(personalInfoResponse.data);

			const carInfoResponse = (await carInfoService.makeGetCarInfoRequest(
				response.data.carInfoId,
			)) as AxiosResponse<CarInfoVM>;

			setCarInfo(carInfoResponse.data);

			setUserData({
				FullName: personalInfoResponse.data.fullName ?? "",
				ImageUrl: personalInfoResponse.data.personImageURL ?? "",
				Contacts: {
					Address: personalInfoResponse.data.address ?? "",
					PhoneNumber: personalInfoResponse.data.phoneNumber ?? "",
					Email: personalInfoResponse.data.email ?? "",
				},
				CarInfo: {
					Brand: carInfoResponse.data.brand ?? "",
					Model: carInfoResponse.data.model ?? "",
					YearOfManufacture: carInfoResponse.data.yearOfManufacture ?? "",
					Description: carInfoResponse.data.description ?? "",
					Color: carInfoResponse.data.color ?? "",
					Distance: carInfoResponse.data.distance ?? "",
					Price: carInfoResponse.data.price ?? "",
					Status: carInfoResponse.data.status ?? "",
					Engine: carInfoResponse.data.engine ?? "",
					CarImageUrl: carInfoResponse.data.carImageURL ?? "",
				},
			});
		} catch (error) {
			console.log(error);
			navigator("/panel/myresumes");
		}
	};

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUserData((userData: UserData | null) => {
      if (!userData) {
        return null;
      }

      return {
        ...userData,
        Contacts: {
          ...userData.Contacts,
          [name]: value,
        },
        CarInfo: {
          ...userData.CarInfo,
          [name]: value,
        },
        [name]: value,
      };
    });
  };

  

  // const handleCarInfoChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
  //   const { name, value } = event.target;

  //   setUserData((userData: UserData | null) => {
  //     if (!userData) {
  //       return null;
  //     }

  //     return {
  //       ...userData,
  //       CarInfo: userData.CarInfo.map((carInfo, i) => 
  //         i === index ? { ...carInfo, [name]: value } : carInfo
  //       ),
  //     };
  //   });
  // };
  const b64toBlob = async (base64: string, type = 'application/octet-stream') => 
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())

  return (
		<>
			<ReactModal
				isOpen={isOpenShareModal}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						zIndex: 10,
					},
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
					},
				}}
			>
				<SharePDFModal
					onCloseModal={() => setIsOpenShareModal(!isOpenShareModal)}
					id={resume?.id || ""}
				/>
			</ReactModal>

			<ReactModal
				isOpen={isOpenChangePhotoModalPersonalImage}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						zIndex: 10,
					},
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
					},
				}}
			>
				<UploadPersonalPhotoComponent
					onCloseModal={async () => {
						setisOpenChangePhotoModalPersonalImage(!isOpenChangePhotoModalPersonalImage);
						await UpdateResume();
					}}
					personalInfoVM={personalInfo || ({} as PersonalInfoVM)}
				/>
			</ReactModal>

			<ReactModal
				isOpen={isOpenChangePhotoModalCarImage}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				style={{
					overlay: {
						zIndex: 10,
					},
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
					},
				}}
			>
				<UploadCarPhotoComponent
					onCloseModal={async () => {
						setisOpenChangePhotoModalCarImage(!isOpenChangePhotoModalCarImage);
						await UpdateResume();
					}}
					carInfoVM={carInfo || ({} as CarInfoVM)}
				/>
			</ReactModal>

			<div className="flex flex-row space-x-4 translate-y-20 -translate-x-40 scale-95">
				<div className="w-[100%]">
					<h2>You are editing: {resume?.title}</h2>
					<div className="flex flex-row space-x-5 justify-between my-4">
						<button
							onClick={() => setisOpenChangePhotoModalPersonalImage(!isOpenChangePhotoModalPersonalImage)}
						>
							Update your photo
						</button>
						<button
							onClick={async () => {
								try {
									toast.success(
										`Your resume is being generated. Please wait!`,
										{
											position: "bottom-center",
											autoClose: 2500,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: "dark",
										},
									);

									const response = await resumesService.downloadResumeAsPdf(
										resume?.id || "",
									);

									const pdfBlob = new Blob([await b64toBlob(response.data)], {
										type: '"application/pdf"',
									});
									saveAs(pdfBlob, `${resume?.title}.pdf`);

									toast.success(`Resume downloaded successfully!`, {
										position: "bottom-center",
										autoClose: 2500,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: "dark",
									});
								} catch (error) {
									toast.error(
										`Error downloading resume. Please try again later!`,
										{
											position: "bottom-center",
											autoClose: 2500,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: "dark",
										},
									);
								}
							}}
						>
							Download as PDF
						</button>
						<button
							onClick={() => {
								setIsOpenShareModal(!isOpenShareModal);
							}}
						>
							Share as PDF
						</button>
					</div>

					<div className="flex flex-col space-y-4">
						<div className="flex justify-start">
							<strong>Personal Information:</strong>
						</div>
						<div className="flex flex-row space-x-4 justify-between">
							<div className="flex flex-col text-left">
								<label htmlFor="FullName">Full names:</label>
								<input
									className="bg-[#F5F5F5]"
									title="Full name"
									type="text"
									name="FullName"
									value={userData?.FullName}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col text-left">
								<label htmlFor="Address">Address:</label>
								<input
									className="bg-[#F5F5F5]"
									title="Address"
									type="text"
									name="Address"
									value={userData?.Contacts.Address}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col text-left">
								<label>Email:</label>
								<input
									className="bg-[#F5F5F5]"
									type="email"
									name="Email"
									value={userData?.Contacts.Email}
									onChange={handleChange}
								/>
							</div>
							<div className="flex flex-col text-left">
								<label>Phone:</label>
								<input
									className="bg-[#F5F5F5]"
									type="tel"
									name="PhoneNumber"
									value={userData?.Contacts.PhoneNumber}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="flex justify-start">
							<strong>Car Information:</strong>
						</div>
						<button
							onClick={() => setisOpenChangePhotoModalCarImage(!isOpenChangePhotoModalCarImage)}
						>
							Update car photo
						</button>
						<div className="space-y-4">
							<div className="flex justify-between">
								<div className="flex flex-col text-left">
									<label>Brand:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Brand"
										value={userData?.CarInfo.Brand}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col text-left">
									<label>Model:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Model"
										value={userData?.CarInfo.Model}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex justify-between">
								<div className="flex flex-col text-left">
									<label>Year of manufacturing:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="YearOfManufacture"
										value={userData?.CarInfo.YearOfManufacture}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col text-left">
									<label>Engine:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Engine"
										value={userData?.CarInfo.Engine}
										onChange={handleChange}
									/>
								</div>
								{/* <div className="flex flex-col text-left">
                    <label>Start date:</label>
                    <input className="bg-[#F5F5F5]"
                      type="date"
                      name="StartDate"
                      value={new Date(Date.parse(carInfo.StartDate))
                        .toISOString()
                        .substring(0, 10)}
                      onChange={(event) => handleCarInfoChange(event, index)}
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <label>End date:</label>
                    <input className="bg-[#F5F5F5]"
                      type="date"
                      name="EndDate"
                      value={
                        carInfo.EndDate
                          ? new Date(Date.parse(carInfo.EndDate))
                              .toISOString()
                              .substring(0, 10)
                          : ""
                      }
                      onChange={(event) => handleCarInfoChange(event, index)}
                    />
                  </div> */}
							</div>
							<div className="flex justify-between">
								<div className="flex flex-col text-left">
									<label>Distance travelled:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Distance"
										value={userData?.CarInfo.Distance}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col text-left">
									<label>Status:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Status"
										value={userData?.CarInfo.Status}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="flex justify-between">
								<div className="flex flex-col text-left">
									<label>Price:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Price"
										value={userData?.CarInfo.Price}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col text-left">
									<label>Color:</label>
									<input
										className="bg-[#F5F5F5]"
										type="text"
										name="Color"
										value={userData?.CarInfo.Color}
										onChange={handleChange}
									/>
								</div>
							</div>

							<label className="flex flex-col text-left">
								Description:
								<textarea
									className="bg-[#F5F5F5]"
									name="Description"
									value={userData?.CarInfo.Description}
									onChange={handleChange}
								/>
							</label>
							{/* <button
                  onClick={async () => {
                    try {
                      await carInfoService.MakeDeleteCarInfoRequest(
                        carInfo.Id
                      );

                      await UpdateResume();

                      toast.success(`Education deleted successfully.`, {
                        position: "bottom-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    } catch (error) {
                      toast.error(`Error deleting carInfo.`, {
                        position: "bottom-center",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    }
                  }}
                >
                  Delete this information for the car!
                </button> */}
						</div>
					</div>
				</div>
				<div
					className="max-w-[489px] min-w-[400px] text-left ml-[50%]"
					dangerouslySetInnerHTML={{
						__html: templateRef.current ? templateRef.current(userData) : "",
					}}
				/>
			</div>
			<ToastContainer />
		</>
	);
};
