import React,{ Component } from 'react'
import axios from 'axios'
import baseUrl from '../base_url'
import history from '../history'
import Navbar from './Navbar';

/*
Signup component will have a form with field 
1. username
2. phone_number
3. email
4. password
Once user fills all the field and hits submit an api call will be made to signup the user.
If everything goes fine user will be signed up else proper error will be shown throught javascript
alert.
*/
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          email: '',
          password:'',
          phone_number:''
        };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
      if (localStorage.getItem('username')){
          history.push('/Mydashboard')
      }
  }
  
    handleSubmit(e) {
        e.preventDefault();
        axios.request ({
            url:baseUrl + '/accounts/signup',
            method: 'post',
            data: {
                username: this.state.username,
                email:this.state.email,
                password:this.state.password,
                phone_number:this.state.phone_number
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'X-Requested-With',
            }
        })
        .then(function(response){
            alert('Registration successfull please login.')
            history.push('/Login')
            
        })
        .catch(function(error){
            alert(error.response.data.error.message)
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleCancel(){
        history.push('/Login')
    }
    render(){
    return(
        <div className="container">
            <Navbar />
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="blog_post_title">UserName</label>
                    <div className="input-field col s6">
                        <input id="username" type="text" onChange = { this.handleChange }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Email</label>
                    <div className="input-field col s6">
                    <input id="email" type="email" onChange = { this.handleChange } />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Password</label>
                    <div className="input-field col s6">
                    <input id="password" type="password" onChange = { this.handleChange } />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Phone Number</label>
                    <div className="input-field col s6">
                    <input id="phone_number" type="text" onChange = { this.handleChange } />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <button type="submit"
                                id="blog_post_submit"
                                className="btn-default btn green">
                            Signup
                        </button>
                        <button className="btn-default btn red right"
                                onClick = {this.handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
        
    )
}
}
export default Signup