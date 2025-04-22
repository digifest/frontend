import axios from "axios";
import { toastError } from "../utils/toast";

export const handleAxiosErrorWithToast = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toastError(error.response?.data.message, { id: "error" });
    throw new Error(error.response?.data.message);
  }

  toastError("An error occurred");
  throw new Error();
};
