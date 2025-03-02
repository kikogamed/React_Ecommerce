import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLoginAuth } from "@store/auth/authSlice";
import { signInSchema, signInType } from "../validations/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";


const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector(state => state.authSlice);
    
    const [ searchParams, setSearchParams ] = useSearchParams();

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<signInType>({
        resolver: zodResolver(signInSchema),
        mode: "onSubmit"
    });

    const submitForm: SubmitHandler<signInType> = async (data) => {
        if (searchParams.get("message")) {
            setSearchParams("");
        }
        const { email, password } = data;
        dispatch(actLoginAuth({ email, password }))
        .unwrap()
        .then(() => navigate("/"));
    }

    const accessToken = useAppSelector(state => state.authSlice.accessToken);
    useEffect(() => {
        if(accessToken) {
            navigate("/");
        }
        return () => {
            dispatch(resetUI());
        }
    }, [dispatch])
    
    return {
        loading,
        error,
        submitForm,
        register,
        formState: { errors },
        handleSubmit,
        searchParams,
    }
}

export default useLogin;