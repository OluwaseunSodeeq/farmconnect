import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();
    const BackHandler = () => {
       router.back("/home");
    }
  return <div className=" border rounded-full h-10 w-10 bg-green-300 flex items-center justify-center fixed bottom-8 right-8 shadow-lg z-50">
    <ArrowLeft size={20} className="cursor-pointer" onClick={BackHandler} />
  </div>
};
