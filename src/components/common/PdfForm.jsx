import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL } from "@/api/base-url";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

let referralCache = null;
let referralFetchPromise = null;

export default function PdfJoinDialog({
    course,
    buttonlabel,
}) {

    const [formData, setFormData] = useState({
        userName: "",
        userMobile: "",
        userEmail: "",
        userLocation: "",
        userMessage: "",
        referred_from: "",
        userType: course || "",
        userCourse: course || "",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
    });
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const [referral, setReferral] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setFormData({
            ...formData,
            utm_source: params.get("utm_source") || "",
            utm_medium: params.get("utm_medium") || "",
            utm_campaign: params.get("utm_campaign") || "",
        });
    }, []);

    useEffect(() => {
        const loadReferral = async () => {
            if (referralCache) {
                setReferral(referralCache);
                return;
            }
            if (referralFetchPromise) {
                const data = await referralFetchPromise;
                setReferral(data);
                return;
            }

            referralFetchPromise = axios.get(`${BASE_URL}/api/fetch-webreffer`)
                .then(res => {
                    const data = res.data.data || [];
                    referralCache = data;
                    setReferral(data);
                    return data;
                })
                .catch(error => {
                    referralFetchPromise = null;
                    console.error("Error fetching referral:", error);
                    return [];
                });
        };

        loadReferral();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
        if (name === "userMobile") {
            updatedValue = value.replace(/\D/g, "").slice(0, 10);
        }
        setFormData({ ...formData, [name]: updatedValue });
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name];
            return updatedErrors;
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.userName.trim()) newErrors.userName = "Full name is required";
        if (!formData.userMobile.trim())
            newErrors.userMobile = "Mobile number is required";
        if (!formData.userEmail.trim()) newErrors.userEmail = "Email is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post(
                `${BASE_URL}/api/create-webenquiry`,
                formData,
                { headers: { "Content-Type": "application/json" } },
            );
            if (res.data.code == "200") {
                toast.success(res.data.msg || "Broucher sent to Your gmail successfully!");
                setFormData({
                    userName: "",
                    userMobile: "",
                    userEmail: "",
                    userLocation: "",
                    userMessage: "",
                    reffered_from: "",
                    userType: course || "",
                    userCourse: course || "",
                    utm_source: "",
                    utm_medium: "",
                    utm_campaign: "",
                });
            } else {
                toast.error(res.data.msg || "Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error(
                error.response?.data ||
                error.message ||
                "Something went wrong. Please try again.",
            );
        } finally {
            setLoader(false);
        }
    };

    const inputStyle = "focus:border-[#F3831C]";

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex w-1/2 items-center justify-center">
                    <Button className="bg-[#F3831C] rounded-3xl text-white px-10 py-2.5 font-semibold hover:bg-[#F3831C]/90 transition-all cursor-pointer">
                        {buttonlabel || "More Info"}
                    </Button>
                </div>
            </DialogTrigger>


            <DialogContent
                className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[calc(100%-2rem)] sm:w-full sm:max-w-lg
          max-h-[90dvh]
          flex flex-col
          rounded-xl
          p-0
          z-999
          overflow-hidden
        "
            >
                {/* ── Fixed header (never scrolls away) ── */}
                <div className="relative shrink-0 px-4 pt-5 pb-3 sm:px-6 sm:pt-6">
                    <DialogClose asChild>
                        <button className="absolute right-3 top-3 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-[#F3831C] cursor-pointer transition-colors">
                            <X size={20} />
                        </button>
                    </DialogClose>
                </div>

                {/* ── Scrollable form body ── */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-[#0F3652]">Full Name *</Label>
                                <Input
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                                {errors.userName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-[#0F3652]">Mobile Number *</Label>
                                <Input
                                    name="userMobile"
                                    type="tel"
                                    value={formData.userMobile}
                                    onChange={handleChange}
                                    className={inputStyle}
                                    maxLength={10}
                                />
                                {errors.userMobile && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.userMobile}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label className="text-[#0F3652]">Email Address *</Label>
                            <Input
                                name="userEmail"
                                type="email"
                                value={formData.userEmail}
                                onChange={handleChange}
                                className={inputStyle}
                            />
                            {errors.userEmail && (
                                <p className="text-red-500 text-xs mt-1">{errors.userEmail}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                            <div>
                                <Label className="text-[#0F3652]">Location</Label>
                                <Input
                                    name="userLocation"
                                    value={formData.userLocation}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Submit is inside the scroll area — always reachable by scrolling */}
                        <Button
                            type="submit"
                            disabled={loader}
                            className="w-full bg-[#0F3652] hover:bg-[#0c2c42] text-white py-2.5 rounded-none cursor-pointer mt-1"
                        >
                            {loader ? "Submitting..." : "Submit Now"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
