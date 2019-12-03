import React,{ Component } from 'react'
import axios from 'axios'
import baseUrl from '../base_url'
import history from '../history'
import Navbar from './Navbar'
/*
Add Component will be used to add shipment. It will take address, item name and payment choice from user
and call backend api with those information. If successfull user will be redirected to Mydashboard
where they will be able to see new shipment else an alert will be shown with proper error message.
*/
class Addshipment extends Component {
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
        console.log(this.state)
        if (payment_choice.includes(this.state.payment_choice)){
            if (this.state.payment_choice === 'Card'){
                payment_choice = 1
            }else{
                payment_choice = 2
            }
        
        axios.request ({
            url:baseUrl + '/accounts/shipment/',
            method: 'post',
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
            console.log(response.data)
            alert('Shipment added successfully')
            history.push('/Mydashboard')
            
        })
        .catch(function(error){
            console.log(error)
            alert(error.response.data.error.message)
        })
    }else{
        alert("Invalid Payment Choice. Please enter either Cash or Card")
    }}
    handleChange(e) {
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleCancel(){
        history.push('/Mydashboard')
        }

    
    
    render(){
    return(
        <div className="container">
            <Navbar />
            <h3>Add your Shipment</h3>
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
                            Add
                        </button>
                        <button id="cancel" value='Cancel'
                            className="btn btn-danger btn-block red right" onClick = {this.handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
               
            </form>
            
        </div>
        
    )
}
}
export default Addshipment