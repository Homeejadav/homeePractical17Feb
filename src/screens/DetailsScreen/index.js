import { actionCreators } from '@actions';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Icons, Images } from '../../assets';
import {
	AppButton, AppSafeView
} from '../../components/Custom';
import AppHeader from '../../components/Custom/AppHeader';
import { Colors } from '../../constants/colors';
import { AppContainer, AppMargin, AppPadding } from '../../constants/commonStyle';
import { reducerType } from '../../constants/reducerType';
import { toppings } from './toppingData';
import toast from 'react-native-toast-message'

class DetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: this.props.route.params.item,
			isLoading: false,
			quantity: this.props.quantity,
			toppingData: []
		};
	}

	componentDidMount() {
		this.setState({ toppingData: toppings }, () =>
			this._onFalse()
		)
	}

	_onFalse = () => {
		for (let i = 0; i < this.state.toppingData.length; i++) {
			if (this.state.toppingData[i].id) {
				this.state.toppingData[i].isSelected = false
			}
		}
		this.setState({ toppings: this.state.toppingData })
	}

	_onToppingSelect = (item, index) => {
		for (let i = 0; i < this.state.toppingData.length; i++) {
			if (this.state.toppingData[i].id === item.id) {
				this.state.toppingData[i].isSelected = !this.state.toppingData[i].isSelected
			}
		}
		this.setState({ toppings: this.state.toppingData })
	}

	render() {
		const { navigation } = this.props;
		const { item } = this.state;
		console.log(toppings);
		return (
			<AppSafeView disableBottom>
				<View style={AppContainer}>
					<AppHeader label={'Back'} onIconPress={() => {
						this.setState({ toppingData: [] })
						navigation.goBack()
						this.props.dispatchData(0, reducerType.quantity)

					}} />

					<TouchableOpacity
						onPress={() => {
							console.log('this.state.item >', this.state.item);
							toast.show({ type: 'success', text1: 'Successfully added to favorite' })
							this.props.navigation.goBack()
							this.props.dispatchData([
								...this.props.favoriteData,
								{
									...this.state.item,
									...this.state.toppingData
								}]
								, reducerType.favoriteData)
						}}
						style={{ borderRadius: 1000, alignSelf: 'flex-end', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: Colors.primary }}>
						<Image style={{ tintColor: Colors.snowWhite, }} source={Icons.icnStar} />
					</TouchableOpacity>

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>

						{/* pizzaView */}
						<View style={styles.ImageContainer}>
							<Image style={styles.imageStyle} source={Images.imgPizza4} />
						</View>

						{/* counterButton  */}
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								onPress={() => {
									this.props.quantity >= 1 &&
										this.props.dispatchData(this.props.quantity - 1, reducerType.quantity)
								}}
								style={styles.buttonCounter}>
								<Text style={styles.buttonText} >-</Text>
							</TouchableOpacity>

							<Text style={[styles.buttonText, { color: Colors.snowWhite }]}>{this.props.quantity}</Text>

							<TouchableOpacity
								onPress={() => {
									this.props.dispatchData(this.props.quantity + 1, reducerType.quantity)
								}}
								style={styles.buttonCounter}>
								<Text style={styles.buttonText}>+</Text>
							</TouchableOpacity>
						</View>

						<Text style={{ fontSize: FontSize._22, fontFamily: Fonts.BOLD, color: Colors.primary }}>{item.name}</Text>
						<Text style={{ fontSize: FontSize._14, fontFamily: Fonts.REGULAR, color: Colors.primaryTransparent }}>{`Mouth watering creamy cheese topped ${`\n`}with ${item.name}`}</Text >

						<Text style={{ marginTop: AppMargin._40, fontSize: FontSize._16, fontFamily: Fonts.MEDIUM, color: Colors.primary }}>{`Select your Extra toppings`}</Text>


						<View>
							<FlatList
								data={[...this.state.toppingData]}
								keyExtractor={(item, index) => item.id}
								style={{ paddingBottom: AppPadding._20 }}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								horizontal
								bounces={true}
								scrollEnabled={true}
								contentContainerStyle={{}}
								ItemSeparatorComponent={(index) => <View style={styles.seperatorView} />}
								renderItem={({ item, index }) => (
									<View style={{
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 20,
										borderColor: item.isSelected === true ? Colors.primary : Colors.snowWhite,
										backgroundColor: Colors.borderColors,
										marginTop: 10,
										paddingHorizontal: 17,
										paddingVertical: 10,
										marginRight: AppMargin._30,
										borderWidth: 1
									}}>
										<Image style={{ height: 24, width: 24, top: 5 }} source={item.icon} />
										<TouchableOpacity
											onPress={() => { this._onToppingSelect(item, index) }}
											style={{ height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', bottom: -20, width: 25, backgroundColor: Colors.primary }}
										>
											<Text style={{ color: Colors.snowWhite, fontSize: 22 }}>{item.isSelected == true ? `-` : `+`}</Text>
										</TouchableOpacity>

									</View>
								)}
							/>
						</View>




					</ScrollView>

					<AppButton
						top={hp(2)}
						fontFamily={Fonts.BOLD}
						fontsize={FontSize._22}
						label={'Add To Cart'}
						onClick={() => {
							if (this.props.quantity === 0) {
								toast.show({ type: 'error', text1: 'Add item to cart' })
							} else {
								toast.show({ type: 'success', text1: 'Successfully added to Cart' })
								this.props.dispatchData([
									...this.props.cartData,
									{
										...this.state.item,
										...this.state.toppingData
									}]
									, reducerType.cartData)
								this.props.navigation.goBack()
							}
						}}
					/>
				</View >
			</AppSafeView >
		);
	}
}

const styles = StyleSheet.create({
	ImageContainer: {
		top: AppMargin._60,
		alignSelf: 'center',
		justifyContent: 'center',
		height: hp(35), width: hp(35),
		alignItems: 'center',
		borderWidth: 2,
		borderColor: Colors.borderColors,
		borderRadius: 1000
	},
	imageStyle: { height: hp(43), width: hp(43), right: hp(3), bottom: hp(5) },
	buttonCounter: { justifyContent: 'center', alignItems: 'center', height: 20, width: 20, borderRadius: 100, backgroundColor: Colors.borderColors },
	buttonContainer: { borderRadius: 100, justifyContent: 'space-between', flexDirection: 'row', padding: 5, marginTop: AppMargin._90, alignSelf: 'flex-end', backgroundColor: Colors.primary, width: 90 },
	buttonText: { fontFamily: Fonts.MEDIUM, color: Colors.primary },

});

const mapStatetoProps = (state) => {
	return {
		quantity: state.detailsReducer.quantity,
		favoriteData: state.favoriteReducer.favoriteData,
		cartData: state.cartReducer.cartData
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(DetailsScreen);
