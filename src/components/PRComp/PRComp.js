
import React, {Component} from 'react';
import { View,StyleSheet, Text,TextInput, TouchableWithoutFeedback, FlatList, Alert  } from 'react-native';  
import {Picker} from '@react-native-community/picker';

class PRComp extends Component {
  constructor(props){
    super(props)
    this.state = { 
      datapr: [],
      datacommits: [],
      selectedcommit: [],
      form: {},
      databranches:[],
      branchhead: '',
      branchbase: '',
      alertmsg: '',
      alert: false,
    }
  }

    
  componentWillUnmount(){}

  componentWillMount(){}


  componentDidMount(){ 
    fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/branches',{})
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else{}
    }) 
    .then((responseJson) => {  
      this.setState({ databranches: responseJson , branchbase: responseJson[0].name, branchhead: responseJson[0].name });  
      console.log('fetch branches:', responseJson)
    }) 
    .catch((error) =>{});
          
    return fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/pulls?state=all',{})
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {}
    }) 
    .then((responseJson) => {  
      this.setState({ datapr: responseJson });  
      console.log('fetch pullrequest:', responseJson)
    }) 
    .catch((error) =>{});
  } 

  CreatePR(){
    console.log('CreatePR data:')
    console.log('this.state.form.title:'+this.state.form.title)
    console.log('this.state.form.description:'+this.state.form.description) 
    console.log('this.state.branchbase:'+this.state.branchbase)
    console.log('this.state.branchhead:'+this.state.branchhead)
    if(this.state.branchbase===this.state.branchhead){ 
      console.log('Error no elegir la misma head y base') 
      this.setState({ alert: true, alertmsg: 'Error no elegir la misma head y base' });  
      return false;
    }
      
    return fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/pulls',{
      method:'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 8f8e28aa09d38c1dce4010356827912905e48066',
      },
      body: '{ "title": "'+this.state.form.title+'", "body": "'+this.state.form.description+'", "head": "'+this.state.branchhead+'", "base": "'+this.state.branchbase+'" }'
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log('post pullcreate:', responseJson) 
      fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/pulls?state=all',{})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {}
      }) 
      .then((responseJson) => {  
        this.setState({ datapr: responseJson });  
        console.log('fetch pullrequest:', responseJson)
        this.forceUpdate();
      }) 
      .catch((error) =>{});
    })
    .catch((error) =>{});
  }

  updateForm(object,value){
    switch(object){
      case "title" :
        this.state.form.title = value;
      break;
      case "description" :
        this.state.form.description = value;
      break; 
    } 
    this.forceUpdate();
  }
  
  MergePR(_number){
    fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/pulls/'+_number+'/merge',{
      method:'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 8f8e28aa09d38c1dce4010356827912905e48066',
      }, 
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log('merge pullrequest:', responseJson)  
      if(responseJson.message=="Pull Request is not mergeable"){
        console.log('Error: Pull Request is not mergeable')
        this.setState({ alert: true, alertmsg: 'Error: Pull Request is not mergeable' });  
      }
    })
    .catch((error) =>{}); 
  }

  ClosePR(_number,_title,_desc,_base){
    fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/pulls/'+_number,{
      method:'PATCH',
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 8f8e28aa09d38c1dce4010356827912905e48066',
      },
      body: '{ "title": "'+_title+'", "body": "'+_desc+'", "state": "closed", "base": "'+_base+'" }'
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log('close pullrequest:', responseJson)  
    })
    .catch((error) =>{}); 
  }
  
  render() { 
    var selectbranches= this.state.databranches.map(function(item){ 
      return (
        <Picker.Item key={item.name} label={item.name} value={item.name} />
      );
    });
    var alert_section = this.state.alert ? <View style={[styles.alertmsg_container]}><Text style={styles.individual_branchtxt}>{this.state.alertmsg}</Text></View> : null;

    return (
      <View style={[styles.BranchesContainer]}>
        <View style={[styles.leftpanel]}>
            <Text  style={styles.individual_branchtxt} >{'Pull Request List:'}</Text> 
            <FlatList 
              ref="listRef"
              style={ styles.branchesflatlist }
              data={this.state.datapr}
              keyExtractor={(item, index) => index.toString()} 
              renderItem={({ item }) =>
                <View style={styles.individual_branch}> 
                  <Text  style={styles.individual_commit_txt} >Author: {item.base.user.login}</Text> 
                  <Text  style={styles.individual_commit_txt} >Title: {item.title}</Text> 
                  <Text  style={styles.individual_commit_txt} >Description: {item.body}</Text> 
                  <Text  style={styles.individual_commit_txt} >Head: {item.head.ref} // Base: {item.base.ref}</Text>
                  <Text  style={styles.individual_commit_txt} >Status: {item.merged_at!=null?'merged':item.state }{ item.state==='open'? <TouchableWithoutFeedback   onPress={() => this.MergePR(item.number)} ><View  style={styles.btn_prs}><Text>Merge</Text></View></TouchableWithoutFeedback> :null  } { item.state==='open'? <TouchableWithoutFeedback   onPress={() => this.ClosePR(item.number,item.title,item.body,item.base.ref)} ><View style={styles.btn_prs}><Text>Close</Text></View></TouchableWithoutFeedback> :null  }  </Text>
                </View> 
              }
            /> 
        </View>
        <View style={[styles.rightpanel]}>
          <Text  style={styles.individual_branchtxt} >{'Create Pull Request:'} </Text> 
          <Text  style={styles.individual_commit_txt} >Title:</Text> 
          <TextInput style={styles.textinput} placeholder={'Title'} clearTextOnFocus={false}   onChangeText={(text) => this.updateForm("title",text) } value={this.state.form.title} />
          <Text  style={styles.individual_commit_txt} >Description:</Text> 
          <TextInput style={styles.textinput} placeholder={'Description'} clearTextOnFocus={false}   onChangeText={(text) => this.updateForm("description",text) } value={this.state.form.description} />
          <View style={[styles.buttons]}> 
            <Text  style={styles.individual_branchtxt} >{'Branch Head:'} </Text> 
            <View style={[styles.selectedleft]}>
              <Picker
                selectedValue={this.state.branchhead}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({branchhead: itemValue})
                }> 
                {selectbranches}
              </Picker>
            </View>
            <Text  style={styles.individual_branchtxt} >{'Branch Base:'} </Text> 
            <View style={[styles.selectedleft]}>
              <Picker
                selectedValue={this.state.branchbase}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({branchbase: itemValue})
                }>
                {selectbranches}
              </Picker>
            </View>
          </View>
          <View style={[styles.buttons]}>    
            <TouchableWithoutFeedback   onPress={() => this.CreatePR()} >
              <View style={[styles.buttoncreate]}>
                <Text  style={styles.btn_txt_center} >Create</Text> 
              </View> 
            </TouchableWithoutFeedback>  
          </View>
          {alert_section}  
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create ({
  BranchesContainer:{
    width: '100%',
    height: '80%',    
    borderWidth:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  }, 
  leftpanel:{
    width: '50%',    
    borderWidth:2, 
    height: '100%',  
  },
  rightpanel:{
    width: '50%', 
    borderWidth:2,  
    height: '100%',
    backgroundColor: 'white',
    padding:10,
    overflow: 'hidden',
  },
  branchesflatlist:{    
    width: '100%',
  },
  alertmsg_container:{
    borderColor: 'red',
    borderWidth:1,
    padding:5,
  },
  commit:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center', 
  },
  commitsflatlist:{    
    width: '100%',
    marginTop: 20,
  },
  individual_branch:{     
    flexDirection: 'column',  
    width: '100%',
    height: 120,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,  
    backgroundColor: 'white',
    paddingLeft:10,
    overflow: 'hidden',
  },
  individual_branchtxt:{
    fontSize: '1.5rem',
  },
  individual_commit_txt:{
    fontSize: '1.0rem',
    textAlign: 'left'
  },
  textinput:{
    fontSize: '1.0rem',
    textAlign: 'left',
    borderColor:'lightgray',
    borderWidth: 1, 
  },
  selectedleft: {
    marginRight: 20,
  },
  buttons:{ 
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 15,
  },
  buttoncreate:{
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor:'lightgray',
    borderRadius: 10,
    width:120,
    height: 30, 
    justifyContent: 'center',
    alignContent: 'center',  
  },
  btn_txt_center:{
    fontSize: '1.0rem',
    textAlign: 'center'
  },
  btn_prs:{
    paddingLeft:10,
    paddingRight: 10,
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor:'lightgray',
    borderRadius: 5,
    justifyContent: 'center',
    alignContent: 'center', 
    marginLeft:5,
  },
});


export default PRComp;