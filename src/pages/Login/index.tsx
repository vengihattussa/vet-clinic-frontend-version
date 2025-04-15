import {Box, Button, Flex, Image} from "@chakra-ui/react";
import FormInput from "@src/common/Form/Input";
import {addRefreshToken, addToken} from "@src/hooks/storage";
import {useUserLogin} from "@src/services/auth";
import {ILoginProps} from "@src/services/auth/interface";
import {useAuth} from "@src/store/index";
import {useForm} from "react-hook-form";
import Logo from "@src/assets/logo1.svg";
const defaultValues = {
  username: "",
  password: "",
};

const Login = () => {
  const {setIsAuth} = useAuth();
  const methods = useForm({
    defaultValues,
  });

  const {handleSubmit, control} = methods;
  const {mutate} = useUserLogin();
  const onSubmit = (data: ILoginProps) => {
    mutate(data, {
      onSuccess: (res) => {
        addToken(res.data.token);
        addRefreshToken(res.data.refreshToken);
        setIsAuth(true);
      },
    });
  };
  return (
    <Box position={"relative"}>
      <Box
        shadow={"lg"}
        bg="white"
        p={5}
        width={"500px"}
        position="absolute"
        top=" 50%"
        left="50%"
        transform="translate(-50%, 50%)"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Flex flexDirection={"column"} gap={3}>
          <Box display={"flex"} justifyContent={"center"}>
            <Image src={Logo} alt="Log" objectFit={"contain"} width="100px" height="60px" />
          </Box>
          <FormInput
            control={control}
            name="username"
            label="Username"
            groupAlignDirection="column"
          />
          <FormInput
            control={control}
            name="password"
            label="Password"
            groupAlignDirection="column"
            type="password"
          />
        </Flex>
        <Button fontSize={"md"} mt={5} height={"35px"} type="submit">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};
export default Login;
