import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from '../components/WithRouter';
//import Navbar from '../components/Navbar';

class Profile extends React.Component {
    
    // activityDetails = {
    //     _id : '',
    //     farmerId : this.props.params.id,
    //     name: '',
    //     startDate: '',
    //     endDate: '',
    //     activityProof: '',
    //      people : [],  
    //      asset : [], 
    //      material : []
    // };


    constructor(props) {
        super(props);
        this.state = {activities: []};
       // this.state = {activityDetails : this.activityDetails};
    }

    componentDidMount() {
        let farmerId = this.props.params.id;
        console.log("farmer id : " + farmerId);
        fetch('/api/activity/'+farmerId)
            .then(response => response.json())
            .then(data => {this.setState({activities: data})
           // this.setState({activityDetails: data})
           });
    }

    async remove(id) {
        console.log("delete id : " + id);
        await fetch(`/api/activity/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
             let updatedActivity = [...this.state.activities].filter(i => i._id !== id);
             this.setState({activities: updatedActivity});
        });

     
    }

    render() {
       
        const {activities} = this.state;

        const mystyle = {
            // color: "white",
            // backgroundColor: "DodgerBlue",
            // padding: "10px",
            // fontFamily: "Arial",
            position:"relative",
            left:"70px", 
            top:"2px", 
            // right: "80px"
            //'color': 'green',
            //'border': '1px solid black'
            'textAlign': 'center',
          };

          const mainstyle = {
            'textAlign': 'center',
            'color': 'black',
          // 'border': '1px solid black'
            
            }

            const style1={
                'margin-left': '140px',
                'margin-right':'240px'
            } 
 
        let farmerId = this.props.params.id;

        // '/' required to avoid concatination to the previous links
        const linkId = "/activity/" + farmerId + "/";
        const peopleLinkId = "/activity/people/" ;
        
            const activityList = activities.map((activity,index) => 

            
           
             <div style={style1}><br></br><br></br><h5>Activities:{index + 1}</h5>
             
             
             
                
             <Table >
                <thead>
               
                <tr>
                    <th width="15%">Name</th>
                    <th width="10%" >Start Date</th>
                    <th width="10%" >End Date</th>
                    <th width="10%" >Activity Proof</th>  
                    <th width="30%" ><ButtonGroup><Button  tag={Link} to={linkId + "new"}>Add Activity</Button> <Button  onClick={() => this.remove(activity._id)}>Del Activity</Button></ButtonGroup></th>     
                </tr>
                </thead>

                <tr key={activity._id}>
                <td>{activity.name}</td>
                <td>{new Date(activity.startDate).getDate()}</td>
                <td>{new Date(activity.endDate).getDate()}</td>
                <td>{activity.activityProof}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={linkId + activity._id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(activity._id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
            </Table>

                                                  
        <div style={mystyle}>
            <table width="65%"  > <thead>     
                <tr> <th width="25%" >People Name</th>
                    <th width="25%">People Work</th>
                    <th width="25%">People Wages</th>
                    <th width="20%" align="right"><Button color="success" tag={Link} to={peopleLinkId + activity._id + "/new"}>Add People</Button></th>
                 </tr></thead>    
                 {   activity.people.map(personObj => 
                    <tr key="{personObj}">    
                        <td>{personObj.peopleName}</td><td>{personObj.peopleWork}</td><td>{personObj.peopleWages}</td>
                        <td><ButtonGroup><Button size="sm" color="primary" tag={Link} to={peopleLinkId + activity._id + "/" + personObj.peopleId}>Edit</Button><Button size="sm" color="danger" >Delete</Button></ButtonGroup></td> 
                    </tr>
                  )}
             </table>        
        </div>       
       

        <div style={mystyle}>
            <table  width="66%"> <thead>     
               <tr> <th width="25%" >Asset Driver</th>
                   <th width="25%">Asset Details</th>
                   <th width="25%">Asset Wages</th>
                   <th width="25%" align="right"><Button color="success" tag={Link} to="">Add Asset</Button></th>
                </tr></thead>    
                {   activity.asset.map(assetObj => 
                    <tr>    
                        <td >{assetObj.assetDriver}</td><td>{assetObj.assetDetails}</td><td>{assetObj.assetWages}</td>
                        <td><ButtonGroup><Button size="sm" color="primary" >Edit</Button><Button size="sm" color="danger" >Delete</Button></ButtonGroup></td> 
                    </tr> 
                )}
            </table>
        </div>

        <div style = {mystyle}>
            <table width="69%"> <thead>     
               <tr> <th width="35%" >Material Consumed Receipt</th>
                   <th width="35%">Material Consumed Details</th>
                   <th width="30%" align="right"><Button color="success" tag={Link} to="">Add Materials</Button></th>
                </tr></thead>    
                {   activity.material.map(materialObj => 
                    <tr>    
                        <td >{materialObj.materialConsumedReceipt}</td><td>{materialObj.materialConsumedReceipt}</td>
                        <td><ButtonGroup><Button size="sm" color="primary" >Edit</Button><Button size="sm" color="danger" >Delete</Button></ButtonGroup></td> 
                    </tr> 
                 )}      
            </table>
        </div>

    </div>            
    )

            //  const array1 = [1,2,3,4,5];
            //  const map1 = array1.map(item => item*2 + ",")

            

            return (
                <div>
                        {activityList} 
                </div>
            );
            
    }

}

export default withRouter(Profile)