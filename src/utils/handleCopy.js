import { toast } from "react-hot-toast";

export const handleCopy = (content) => {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      toast.success("Copied to clipboard!");
    })
    .catch((error) => {
      toast.error("Failed to copy content to clipboard");
      console.log(error, " copy error");
    });
};
