import React,{ Component } from 'react'
import axios from 'axios'
import baseUrl from '../base_url'
import history from '../history'
/*
Updateshipment component will be used to update the shipment user has created.
We will be allowing user to update the address, item_name and the payment choice.
Initially I have planned to show option field for payment choice but was not able to make html
select tag work so I have added additional if statement which can be removed in future if we use
react-select.
This component has 4 fuction 
1. componentDidMount()- This is one of the life cycle method of react which get called as soon as
component get load. We have called reterieve api here to fetch shipment detail so that we can show
pre-filled data.

2. handleSubmit() - This will get called when user hit submit after updating the data. 
For now Payment choice field is calculated using additional if statements.

3. handleChange() - This will get called for change in each input tag as we have used onChange event.
This fuction changes state based upon which input tag is changing.

4. handleCancel() - This fuction will get called when user hits cancel button and simply take user
back to their dashboard.

For accessing APIs we have used axios npm and for cors handling we have used chrome extension Access-Control
*/
class Updateshipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          address: '',
          item_name: '',
          payment_choice:''
        };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    handleSubmit(e) {
        e.preventDefault();
        let payment_choice = ['Card', 'Cash']
        if (payment_choice.includes(this.state.payment_choice)){
            if (this.state.payment_choice === 'Card'){
                payment_choice = 1
            }else{
                payment_choice = 2
            }
        
        axios.request ({
            url:baseUrl + '/accounts/shipment/' + this.props.match.params.id + '/',
            method: 'put',
            data: {
                item_name: this.state.item_name,
                payment_choice:payment_choice,
                address:this.state.address
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'X-Requested-With',
                'Authorization':'Token '+ localStorage.getItem('user_token')
            }
        })
        .then(function(response){
            alert('Update successfull')
            history.push('/Mydashboard')
            
        })
        .catch(function(error){
            alert(error.response.data.error.message)
        })
    }else{
        alert("Invalid Payment Choice. Please enter either Cash or Card")//Not able to make select tag work
    }}
    handleChange(e) {
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    componentDidMount(){
        axios.request({
            url:baseUrl + '/accounts/shipment/' + this.props.match.params.id + '/',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'X-Requested-With',
                'Authorization':'Token '+ localStorage.getItem('user_token')
            }
        })
        .then((response) =>{
            let api_data = response.data
            let payment_choice
            if (api_data.payment_choice === 1){
                payment_choice = "Card"
            }else{
                payment_choice = "Cash"
            }
            this.setState({
                address:api_data.address,
                item_name:api_data.item_name,
                payment_choice:payment_choice
            })
            })
        .catch((error) =>{
            alert(error.response.data.error.message)
        })
    }
    handleCancel(){
        history.push('/Mydashboard')
    }
    render(){
    return(
        <div className="container">
            <h3>Update your Shipment</h3>
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="blog_post_title">Address</label>
                    <div className="input-field col s6">
                        <input id="address" type="text" onChange = { this.handleChange } value={ this.state.address }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Item Name</label>
                    <div className="input-field col s6">
                    <input id="item_name" type="text" onChange = { this.handleChange } value = { this.state.item_name }/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Payment Choice</label>
                    <div className="input-field col s6">
                    <input id="payment_choice" type="text" onChange = { this.handleChange } value={ this.state.payment_choice }/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                        <button type="submit"
                                id="blog_post_submit"
                                className="btn-default btn green">
                            Update
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
export default Updateshipment