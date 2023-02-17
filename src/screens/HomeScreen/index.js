import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts, FontSize, Icons } from '../../assets';
import { AppDivider, AppSafeView, AppText } from '../../components/Custom';
import { Colors } from '../../constants/colors';
import { AppContainer, AppMargin, AppPadding } from '../../constants/commonStyle';
import { data, foodData } from './data';
import PizzaComponent from './PizzaComponent';
import Selection from './selection';

class HomeScreen extends React.Component {
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

		});
	}

	componentWillUnmount() {

	}

	_searchPizza = (text) => {
		if (text.length > 0) {
			var pizzaList = this.state.pizzaList
			var filteredPizzaList = pizzaList.filter((item) => {
				return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
			})
			this.setState({ pizzaList: filteredPizzaList })
		} else {
			this.setState({ pizzaList: foodData })
		}
	}

	render() {
		const { navigation } = this.props;
		return (
			<AppSafeView disableBottom>
				<View style={[AppContainer, { marginLeft: hp(8) }]}>
					<View style={styles.headerContainer}>
						<View>
							<AppText fontSize={FontSize._20} label={`Let's Order your`} />
							<AppText fontSize={FontSize._24} fontFamily={Fonts.BOLD} label={`Favorite Food`} />
						</View>
						<TouchableOpacity onPress={() => { alert('avatar') }}>
							<Image style={styles.headerImage} source={Icons.icnAvatar} />
						</TouchableOpacity>
					</View>

					<View style={styles.searchContainer}>
						<View style={styles.searchContainerChild}>
							<Image source={Icons.icnSearch} />
							<TextInput
								placeholder='Search pizzas...'
								style={styles.searchText}
								value={this.state.search}
								onChangeText={(text) => {
									this.setState({ search: text }, () => {
										this._searchPizza(text)
									})
								}}
							/>

							{this?.state?.search?.length > 0 &&
								<TouchableOpacity onPress={() => {
									this.setState({
										search: '',
										pizzaList: foodData
									})
								}}>
									<Image source={Icons.icnClose} />
								</TouchableOpacity>}

						</View>
					</View>


					{/* search list */}
					{this.state.search.length > 0 &&
						<View style={{ marginHorizontal: 20 }}>
							<FlatList
								data={this.state.pizzaList}
								keyExtractor={(item, index) => item.id}
								style={{ maxHeight: 130 }}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								bounces={true}
								scrollEnabled={true}
								contentContainerStyle={{ marginTop: AppMargin._20, paddingBottom: AppMargin._20 }}
								ItemSeparatorComponent={(index) => <AppDivider />}
								renderItem={({ item, index }) => (
									<TouchableOpacity onPress={() => this.props.navigation.navigate('DetailsScreen', { item: item })} >
										<Text style={{ fontFamily: Fonts.REGULAR, fontSize: FontSize._18 }}>{item.name}</Text>
									</TouchableOpacity>
								)}
							/>
						</View>
					}

					{/* uppar tab */}
					<View>
						<FlatList
							data={this.state.pizzaType}
							keyExtractor={(item, index) => item.id}
							style={{ paddingTop: AppPadding._20, paddingBottom: AppPadding._20 }}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							horizontal
							bounces={true}
							scrollEnabled={true}
							contentContainerStyle={{}}
							ItemSeparatorComponent={(index) => <View style={styles.seperatorView} />}
							renderItem={({ item, index }) => (
								<Selection
									selectedIndex={this.state.selectedIndex}
									data={item}
									index={index}
									onItemPress={() => { this.setState({ selectedIndex: index }) }}
								/>
							)}
						/>
					</View>

					<ScrollView showsVerticalScrollIndicator={false} bounces={false}>
						{/* mainData */}
						<FlatList
							data={this.state.pizzaList}
							keyExtractor={(item, index) => item.id}
							style={{}}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							bounces={true}
							scrollEnabled={true}
							contentContainerStyle={{ paddingBottom: AppPadding._50, }}
							ItemSeparatorComponent={(index) => <View style={{ marginVertical: 5 }} />}
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
	searchContainer: { justifyContent: 'center', borderRadius: 50, backgroundColor: Colors.snowWhite, borderWidth: 1, borderColor: Colors.primary, minHeight: hp(6), width: '100%', marginTop: AppMargin._20 },
	searchContainerChild: { flexDirection: 'row', marginHorizontal: 20 },
	searchText: { fontFamily: Fonts.REGULAR, fontSize: FontSize._16, marginLeft: AppMargin._10, width: '80%' },
	seperatorView: { alignSelf: 'center', height: 20, width: 1.5, backgroundColor: Colors.primary }
});

const mapStatetoProps = state => {
	return {
		homeData: state.homeReducer.homeData,
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
