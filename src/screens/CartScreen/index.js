import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Icons } from '../../assets';
import { AppSafeView, AppText } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppContainer, AppMargin, AppPadding } from '../../constants/commonStyle';
import { data, foodData } from './data';
import PizzaComponent from './PizzaComponent';

class CartScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
			isLoading: false,
			serviceData: [],
			pizzaType: [...data],
			pizzaList: [...foodData],
			search: ''
		};
	}



	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => { return true });
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			console.log('this.props.favoriteData  >> ', this.props.favoriteData);
		});
	}

	componentWillUnmount() {

	}

	render() {
		const { navigation } = this.props;
		return (
			<AppSafeView disableBottom>
				<View style={[AppContainer, { marginLeft: hp(8) }]}>
					<View style={styles.headerContainer}>
						<View>
							<AppText fontSize={FontSize._20} label={`Cart`} />
						</View>
						<TouchableOpacity onPress={() => { alert('avatar') }}>
							<Image style={styles.headerImage} source={Icons.icnAvatar} />
						</TouchableOpacity>
					</View>

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						{/* mainData */}
						<FlatList
							data={this.props.cartData}
							keyExtractor={(item, index) => item.id}
							style={{ paddingBottom: AppPadding._50, }}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							bounces={true}
							scrollEnabled={true}
							contentContainerStyle={{ paddingBottom: AppPadding._50, }}
							ItemSeparatorComponent={(index) => <View style={{ marginVertical: 10 }} />}
							renderItem={({ item, index }) => (
								<PizzaComponent onItemPress={() => {
									this.props.navigation.navigate('DetailsScreen', { item: item })
								}} data={item} />
							)}
						/>

					</ScrollView>
				</View>
			</AppSafeView>
		);
	}
}


const styles = StyleSheet.create({
	headerContainer: { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
	headerImage: { height: hp(6), width: hp(6) },
	searchContainer: { justifyContent: 'center', borderRadius: 50, backgroundColor: Colors.snowWhite, borderWidth: 1, borderColor: Colors.primary, minHeight: hp(6), width: '100%', marginTop: AppMargin._40 },
	searchContainerChild: { flexDirection: 'row', marginHorizontal: 20 },
	searchText: { fontFamily: Fonts.REGULAR, fontSize: FontSize._16, marginLeft: AppMargin._10, width: '80%' },
	seperatorView: { alignSelf: 'center', height: 20, width: 1.5, backgroundColor: Colors.primary }
});

const mapStatetoProps = state => {
	return {
		cartData: state.cartReducer.cartData
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(CartScreen);
