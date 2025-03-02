import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import Input from "@components/forms/input";
import useLogin from "@hooks/useLogin";


const Login = () => {
    
    const  {
        loading,
        error,
        submitForm,
        register,
        formState: { errors },
        handleSubmit,
        searchParams
    } = useLogin();


    return (
        <>
        <h2>User Login</h2>

        <Row>
        <Col md={{ span: 6, offset: 3 }}>
            {
                searchParams.get("message") === "account_created" && 
                <Alert>Your Acount Created Successfully, Please Login!</Alert>
            }
            <Form onClick={handleSubmit(submitForm)}>
  
                <Input 
                    label="Email Address"
                    name="email"
                    error={errors.email?.message as string}
                    register={register}
                />
        
                <Input 
                    label="Password"
                    name="password"
                    error={errors.password?.message as string}
                    register={register}
                    type="password"
                />
    
                <Button variant="primary" type="submit" disabled={loading === "pending" ? true : false}>
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

export default Login;