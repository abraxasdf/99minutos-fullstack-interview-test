
import React, {Component} from 'react';
import { View,StyleSheet, Text, TouchableWithoutFeedback, FlatList  } from 'react-native';  

class BranchesComp extends Component {
  constructor(props){
    super(props)
    this.state = { 
      data_branches: [],
      datacommits: [],
      selectedcommit: [],
    }
  }

  
  componentWillUnmount() {}

  componentWillMount(){}
  
  componentDidMount(){ //Carga todas las branches de este repositorio
    return fetch('https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/branches',{}) 
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {}
      }) 
      .then((responseJson) => {  
        this.setState({ data_branches: responseJson });  
      }) 
      .catch((error) =>{});
  } 

  openBranch(_sha,_index){  //Carga todas los commits de este branch
    var url= 'https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/commits?sha='+_sha; 
    return fetch(url,{})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {}
      }) 
      .then((responseJson) => {  
        this.setState({ datacommits: responseJson });   
      }) 
      .catch((error) =>{});
  }

  selectCommit(_sha){ //Carga todas los detalles de este commit 
    var url= 'https://api.github.com/repos/abraxasdf/99minutos-fullstack-interview-test/commits/'+_sha;
    return fetch(url,{})
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {}
      }) 
      .then((responseJson) => {  
        this.setState({ selectedcommit: responseJson });   
      }) 
      .catch((error) =>{});
  }
      
  render() {  
    let selectedcommitelement = ((this.state.selectedcommit.length)!=0 )? 
      <View  style={styles.commit}>
        <Text  style={styles.individual_commit_txt} >{'Datos del Commit:'}</Text>
        <Text  style={styles.individual_commit_txt} >{'Message: '+this.state.selectedcommit.commit.message}</Text>
        <Text  style={styles.individual_commit_txt} >{'Timestamp: '+this.state.selectedcommit.commit.author.date}</Text>
        <Text  style={styles.individual_commit_txt} >{'Number of files changed: '+this.state.selectedcommit.files.length}</Text>
        <Text  style={styles.individual_commit_txt} >{'Author: '+this.state.selectedcommit.author.login}</Text>
        <Text  style={styles.individual_commit_txt} >{'Email: '+this.state.selectedcommit.commit.author.email}</Text>
      </View>:null;

    return (
      <View style={[styles.BranchesContainer]}>
        <View style={[styles.leftpanel]}>
            <Text  style={styles.individual_branchtxt} >{'Branches:'} </Text> 
            <FlatList 
              ref="listRef"
              style={ styles.branchesflatlist }
              data={this.state.data_branches}
              keyExtractor={(item, index) => index.toString()} 
              renderItem={({ item,index }) =>
                <TouchableWithoutFeedback key={index}  onPress={() => this.openBranch(`${item.commit.sha}`,`${index}`)} >
                  <View style={styles.individual_branch}> 
                    <Text  style={styles.individual_branch_txt_1}>{item.name}</Text> 
                  </View>
                </TouchableWithoutFeedback>
              }
            />
            <Text  style={styles.individual_branchtxt} >{'Commits:'}</Text> 
            <FlatList 
              ref="listRef"
              style={ styles.commitsflatlist }
              data={this.state.datacommits}
              keyExtractor={(item, index) => index.toString()} 
              renderItem={({ item, index }) =>
                <TouchableWithoutFeedback key={index}  onPress={() => this.selectCommit(`${item.sha}`)} >
                  <View style={styles.individual_branch}> 
                    <Text  style={styles.individual_commit_txt_1} >{'Nombre: '+item.author.login}</Text> 
                    <Text  style={styles.individual_commit_txt_1} >{'Message: '+item.commit.message}</Text>  
                    <Text  style={styles.individual_commit_txt_1} >{'Timestamp: '+item.commit.author.date}</Text>  
                  </View>  
                </TouchableWithoutFeedback>
              }
            />
        </View>
        <View style={[styles.rightpanel]}>
          {selectedcommitelement}
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
    backgroundColor: 'white'
  }, 
  leftpanel:{
    width: '70%',    
    borderWidth:1, 
    height: '100%',  
  },
  rightpanel:{
    width: '30%', 
    borderWidth:1,  
    height: '100%',
  },
  branchesflatlist:{
    width: '100%',
  },
  commit:{
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center', 
    padding: 10,
  },
  commitsflatlist:{
    width: '100%',
    marginTop: 20,
  },
  individual_branch:{
    flexDirection: 'column',  
    width: '100%',
    height: 75,
    borderColor: 'black',
    borderTopWidth:1,
    borderBottomWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888a8c',
    overflow: 'auto'
  },
  individual_branchtxt:{
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  individual_branch_txt_1:{
    fontSize: '1.4rem',
    color: 'white'
  },
  individual_commit_txt:{
    fontSize: '1.0rem',
  },
  individual_commit_txt_1:{
    fontSize: '1.0rem',
    color: 'white'
  },
});

export default BranchesComp;
