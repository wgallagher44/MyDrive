

import {Link,TextField,Button,Stack} from "@mui/material"
import React, { useState, useEffect } from "react";


export default function App(){
    const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
    return <div>
              {/* <h1>{message}</h1> */}
        <Stack spacing={4}>
        <TextField id = "filled-basic" label = "Email"  variant="outlined"  />
        <TextField id = "filled-basic" label = "Password"  variant="outlined" />
        <Stack direction="row" spacing={10} useFlexGap alignItems="center" justifyContent="space-evenly">
            <Link href="/ForgotPassword" underline="none">Forgot Password</Link>
            <Link href="/CreateAccount" underline="none">Create Account</Link>   
        </Stack>
        
        </Stack>
        
    </div>
}