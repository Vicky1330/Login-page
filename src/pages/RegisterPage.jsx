import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Input,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { userRegister } from "../controllers/userController";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    console.log(data);
    const response = await userRegister(data);
    if(response.status == 201){
      console.log(response);
      navigate("/login")
    }else{
      console.log(response.message);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-96 ">
            <CardHeader className="flex flex-col gap-3">
              <Image
                alt="nextui logo"
                height={100}
                radius="md"
                src="/peakpx.jpg"
                width={100}
              />
              <div className="flex flex-col">
                <p className="text-4xl">Sage</p>
                <p className="text-small text-center text-default-500">
                  Sensei
                </p>
              </div>
            </CardHeader>
            {/* <Divider /> */}
            <CardBody>
              <div className="flex flex-col justify-center gap-5">
                <div>
                    <Input
                    isRequired
                    type="name"
                    label="Name"
                    // defaultValue="junior@nextui.org"
                    className="max-w-md"
                    {...register("name", { required: true })}
                    />
                    {errors.name && <span className="mt-0 text-white-600">This field is required</span>}
                </div>
                <div>
                    <Input
                    isRequired
                    type="phoneNumber"
                    label="Phone Number"
                    // defaultValue="junior@nextui.org"
                    className="max-w-md"
                    {...register("phoneNumber", { required: true })}
                    />
                    {errors.phoneNumber && <span className="mt-0 text-white-600">This field is required</span>}
                </div>

                <div>
                    <Input
                    isRequired
                    type="email"
                    label="Email"
                    // defaultValue="junior@nextui.org"
                    className="max-w-md"
                    {...register("email", { required: true })}
                    />
                    {errors.email && <span className="mt-0 text-white-600">This field is required</span>}
                </div>
                <div>
                    <Input
                    isRequired
                    type="password"
                    label="Password"
                    // defaultValue="junior"
                    className="max-w-md"
                    {...register("password", { required: true })}
                    />
                    {errors.password && <span>This field is required</span>}
                </div>
              </div>
            </CardBody>
            {/* <Divider /> */}
            <CardFooter className="justify-center">
              <Button type="submit" color="success">
                Sign up
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
