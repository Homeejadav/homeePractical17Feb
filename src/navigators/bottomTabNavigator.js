import { actionCreators } from '@actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screen from '@screens';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize } from '../assets';
import { Icons } from '../assets/Icons';
import { Colors } from '../constants/colors';

const BottomTab = createBottomTabNavigator();

const MyTabBar = props => {
	return (
		<View style={[styles.mainContainer]}>
			<View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 80, backgroundColor: Colors.primary }}>
				<Image source={Icons.icnDrawer} />
			</View>
			<ScrollView style={{ flex: 1 }}>
				<View style={styles.subContainer}>
					{props.tabValue.map((item, index) => {
						return (
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
								<TouchableOpacity key={index} style={[{ flexDirection: 'row', marginVertical: 20, alignItems: 'center' }]} onPress={() => props.navigation.navigate(item.screen)}>
									<Image source={Icons[item.icon]} style={{
										height: 35, width: 35,
										left: 7,
										tintColor: Colors[props.state.index == index ? 'primary' : 'secondary'],
									}} />
								</TouchableOpacity>
								{props.state.index == index && <View style={{ width: 5, borderRadius: 50, height: 50, backgroundColor: Colors.primary }} />}
							</View >

						);
					})}
				</View>
			</ScrollView>
		</View >
	);
};

class bottomTabNavigation extends React.Component {
	state = {
		tabValue: [
			{ icon: 'icnPizza', text: '', screen: 'HomeScreen' },
			{ icon: 'icnStar', text: '', screen: 'FavoriteScreen' },
			{ icon: 'icnBucket', text: '', screen: 'CartScreen' },
			{ icon: 'icnTaco', text: '', screen: 'HomeScreen' },
			{ icon: 'icnCookies', text: '', screen: 'HomeScreen' },
			{ icon: 'icnCupcake', text: '', screen: 'HomeScreen' },
			{ icon: 'icnFriedPotatoes', text: '', screen: 'HomeScreen' },
		]
	}

	_addScreen(name) {
		return <BottomTab.Screen name={name} component={Screen[name]} />;
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: Colors.snowWhite }}>
				<View style={styles.insideContainer}>
					<BottomTab.Navigator tabBar={props => {
						var tabValue = { ...props, ...this.state }
						return <MyTabBar {...tabValue} />
					}} screenOptions={{ headerShown: false }}>
						{this._addScreen('HomeScreen')}
						{this._addScreen('FavoriteScreen')}
						{this._addScreen('CartScreen')}
					</BottomTab.Navigator>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({

	mainContainer: {
		left: 0,
		position: 'absolute', width: '15%',
		backgroundColor: Colors.borderColors
	},

	subContainer: {

		height: hp(100),
		// alignSelf: 'center',
	},

	textStyle: {
		marginTop: hp(0.5),
		fontSize: FontSize._10,
		fontFamily: Fonts.REGULAR,
	},

	insideContainer: {
		flex: 1,
		zIndex: 1,
		backgroundColor: Colors.snowWhite
	}
})

const mapStatetoProps = state => {
	return {

	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps,)(bottomTabNavigation);
