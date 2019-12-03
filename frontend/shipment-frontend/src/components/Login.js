import React,{ Component } from 'react'
import axios from 'axios'
import baseUrl from '../base_url'
import history from '../history'
import Navbar from './Navbar'

/*
Login component show basic form with email and password field if users credentials are good
user will be redirected to Mydashboard else an alert will be shown stating invalid credentials.
*/
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: '',
          email: ''
        };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        axios.request ({
            url:baseUrl + '/accounts/login',
            method: 'post',
            data: {
                email: this.state.email,
                password:this.state.password
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'X-Requested-With'
            }
        })
        .then(function(response){
            console.log(response.data)
            localStorage.setItem('user_token',response.data.data.token)
            localStorage.setItem('username',response.data.data.username)
            localStorage.setItem('email',response.data.data.email)
            localStorage.setItem('id',response.data.data.id)
            console.log(localStorage.getItem('user_token'))
            history.push('/Mydashboard')
            
        })
        .catch(function(error){
            console.log(error)
            alert(error.response.data.error.message)
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    componentDidMount(){
        if (localStorage.getItem('username')){
            history.push('/Mydashboard')
        }
    }
    render(){
    return(
        <div className="container">
            <Navbar />
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Email</label>
                    <div className="input-field col s6">
                        <input id="email" type="email" className="validate" required="required" onChange = { this.handleChange }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Password</label>
                    <div className="input-field col s6">
                    <input id="password" type="password" className="validate" required="required" onChange = { this.handleChange }/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <button type="submit"
                                id="blog_post_submit"
                                className="btn-default btn">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
}
export default Login