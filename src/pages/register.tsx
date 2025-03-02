import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Input from "@components/forms/input";
import useRegister from "@hooks/useRegister";


const Register = () => {

  const  {
      register,
      handleSubmit,
      formState: {errors},
      setFocus,
      error,
      loading,
      emailOnBlurHandler,
      emailValidityStatus,
      submitForm
  } = useRegister();

    return (
        <>
        <h2>User Registeration</h2>

        <Row>
        <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit(submitForm)}>
            
            <Input 
              label="First Name"
              name="firstName"
              error={errors.firstName?.message as string}
              register={register}
            />
  
            <Input 
              label="Last Name"
              name="lastName"
              error={errors.lastName?.message as string}
              register={register}
            />
  
            <Input 
              label="Email Address"
              name="email"
              error={
                errors.email?.message?
                  errors.email?.message
                :
                emailValidityStatus === "notValid" ?
                  "This email is already in use."
                :
                emailValidityStatus === "failed" ?
                  "Error from the server."
                :
                  ""
              }
              register={register}
              onBlur={emailOnBlurHandler}
              checkMessage={
                emailValidityStatus === "checking" ? 
                  "We're currently checking the availability of this email address. Please wait a moment."
                :
                  ""
              }
              successMessage={
                emailValidityStatus === "valid" ? 
                  "Email is valid"
                :
                  ""
              }
              
            />
      
            <Input 
              label="Password"
              name="password"
              error={errors.password?.message as string}
              register={register}
              type="password"
            />
  
            <Input 
              label="Confirm Password"
              name="confirmPassword"
              error={errors.confirmPassword?.message as string}
              register={register}
              type="password"
            />
  
            <Button 
              variant="primary" 
              type="submit"
              disabled={
                emailValidityStatus === "checking" || emailValidityStatus === "notValid"
                ? true 
                : false || loading === "pending"
              } 
              onMouseEnter={() => setFocus("email")}
            >
              {
                loading === "pending" ?
                <><Spinner animation="border" size="sm"></Spinner> Loading...</>
                :
                "Submit"
              }
            </Button>
            { error && <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p> }
            
          </Form>
         </Col>
        </Row>
        </>
      );
};

export default Register;