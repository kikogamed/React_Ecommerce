import Lottie from "lottie-react";
import notFound from "@assets/LottieFiles/notFound.json";
import error from "@assets/LottieFiles/error.json";
import empty from "@assets/LottieFiles/empty.json";
import loading from "@assets/LottieFiles/loading.json";
import success from "@assets/LottieFiles/success.json";
import layoutLoading from "@assets/LottieFiles/layoutLoading.json"

const LottieTypes = {
    notFound,
    error,
    empty,
    loading,
    success,
    layoutLoading
}

type TLottieHandler = {
    type: keyof typeof LottieTypes,
    message?: string
}

const LottieHandler = ({ type, message }: TLottieHandler) => {
    const lottieType = LottieTypes[type];
    let messageColor = "black";
    if(lottieType === error) messageColor = "red";

    return (
    <div className={`d-flex flex-column align-items-center`}>
        <Lottie animationData={lottieType} style={{ width: "400px" }} />
        {message && <h3 style={{color: messageColor}}>{message}</h3>}
    </div>
    )
}

export default LottieHandler;