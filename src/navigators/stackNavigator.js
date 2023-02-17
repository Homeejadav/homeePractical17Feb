import { actionCreators } from '@actions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screen from '@screens';
import React from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '../constants/colors';
import BottomTabNav from './bottomTabNavigator';

const Stack = createNativeStackNavigator();

class StackNavigator extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		};
	};

	_addScreen(name) {
		return <Stack.Screen name={name} component={Screen[name]} />;
	}

	render() {

		return (
			<NavigationContainer>
				<StatusBar animated={true} backgroundColor={Colors.snowWhite} barStyle={"dark-content"} />
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* {this._addScreen('HomeScreen')} */}
					<Stack.Screen options={{ animation: 'fade' }} name={'BottomTab'} component={BottomTabNav} />
					{this._addScreen('DetailsScreen')}
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const mapStatetoProps = state => {
	return {

	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps,)(StackNavigator);
