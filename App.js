import React, {Component} from 'react';
import { StyleSheet, Text, Animated, Easing, View,Dimensions, StatusBar, LayoutAnimation, Linking, Platform,NativeModules, Alert} from 'react-native'; 
import ButtonComp from './src/components/ButtonComp/ButtonComp'; //Esto es porque para los botones grandes me gusta que tengan un feeling como material
import BranchesComp from './src/components/BranchesComp/BranchesComp'; //Componente de Branches
import PRComp from './src/components/PRComp/PRComp'; //Componente de Pull Requests
   
export default class App extends Component {
  constructor(properties) { 
    super(properties); 
    this.state = { 
      branchesactive: false,
      practive: false, 
    }
  }
  
  componentWillUnmount() {}

  componentWillMount(){}
  
  componentDidMount() {}; 

  activeBranch() { 
    this.setState({ branchesactive: true , practive:false  });  
  } 
 
  activePullRequest() { 
    this.setState({ branchesactive: false , practive:true });  
  } 

  render(  ) {
    var branches_section = this.state.branchesactive ?  <BranchesComp /> : null;
    var pr_section = this.state.practive ?  <PRComp /> : null; 
 
    return (  
          <View style={styles.main_container}>  
            <View style={styles.containertop}>
              <ButtonComp Btn_txt='Branches' Btn_color='#000000' Btn_backcolor='white' Btn_width='40%' btndisabled={false}  onBtn_function={() =>  this.activeBranch() }  />
              <ButtonComp Btn_txt='Pull Request' Btn_color='#000000' Btn_backcolor='white' Btn_width='40%' btndisabled={false}  onBtn_function={() => this.activePullRequest() }  />
            </View>
            <View style={styles.containerbottom}> 
              {branches_section}
              {pr_section}
            </View> 
          </View>  
    );
  }
}

const styles = StyleSheet.create({
  viewroot: {
    backgroundColor: 'transparent',  
  },
  main_container: { 
    width: '100%',
    height: '100%',  
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center', 
  }, 
  containertop: { 
    height: "20%",
    backgroundColor: 'deepskyblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width:'100%',
  },
  containerbottom: { 
    height:"80%",
    backgroundColor: 'deepskyblue', 
    width:'100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  branches_section: {
    height:"100%",
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width:'100%', 
  },
});