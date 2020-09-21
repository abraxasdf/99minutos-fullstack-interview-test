
import React, {Component} from 'react';
import { View,StyleSheet, Text, TouchableWithoutFeedback  } from 'react-native';  

class ButtonComp extends Component {
  constructor(props){
    super(props)
    this.state = { 
      border_btn_width: 5,
    }
  }

  componentDidMount(){} 
     
  pushin(){ this.setState({border_btn_width:1}); }

  pushout(){  this.setState({border_btn_width:5}); }

  render() { 
    if(this.props.btndisabled){
      if(this.props.Btn_width){
        return (
          <TouchableWithoutFeedback onPress={() => this.props.onBtn_function()}  onPressIn ={() => this.pushin()} onPressOut ={() => this.pushout()}  disabled={true}  >  
            <View style={[styles.ButtonComp_disabled,{backgroundColor:this.props.Btn_backcolor,width: this.props.Btn_width,borderBottomWidth: this.state.border_btn_width,borderColor: 'gray', height: (40+this.state.border_btn_width) }]}>
              <Text style={[styles.ButtonComp_txt,{color: 'gray'}]} >{this.props.Btn_txt}</Text> 
            </View>
          </TouchableWithoutFeedback> 
        ) 
      }else{
        return (
          <TouchableWithoutFeedback onPress={() => this.props.onBtn_function()}  onPressIn ={() => this.pushin()} onPressOut ={() => this.pushout()} disabled={true}   >  
            <View style={[styles.ButtonComp,{backgroundColor:this.props.Btn_backcolor,borderBottomWidth: this.state.border_btn_width,borderColor: this.props.Btn_color, height: (40+this.state.border_btn_width) }]}>
              <Text style={[styles.ButtonComp_txt,{color: this.props.Btn_color}]} >{this.props.Btn_txt}</Text> 
            </View>
          </TouchableWithoutFeedback> 
        ) 
      } 
    }else{
      if(this.props.Btn_width){
        return (
          <TouchableWithoutFeedback onPress={() => this.props.onBtn_function()}  onPressIn ={() => this.pushin()} onPressOut ={() => this.pushout()}  >  
            <View style={[styles.ButtonComp,{width: this.props.Btn_width,backgroundColor:this.props.Btn_backcolor,borderBottomWidth: this.state.border_btn_width,borderColor: this.props.Btn_color  }]}>
              <Text style={[styles.ButtonComp_txt,{color: this.props.Btn_color}]} >{this.props.Btn_txt}</Text> 
            </View>
          </TouchableWithoutFeedback> 
        ) 
      }else{
        return (
          <TouchableWithoutFeedback onPress={() => this.props.onBtn_function()}  onPressIn ={() => this.pushin()} onPressOut ={() => this.pushout()}   >  
            <View style={[styles.ButtonComp,{backgroundColor:this.props.Btn_backcolor,borderBottomWidth: this.state.border_btn_width,borderColor: this.props.Btn_color }]}>
              <Text style={[styles.ButtonComp_txt,{color: this.props.Btn_color}]} >{this.props.Btn_txt}</Text> 
            </View>
          </TouchableWithoutFeedback> 
        ) 
      } 
    } 
  } 
} 

const styles = StyleSheet.create ({
  ButtonComp:{
    width: '40%',
    height: '80%',
    borderColor: 'white',
    borderWidth: 1, 
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5,
    marginHorizontal: 10, 
  },
  ButtonComp_txt:{
    fontSize:'2rem',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  ButtonComp_disabled:{
    width: '60%',
    height: '80%',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 5
  }
});


export default ButtonComp;