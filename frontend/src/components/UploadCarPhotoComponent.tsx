import { useState } from "react";
import carInfoService from "../services/car-info-service";
import { CarInfoVM } from "../api";
import { toast } from "react-toastify";


function UploadCarPhotoComponent({
	carInfoVM,
	onCloseModal,
}: {
	carInfoVM: CarInfoVM;
	onCloseModal: () => Promise<void>;
}) {
	const [isSending, setIsSending] = useState(false);
	const [file, setFile] = useState<Blob | undefined>(undefined);

	const uploadPhoto = async () => {
		try {
			setIsSending(true);

			toast.success(`Photo is being uploaded.`, {
				position: "bottom-center",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			await carInfoService.makePutCarInfoRequestWithFile(
				carInfoVM.id || "",
				carInfoVM.brand || "",
				carInfoVM.model || "",
				carInfoVM.yearOfManufacture || "",
				carInfoVM.description || "",
				carInfoVM.distance || "",
				carInfoVM.color || "",
				carInfoVM.price || "",
				carInfoVM.engine || "",
				carInfoVM.status || "",
				file,
			);

			toast.success(`Photo uploaded successfully.`, {
				position: "bottom-center",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setIsSending(false);
			await onCloseModal();
		} catch (error) {
			toast.error(`An error occurred while uploading the photo.`, {
				position: "bottom-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});

			setIsSending(false);
		}
	};
	return (
		<>
			<div className="m-5">
				<div className="text-center ">
					<label htmlFor="formFile" className="form-label">
						Upload Photo
					</label>
					<br></br>
				</div>
				<div className="flex items-center justify-center mb-6">
					<input
						className="form-control"
						type="file"
						id="formFile"
						onChange={(e) => setFile(e.target.files?.[0] || undefined)}
						accept="image/*"
						multiple={false}
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="rounded p-2.5 mx-3 text-white hover:text-green-400 transition-all duration-150 hover:bg-gray-600 bg-gray-500 btn btn-primary"
						onClick={uploadPhoto}
						disabled={isSending}
					>
						Upload
					</button>
					<button
						className="p-2.5 mx-3 text-white rounded hover:text-red-400 transition-all duration-150 hover:bg-gray-600 bg-gray-500  btn btn-secondary"
						onClick={onCloseModal}
						disabled={isSending}
					>
						Cancel
					</button>
				</div>
			</div>
		</>
	);
}

export default UploadCarPhotoComponent;