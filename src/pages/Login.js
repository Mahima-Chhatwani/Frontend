import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'


const Login = ()=>{
const[formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
});
const[error, setError] = useState(null)
const[validationError, setValidationError] = useState({
    username:'',
    email:'',
    password:''
});
const {login} = useContext(AuthContext);
const navigate = useNavigate();

const {username, email, password} = formData;

const validateForm = ()=>{
    let isValid = true;
    const errors = {
        username:'',
        email:'',
        password:''
    };

    if(!username) {
        errors.username = 'Username is required';
        isValid = false;
    }else if(username.length>10){
      errors.username = 'Username must contain more than 10 characters '
      isValid = false;
    }else if(!/^[a-zA-Z0-9_]+$/.test(username)){
      errors.username = 'Username can only contain letters, numbers, and underscores'
      isValid = false;
    }

    if(!email){
        errors.email = 'Email is required';
        isValid= false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        errors.email = 'Invalid email format'
        isValid = false;
    }

     if(!password){
        errors.password = 'Password is required';
        isValid = false;
     }else if(password.length<= 6){
        errors.password = 'Password must be atleast 6 characters long';
        isValid = false;
}else if(!/[A-Z]/.test(password)){
    errors.password = 'Password must contain one uppercase letter';
    isValid= false
}else if(!/[a-z]/.test(password)){
    errors.password = 'Password must contain one lowercase letter'
    isValid = false;
}else if(!/[0-9]/.test(password)){
    errors.password = 'Password must contain one number';
    isValid = false;
}else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)){
    errors.password = 'Password must contain one special character';
    isValid = false;
}

setValidationError(errors)
return isValid;
};

const onChange = e=>{
    setFormData({...formData, [e.target.name]:  e.target.value})
    setValidationError({
        username:'',
        email:'',
        password:''
    });
};

const onSubmit = async e =>{
    e.preventDefault();
    if(!validateForm()) return;

    try{
        const result = await login({username, email, password});

        if (result === true){
            navigate('/profile');
        }else{
            setError(result.error);
        }
    }
    catch(err){
      setError(err.message)
    }
};

return(
    <div className='form-container'>
     <h1>Sign In</h1>
     <p>Login into your Account</p>

     {error && <div className='alert alert-danger'>{error}</div>}


     <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='username'>User Name</label>
        <input type='text' name='username' id='username' value={username} onChange={onChange} required />
     {validationError.username && <div className='alert alert-danger'>{validationError.username}</div>}
      </div>

      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={email} onChange={onChange} required />
        {validationError.email && <div className='alert alert-danger'>{validationError.email}</div>}
      </div>

      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' value={password} onChange={onChange} required />
        {validationError.password && <div className='alert alert-name'>{validationError.password}</div>}
      </div>

      <button type='submit' className='btn btn-primary'>Login</button>
     </form>

     <p>
        Don't have an account <Link to='/register'>Register</Link>
     </p>
    </div>
)

}

export default Login;



