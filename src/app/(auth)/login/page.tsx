import { LoginForm } from "@/feutures/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

const Login = async()=>{
    await requireUnauth()
    return(
        <LoginForm />
    )
}

export default Login;