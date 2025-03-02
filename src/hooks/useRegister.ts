import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema ,signUpType } from "../validations/signUpSchema";
import useCheckEmailValidity from "@hooks/useCheckEmailValidity";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actRegisterAuth, resetUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useRegister = () => {
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(state => state.authSlice);
    const navigate = useNavigate();

    const { 
            register,
            handleSubmit,
            formState: {errors},
            getFieldState,
            trigger,
            setFocus
          } = useForm<signUpType>(
            {resolver: zodResolver(signUpSchema),
             mode: "onBlur"
            });

    // <signUpType> is called generic
    const submitForm: SubmitHandler<signUpType> = async (data) => {
        setFocus("email");
        const { firstName, lastName, email, password } = data;
        dispatch(actRegisterAuth({ firstName, lastName, email, password }))
        .unwrap()
        .then(() => navigate("/login?message=account_created"));
    }

    
    const {
            emailValidityStatus,
            prevEmail, 
            checkEmailValidity, 
            resetCheckEmailValidity 
          } = useCheckEmailValidity();

    const emailOnBlurHandler = async (event: React.FocusEvent<HTMLInputElement>) => {
      await trigger("email");
      const { isDirty, invalid } = getFieldState("email");
      const value = event.target.value;

      if(isDirty && !invalid && prevEmail !== value) {
        checkEmailValidity(value);
      }

      if(isDirty && invalid && prevEmail) {
        resetCheckEmailValidity();
      }
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
        register,
        handleSubmit,
        formState: {errors},
        setFocus,
        error,
        loading,
        emailOnBlurHandler,
        emailValidityStatus,
        submitForm
    }

}

export default useRegister;