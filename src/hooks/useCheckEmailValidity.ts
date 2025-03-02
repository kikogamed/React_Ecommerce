import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "valid" | "notValid" | "failed";

const useCheckEmailValidity = () => {
    const [ emailValidityStatus, setEmailValidityStatus ] = 
        useState<TStatus>("idle");

    const [ prevEmail, setPrevEmail ] = useState<null | string>(null);

    const checkEmailValidity = async (email: string) => {
        setEmailValidityStatus("checking");
        setPrevEmail(email);

        try {
            const response = await axios.get(`/users?email=${email}`);
            
            if(!response.data.length) {
                setEmailValidityStatus("valid");
            }
            else {
                setEmailValidityStatus("notValid");
            }
        } catch(error) {
            setEmailValidityStatus("failed");
        }

    }

    const resetCheckEmailValidity = () => {
        setEmailValidityStatus("idle");
        setPrevEmail(null);
    }

    return { emailValidityStatus, prevEmail, checkEmailValidity, resetCheckEmailValidity }
}

export default useCheckEmailValidity;