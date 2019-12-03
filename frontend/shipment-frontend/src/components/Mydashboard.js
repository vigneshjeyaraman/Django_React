import React,{ Component } from 'react'
import Navbar from './Navbar'
import history from '../history'
import axios from 'axios'
import baseUrl from '../base_url'

/*
This Component will be called once user is able to login successfully into our web app.
We have used 5 functions here.
1. componentDidMount() - This is react life cycle method which get called as soon as component loads.
We have checked first whether localstorage has username key if yes then user came via login else user might
have entered the url directly so it show alert like login to continue and redirect user to login.

2. handleDelete() - This will get called when user wants to delete any shipments. It receives shipment id as 
an argument and call backend delete api.

3.  handleEdit() - This will get called when user wants to update shipment detail and clicks on edit button.
It will redirect user to Updateshipment.

4. handleAdd() - This will get called if user clicks add symbol and redirects user to Addshipment where
user can add new shipments.

5. logout() - This will get called when user clicks on logout symbol and we have cleared localstorage 
inside this. Once logout is successfull user will redirect to login.
*/
class Mydashboard extends Component { 
    constructor() {
        super();
    
        this.state = {
          shipments: []
        };
        
      }
    handleDelete(id){
        let r = window.confirm('Are you sure?')
        if (r){
            axios.request({
                url:baseUrl + '/accounts/shipment/'+id+'/',
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':'X-Requested-With',
                    'Authorization':'Token '+ localStorage.getItem('user_token')
                }
            })
            .then((response) =>{
                    console.log(response.data);
                    const shipments = this.state.shipments.filter(shipment => {
                        return shipment.id !== id
                      });
                      this.setState({
                        shipments
                      });
                    console.log(this.state);
                    alert(response.data.data.message)
                    })
            .catch((error) =>{
                console.log(error)
                alert(error.response.data.error.message)
                
            }) 
        }
    }
    handleEdit(id){
        history.push('/Updateshipment/'+id)
    }
    addShipment(){
        history.push('/Addshipment')
    }
    componentDidMount(){
        if (!localStorage.getItem('username')){
            alert('Please login to continue')
            history.push('/Login')
        }
        axios.request({
            url:baseUrl + '/accounts/shipment',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'X-Requested-With',
                'Authorization':'Token '+ localStorage.getItem('user_token')
            }
        })
        .then((response) =>{
        this.setState({
            shipments:response.data
        })
        })
        .catch((error) =>{
            console.log(error)
            alert(error.response.data.error.message)
        })
    }
    logout(){
        localStorage.clear()
        alert('Thank you for using shipment. Have a great day!')
        history.push('/Login')
    }
    render(){
            let payment_choice
            let created_at 
            const shipments = this.state.shipments.length ? (this.state.shipments.map(shipment =>{
                created_at = new Date(shipment.created_at)
                created_at = created_at.getFullYear()+'-' + (created_at.getMonth()+1) + '-'+created_at.getDate();
                
                if (shipment.payment_choice === 1){
                        payment_choice="Card"
                }else{
                    payment_choice = "Cash"
                }
                return (
                    <div className="collection-item" key={shipment.id}>
                        <table className="striped">
                            {/* <tr>
                                <td><strong>Item name</strong></td>
                                <td><strong>Address</strong></td>
                                <td><strong>Arriving at</strong></td>
                                <td><strong>Ordered at</strong></td>
                                <td><strong>Payment mode</strong></td>
                            </tr> */}
                            <tbody>
                            <tr>
                                <td align="right">{shipment.item_name}</td> 
                                <td align="right">{shipment.address}</td>
                                <td align="right">{shipment.arriving_at}</td>
                                <td align="right">{created_at}</td>
                                <td align="right">{payment_choice}</td>
                                <td><button className="btn waves-effect waves-light btn-small red" onClick = {() => {this.handleDelete(shipment.id)}}>Delete</button></td>
                                <td><button className="btn waves-effect waves-light btn-small green" onClick = { () =>{this.handleEdit(shipment.id)}}>Edit</button></td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                )
                    }) 
            ) : 
            (
                <p className="center"><strong>You don't have any shipment's pending</strong></p>
            )   
      
            
    return(
        <div className="container">
            <Navbar />
            <div>
                <button className="btn-floating btn-medium green right" onClick = {this.logout}><i className="material-icons"><img src="./images/logout.svg" alt="logout" width="40px" align="center"/></i></button>
                <h3>Welcome, {localStorage.getItem('username')}</h3>
                <h4>Your Shipments</h4>
                <button className="btn-floating btn-medium green right" onClick = {this.addShipment}><i className="material-icons"><img src="./images/add.png" alt="add" width="40px" align="center"/></i></button>
                <table className="striped">
                    <thead>
                        <tr>
                            <td><strong>Item name</strong></td>
                            <td><strong>Address</strong></td>
                            <td><strong>Arriving at</strong></td>
                            <td><strong>Ordered at</strong></td>
                            <td><strong>Payment mode</strong></td>
                        </tr>
                    </thead>
                </table>
                <div className='center'>{ shipments }</div>
            </div>
        </div>
    )
}
}
export default Mydashboard