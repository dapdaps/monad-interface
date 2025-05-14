import LoginLayout from "@/layouts/login";

const LoginLayoutPage = (props: any) => {
  const { children } = props;

  return (
    <LoginLayout className="">
      {children}
    </LoginLayout>
  );
};

export default LoginLayoutPage;
